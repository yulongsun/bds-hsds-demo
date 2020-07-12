
import { RtnType, SubjectSeries } from './bds-meta';
//import { UserDoc } from './preload-def';
import { UserDocType, PROP } from './udoc-def';
import { Md5 } from 'ts-md5/dist/md5';
import { Helpers } from '../_utils/helpers';
import { CWebScheduleObjectInfo, CWebStartDikeInfo } from './bds-meta'

import { BdsHelper } from '../_utils/bdshelper';



export type RedisMsgType = 'put' | 'get' | 'post' | 'del' | 'bds';//bds 代表节点形为

export type ProviderInterval = 'day' | 'hour';


export type ProgramOption = {

    start: number,  //不起动定时 
    emptyIdle: boolean,
    emptyOK: boolean,
}



export type StartOption = {
    consumer: {
        start: number;   //正数起动时
        interval: number; //secs
    },
    provider: {
        start: number;   //正数起动时即开始
        interval: ProviderInterval; //整点或整天
    },
    program?: ProgramOption
}

export interface TaskConfig {

    region: number;
    generateTaskLkist(prog: any, taskTmple: IdleTaskType): IdleTaskType[];

}



export class RedisLogMsg {
    private static tStart: Date = new Date();
    private static lastBds: RedisLogMsg;


    static errNum: number[] = [];

    time: Date;  //任务起动时间
    type: RedisMsgType;//方法类型
    method: string;//调用方法
    params: object; //调用参数

    exeDeltT: number;  //界面上显示的是此时间，从执行方法到数据返回的时间

    bodytrait: any;  //如果body 对body的特征进行处理，而不是存整个bosy
    err: boolean;

    hookowner: string;   //检查是否是流程图调用

    datasize: number = 0;
    deltaT: number;//暂时不用
    //totoalDeltaT: number;
    paramsJ: string;


    static init(bds: RedisLogMsg) {
        this.tStart = new Date();
        bds.deltaT = 0;
        this.lastBds = bds;
        if (!this.errNum[0]) {
            this.errNum[0] = 0;
        }

    }



    constructor(type: RedisMsgType, method: string, params: object, exeDeltT: number, err = false) {
        this.type = type;
        this.method = method;
        this.params = params;
        this.exeDeltT = exeDeltT;
        this.err = err;

        this.time = new Date();
        if (type == 'bds') {
            RedisLogMsg.init(this);
        }
        else {
            this.deltaT = this._timeDH();
        }
        if (RedisLogMsg.lastBds) {
            //只要子调用有一个错，则汇总错
            if (this.err) {
                RedisLogMsg.errNum[0]++;
                RedisLogMsg.lastBds.err = true;
            }
            RedisLogMsg.lastBds.exeDeltT += this.exeDeltT;
        }
        this.paramsJ = this._paramsJstr();
    }




    private _timeDH(): number {
        //return Helpers.formatDH(this.time);
        return (this.time.getTime() - RedisLogMsg.tStart.getTime());
    }
    private _paramsJstr() {
        return JSON.stringify(this.params);
    }


    //如果body 经常很大时，也要另行处理！！！！
    checkBodyResult(body: any, result: RtnType<any>) {
        if (result && result.data) {
            let s = JSON.stringify(result.data);
            this.datasize = s.length;

            if (body) {
                let s = JSON.stringify(body);
                this.datasize += s.length;  //长度项也包括 body
            }
        };

        //这里没有作处理
        this.bodytrait = body;////如果body 对body的特征进行处理，而不是存整个bosy
    }


    //用户点击了流程图上的节点
    isBdsFlow(): boolean {
        return this.type == 'bds';
    }

    isPType(): boolean {
        return this.type == 'put' || this.type == 'post';

    }
    //要根据返回的结果决定，显示不同的标市公司
    issuccess(): boolean {
        return this.err == false;
    }

    //决定日志信息的 分级标准
    getUUID(user: UserDocType): string {
        let md5 = new Md5();
        ////////////////////
        //这里区分不同的region 但没有区分不同的用户！！！！
        md5.appendStr('' + user.region);
        ////////////////////////////////

        md5.appendStr(this.type);
        md5.appendStr(this.method);
        if (this.params) {
            md5.appendStr(JSON.stringify(this.params));
        }
        //?????长度项也进
        if (this.bodytrait) {
            md5.appendStr(this.bodytrait);
        }
        var aaaa = md5.end() as string;
        return aaaa;
    }

};

export class RedisMsgResult extends RedisLogMsg {

    result: RtnType<any>;
    body: any;
    constructor(logmsg: RedisLogMsg, body: any, result: RtnType<any>) {
        super(logmsg.type, logmsg.method, logmsg.params, logmsg.deltaT);
        this.body = body;
        this.result = result;

    }


