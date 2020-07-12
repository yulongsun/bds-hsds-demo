import { Dilight, Injectable } from 'dilight.js';
import { PreLoadType,DocConfig, StorageConfig, UserDocType } from '../app/_def/udoc-def';

import { RtnType, SubjectSeries, CWebProcessData, DataFeature } from '../app/_def/bds-meta';
import { IdleTask, DbTaskType, IdleTaskType, TaskType } from '../app/_def/redis-def';
import *  as fs from 'fs'; ``
import *  as path from 'path';
import got from 'got';
import { from, range, concat, Observable } from 'rxjs';
import { delay, map, concatAll } from 'rxjs/operators';
import { BdsHelper } from '../app/_utils/bdshelper';
//import { StorageTool } from '../app/service/storagetool';

bds-hsds-demo


//从环境中获取


const defaul_preload: PreLoadType = {
    //  udocapi: 'http://www.hhunj.com:8890/bdsapi/', //8890 路由转 10.0.0.10:8899, 不同的任具有不同的
    udocapi: 'http://39.108.69.210:8899/bdsapi/',  //实验数据
    region: 190,
}





@Injectable({
    providedIn: 'root'
})
export class PreLoad {


    //检测当前流域
    configlist: DocConfig[];
    tasklist: IdleTask[];
    curConfig: DocConfig | undefined;
    curTask: IdleTask;

    _preload: PreLoadType = defaul_preload;


    get preload(): PreLoadType {
        return this._preload;
    }
    set preload(pre: PreLoadType) {
        this._preload = pre;
    }


    getUDocUrl(): string {
        return this.preload.udocapi;
    }


    //verifiy 路径的格式
    verifyUdocApi(root: string): boolean {
        let url = '^(((ht|f)tp(s?))\://)?(www.|[a-zA-Z].)[a-zA-Z0-9\-\.]+\.(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk)(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))*$'
        return new RegExp(url).test(root);

    }
    setRegion(region: number): PreLoadType {
        this.preload.region = region;
        return this.preload;
    }

    setUDocRoot(root: string): void {
        if (this.verifyUdocApi(root)) {
            this.preload.udocapi = root;
            this._saveConfig();
        }
        else {
            console.debug('udocapi 格式出错');
        }
    }


    async getAlias(basin: string): Promise<string | undefined> {
        if (basin === 'www') {
            return basin;
        }
        await this.getUdocConfig();
        let config = this.configlist.find(x => {
            return x.udoc.basin === basin;
        })
        if (config) {
            return config.udoc.alias;
        }

    }

    //存入到文件中
    private _saveConfig() {
        let preload: PreLoadType = this.preload

        let pathname = path.join(__dirname, '../cloudrest.json');
        console.debug('_saveConfig 路径： ', pathname);
        if (fs.existsSync(pathname)) {
            if (preload) {
                let str = JSON.stringify(preload);
                fs.writeFileSync(pathname, str);
            }

        }
    }

    async getUdocConfig(pre?: PreLoadType): Promise<DocConfig[] | null> {
        try {
            let preload = pre ? pre : {}
            this.preload = { ...this.preload, ...preload };

            let url = `${this.getUDocUrl()}udocconfig`;
            const response = await got(url, { timeout: 2000 });
            // console.log('当前的流域是：', this.curConfig.udoc.basin);
            let ret = JSON.parse(response.body);
            if (ret.result) {
                this.configlist = ret.data;
                return this.configlist;

            }
            else {
                return null;
            }


        } catch (error) {
            console.error(error.message, ',  请用 bds pm2 重启一遍 huishuidataserver :8899');
            return null;
        }
    }

    //save  new regon
    switchBasin(config: DocConfig, configlist?: DocConfig[]) {
        let region = config.udoc.region;
        this.preload.region = region;
        this._saveConfig();
        this.curConfig = config;
        this.listTable(configlist);
    }

    listTable(configlist?: DocConfig[], info: boolean = true) {
        if (configlist) {
            this.configlist = configlist
        }

        this.curConfig = this.configlist.find(x => {
            return x.udoc.region == this.preload.region;
        })


        this.configlist.map(config => {
            let basin = config.udoc.basin;
            if (this.curConfig == config) {
                this.curConfig = config;
                basin = "* " + basin;
            }
            if (info) {
                console.debug(basin);
            }
            return basin;

        });
        let aa = 0;

    }


    switchTask(task: IdleTask, configlist?: DocConfig[]) {
        this.curTask = task;
        this.listTable(configlist);
    }



    ////////////////////

    async removeOneTask(region: number, key: TaskType): Promise<RtnType<number> | undefined> {
        //得到最后一个任务，检测
        try {
            let url = `${this.getUDocUrl()}removeOneTask/?region=${region}&key=${key}&page=0`;
            const response = await got(url, { timeout: 2000 });
            //   console.log('当前的流域是：', this.curConfig.udoc.basin);
            let ret = JSON.parse(response.body);
            return ret;

        } catch (error) {
            console.log(error.message);
        }

    }



    async emptyTasks(region: number, key: TaskType): Promise<RtnType<number> | undefined> {
        //得到最后一个任务，检测
        try {
            let url = `${this.getUDocUrl()}emptyTasks/?region=${region}&key=${key}&page=0`;
            const response = await got(url, { timeout: 2000 });
            //   console.log('当前的流域是：', this.curConfig.udoc.basin);
            let ret = JSON.parse(response.body);
            return ret;

        } catch (error) {
            console.log(error.message);
        }

    }





    async submitIdleTask(task: IdleTaskType): Promise<RtnType<string> | undefined> {
        //将token加入由方法和参数构成的统一的uuid 写入到 远程记录，然后再由该uuid提取！！！
        // let headers = this.Jwt._headers;
        if (this.curConfig) {
            let region = this.curConfig.udoc.region;
            let basin = this.curConfig.udoc.basin;
            let url = `${this.getUDocUrl()}addIdleTask/?region=${region}`;
            let { body } = await got.post(url, {
                json: task,
                responseType: 'json'
            });
            let ret = body as RtnType<string>;
            if (ret.result == 1) {
                //写入成功
                console.warn(`----TaskPovider @ ${task.uuid} AddIdleTask`);
            }
            else {
                console.error(`----TaskPovider @ ${task.uuid} AddIdleTask err`);
            }
            return ret;
        }

    }



    async listTask(region: number, key: TaskType, page: number): Promise<RtnType<IdleTask[]> | undefined> {
        //得到最后一个任务，检测
        try {
            let url = `${this.getUDocUrl()}listTask/?region=${region}&key=${key}&page=0`;
            const response = await got(url, { timeout: 2000 });
            //    console.log('当前的流域是：', this.curConfig.udoc.basin);
            let ret = JSON.parse(response.body);
            if (ret.result) {
                this.tasklist = ret.data;
                let names = this.tasklist.map(x => {
                    let taskname = x.name;
                    if (!this.curTask || this.curTask == x) {
                        this.curTask = x;
                        taskname = "* " + taskname;
                    }
                    return taskname;
                })
            }
            return ret;

        } catch (error) {
            console.log(error.message);
        }

    }







    async retainTasks(): Promise<DbTaskType[] | undefined> {
        try {//8890 路由转 10.0.0.10:8899
            if (this.curConfig) {
                let region = this.curConfig.udoc.region;
                let basin = this.curConfig.udoc.basin;

                let plan = this.curConfig.subjectSeries.mPlanName;
                //       console.log('当前的流域是：', basin, ':', region);

                let url = `${this.getUDocUrl()}listRetainTask?region=${region}&prefix=${plan}`;
                const response = await got(url);

                let ret = JSON.parse(response.body);
                if (ret.result) {
                }
                return ret.data;
            }

        } catch (error) {
            console.log(error.response.body);
            //=> 'Internal server error ...'
        }
    }







    async OutputSch() {
        //从最后一个任务中 得到 OutputSch
        try {//8890 路由转 10.0.0.10:8899, 不同的任具有不同的
            let url = '${root}listTask/bdsapi/OutputSch?uuid=task2020_1_14_0_7_29';
            const response = await got(url);
            console.log(response.body);
            //=> '<!doctype html> ...'
        } catch (error) {
            console.log(error.response.body);
            //=> 'Internal server error ...'
        }

    }




    //
    async input(task: string) {


    }
    async output(task: string) {

    }


    /////////////////////////
    getDummyTask(regin: number): StorageConfig | undefined {
        let config = this.configlist.find(x => {
            return regin == x.udoc.region;
        })
        return config?.task;
    }



    //todo:   从 __spinner  得到 defaultregion
    getDummyDoc(regin: number): UserDocType | undefined {
        let config = this.configlist.find(x => {
            return regin == x.udoc.region;
        })
        return config?.udoc;
    }
    getDummySubjectSeries(regin: number): SubjectSeries | undefined {
        let config = this.configlist.find(x => {
            return regin == x.udoc.region;
        })
        return config?.subjectSeries;
    }



    //delay 保证 uuid 以秒计唯一性 
    _delaySerirs<T>(tasks: T[]) {
        let obvs: Observable<T>[] = [];
        tasks.forEach((task) => {
            const observable = new Observable<T>(subscriber => {
                subscriber.next(task);
                subscriber.complete();
            }).pipe(delay(2000));//保证 uuid 以秒计唯一性 
            obvs.push(observable);
        });
        return concat(obvs).pipe(concatAll());

    }




    async gettaskTmpleDay8(uDoc: UserDocType, plannname: string, index: number = 0): Promise<IdleTaskType | undefined> {

        //得到定时任务模板
        let dbtasks = await this.retainTasks();
        if (dbtasks) {
            let task = dbtasks[index].task;
            let subser = task.subjectSeries;
            task.t0 = BdsHelper.getDayT08(subser);
            return task;
        }

    }



    /*
        //数据库 RetainTmpl  保存的数据库，用于定时调用
        //RetainTmplTasks 可以存有多个，用于不同的专题，
        async generateRetainTmplTasks(uDoc: UserDocType, plannname: string, t0: Date,fnCall?:(x:IdleTaskType)=>void): Promise<DbTaskType[]> {
            let dbtasks: DbTaskType[] = await this.retainTasks();
          
            console.info(`生成:   TaskPovider 定时任务:   generateRetainTasks   ${uDoc.basin}   ${dbtasks.length} 个`);
             //delay for unique uuid
             this._delaySerirs(dbtasks).subscribe(async (dbtask: DbTaskType) => { 
                let task = dbtask.task;
                console.warn(`----定时任务在这里要重设时间去替换任务时间 ${task.t0}`);
                //todo: 该名称应该是模板名称和依据时间的合成，测试时只用一个依据时间，所以暂时用当前uuid 时间代替
                let now = new Date();
                task.t0 = t0;
    
                //这里的名字要采用模板定义中的名子 dbtask.name
                task.uuid = StorageTool.generateUuid(now);
                task.name = '定时_' + dbtask.name                      // task.uuid.substr(4);//将 uuid 的前缀换成 定时任务 用以区别
    
                if (fnCall) {
                    fnCall(task);
                }
                else {
                    await this.submitIdleTask(task);
                }
    
    
            });
    
            return dbtasks;
        }
    */

}