    issuccess(): boolean {
        if (this.result) {
            return this.result.result == 1;
            //  return this.result.status == 1;
        }
        return false;
    }

}




///////////////////////////////
export type TaskType = 'TaskIdle' | 'TaskBusy' | 'TaskOK' | 'TaskErr' | 'TaskRetain'
// |'OutSch'|'OutPredictData'|'OutPresetData';

//数据库表名
export type HydroType = /*'sch'*/| 'outputsch' | 'inputsch' | 'preset' | 'predict' | 'modelraw' | 'modeldata' | 'modelsch' |
    'retaintask' | 'rcList' | 'rrList' | 'rlList';



export interface TaskEvent {
    name: string,
    t0: Date,
    callback: (ret: number) => void

}

export interface IdleTaskType {
    name: string;  //显示名称，通常是采用模板的名称
    uuid: string; //唯一名称
    t0: Date;
    udoc: UserDocType;
    //还应有序列和专题信息，如果这一项缺省，这是系统正在采用的序列和专题，否则需要切换序和列转题
    subjectSeries: SubjectSeries;
    jdata: {
        info: CWebScheduleObjectInfo[],
        data: CWebStartDikeInfo
    }
}


export class IdleTask implements IdleTaskType {
    name: string;
    uuid: string;
    t0: Date;
    // machine:string  //todo: 用以确定计算的机器，可以出错时检查
    udoc: UserDocType;
    //还应有序列和专题信息，如果这一项缺省，这是系统正在采用的序列和专题，否则需要切换序和列转题
    subjectSeries: SubjectSeries;
    jdata: {
        info: CWebScheduleObjectInfo[],
        data: CWebStartDikeInfo
    }

    constructor(tsk: IdleTaskType) {
        Object.keys(tsk).forEach((x: keyof IdleTaskType) => {
            Object.defineProperty(this, x, tsk[x]);
        })
        this.t0 = new Date(this.t0);


        if (this.subjectSeries) {
            this.subjectSeries.mRealStartTime = new Date(this.subjectSeries.mRealStartTime);
            this.subjectSeries.mRealEndTime = new Date(this.subjectSeries.mRealEndTime);
        }
    }

    static clone(tsk: IdleTaskType): IdleTask {
        let stask = JSON.stringify(tsk);
        return new IdleTask(BdsHelper.JSONparseTask(stask));

    }



    get plan(): string {
        if (this.subjectSeries) {
            return this.subjectSeries.mPlanName;
        }
        return 'bdsplan';
    }
    get title(): string {
        //  return this.plan + '(' + this.t0.toLocaleString() + ')';
        return this.plan + '(' + Helpers.datePipetransform(this.t0, 'yy-MM-dd HH:mm') + ')';
    }

    get nameTitle(): string {
        //return this.name + '(' + this.t0.toLocaleString() + ')';
        return this.name + '(' + Helpers.datePipetransform(this.t0, 'yy-MM-dd HH:mm') + ')';
    }
    //由于uuid 是从时间生成的也可以得到生成的时间

}
export interface DbTaskType {
    _id: any;
    name: string;
    uuid: string;
    predix: string;
    region: string;
    task: IdleTaskType
}
export class DbTask implements DbTaskType {
    _id: any;
    name: string;
    uuid: string;
    predix: string;
    region: string;
    task: IdleTaskType;

    constructor(tsk: DbTaskType) {
        Object.keys(tsk).forEach((x: keyof DbTaskType) => {
            Object.defineProperty(this, x, tsk[x]);
        })
    }

    get title(): string {
        return this.name;
    }
    get nameTitle(): string {
        return this.name;
    }
}

export class TaskMsg {
    static init(msg: TaskMsg) {
        this.tStart = new Date();
        msg.deltaT = 0;
        if (!this.errNum[0]) {
            this.errNum[0] = 0;
        }

    }

    constructor(body: IdleTaskType) {
        this.type = 'post';
        this.method = 'addidletask';
        this.body = body;
        TaskMsg.init(this);

    }
    private static tStart: Date = new Date();
    static errNum: number[] = [];
    time: Date;  //任务起动时间
    type: RedisMsgType;//方法类型
    method: string;//调用方法
    params: object; //调用参数
    body: IdleTaskType;
    deltaT: number;//暂时不用


    getUUID(user: UserDocType): string {
        return user.basin;
    }


}
export type OutpuSchRequest = {
    uuid: string,
    region: string,
}

export type ModelRequest = {
    uuid: string,
    prefix: string,
    region: string,
    dt: string,
}
export type ModelElmRequest = {
    uuid: string
    region: string,
    prefix: string,//流域.方案/如  里下涨流域.水动力学模型
    props: PROP,
};
