

import { Helpers } from '../_utils/helpers';
import { DataFeature,CWebProcessData, CWebScheduleObjectInfo, CWebPresetResultInfo } from '../_def/bds-meta'
import { InfoMeta, DataInfo } from '../_def/base-def'



type ZipType = 'hour' | 'minite' | 'second';

//采用压缩的数据表示方式，适用于传数据到客户端
export class ProcessData {
    zip: ZipType;
    mData: number[];  //可以限制小数位数
    mDateTime: number[];//tick/1000000 的增量时间格式

    constructor(ss?: ProcessData) {
        if (ss) {
            this.zip = ss.zip;
            this.mDateTime = ss.mDateTime;
            this.mData = ss.mData;
        }
    }

    normalize(): CWebProcessData|undefined {
        if ((this instanceof CWebProcessData)) {
            return this;
        }
        else if (this instanceof ProcessData) {
            let minute = this.zip == 'minite';
            let mDateTime = [];
            let lastdt = 0;
            let rows = this.mData.length;
            for (let ri = 0; ri < rows; ri++) {
                //增量方式
                let dt: number = (this.mDateTime[ri] + lastdt);
                lastdt = dt;
                if (minute) {
                    dt *= 60;//得到0.01ms单位
                }
                dt = Helpers.connverTimeFromCsharpTick(dt); //C# 到 js时间秒转换
                mDateTime[ri] = (new Date(dt));//时间
            }

            let preceeedata = new CWebProcessData();
            preceeedata.mDateTime = mDateTime
            preceeedata.mData = this.mData;
            return preceeedata;
        }

    }
    //处理 ProcessData 和 CWebProcessData 的压缩和没有压缩的数据
    static getData2<T extends CWebProcessData  |ProcessData>(jdata: T): number[][] | Date[][] | undefined {

        //压缩格式
        if ((jdata instanceof ProcessData)) {
            //let jdata = tdata as ProcessData;
            if (!jdata.mDateTime)
                return;

            let ymax = 0;
            let ymin = 9999;
            let minute = jdata.zip == 'minite';


            let mData = jdata.mData;
            let lastdt = 0;
            let data2 :number[][] | Date[][]= [];
            let rows = mData.length;
            for (let ri = 0; ri < rows; ri++) {
                data2[ri] = [];
                var countC = 0;

                //增量方式
                let dt: number = (jdata.mDateTime[ri] + lastdt);
                lastdt = dt;


                if (minute) {
                    dt *= 60;
                }
                dt = Helpers.connverTimeFromCsharpTick(dt); //C# 到 js时间秒转换



                data2[ri][countC++] = new Date(dt);//时间

                if (!isNaN(mData[ri])) {
                    if (ymax < mData[ri])
                        ymax = mData[ri];//.toFixed(2);
                    if (ymin > mData[ri])
                        ymin = mData[ri]//.toFixed(2);

                    //yvalue
                    data2[ri][countC] = Number(mData[ri].toFixed(2));
                }
                countC++;
            }
            return data2;
        }
        //
        else if ((jdata instanceof CWebProcessData)) {
            let datainfo = this.getFeaturData(jdata);
            return datainfo.data2;

        }

    }
    static getFeaturData(data: CWebProcessData): DataInfo {
        let featureNull:DataInfo = {
            data: data,
            info: new  DataFeature(),
            data2: undefined
        }
        //如果没有数据，返回featureNull
        if(!data){
            return featureNull;
        }

        let data2 :number[][] | Date[][]= [];
        let rows = data.mDateTime.length;
        let info: DataFeature = {
            id: 0,
            name: '',
            type: 1,
            ymaxlimit: 9999,
            yminlimit: -9999,
            ymax: -9999,
            ymin: 9999,
            ymaxT: new Date(),
            yminT: new Date(),
            last: 0,
            lastT: new Date(),
            start:0,
            startT:new Date(),
            data:[],
            dataT:[],
         };
        if (rows <= 0) {
            return featureNull;
        }
        info.last = data.mData[rows - 1];
        info.lastT = new Date(data.mDateTime[rows - 1]);
        info.start=data.mData[0];
        info.startT=data.mDateTime[0];
        info.data=data.mData;
        info.dataT=data.mDateTime;
        for (let ri = 0; ri < rows; ri++) {
            data2[ri] = [];
            let col = 0;//只有一列
            if (data.mData[ri] !== null) {
                //数据只有一列

                if (!isNaN(data.mData[ri])) {
                     data2[ri][col++] = (new Date(data.mDateTime[ri]));//时间
                    let dataval= Number(data.mData[ri].toFixed(2));
                    if (info.ymax < data.mData[ri]) {
                        info.ymax =dataval
                        info.ymaxT = new Date(data.mDateTime[ri]);
                    }
                    if (info.ymin > data.mData[ri]) {
                        info.ymin = dataval;
                        info.yminT = new Date(data.mDateTime[ri]);
                    }
                    //yvalue
                    data2[ri][col] =dataval;
                }
                col++;
            }
        }
        return {
            data: data,
            info: info,
            data2: data2,
        }
    }
    //得到曲线要显示的综合属性
    static getChartFeature(jdata: CWebProcessData[], elmi: number, dt0?: Date): DataInfo {
        let data = jdata[elmi];
        return this.getFeaturData(data);
    }

    static merge(d1: ProcessData, d2: ProcessData): ProcessData {
        let total = new ProcessData();
        if (!d1) {
            d1 = new ProcessData();
        }
        if (!d2) {
            d2 = new ProcessData();
        }
        total.mDateTime = [...d1.mDateTime, ...d2.mDateTime];
        total.mData = [...d1.mData, ...d2.mData];
        return total;
    }






}

//压缩后的数据
export class ProcessInfoData {
    info: CWebPresetResultInfo;
    data: ProcessData;

}


export class ScheduleInfoData {
    info: CWebScheduleObjectInfo;
    data: CWebProcessData;


    //将相同id 的合并到一起。。。
    static merge<T extends ProcessInfoData | ScheduleInfoData>(d1: T[], d2: T[]): T[] {
        if (!d1 && !d2)
            return [];
        if (!d1) {
            return [...d2];
        }
        if (!d2) {
            return [...d1]
        }


        let total2 = [...d2];
        let notIndD2 = [];
        d1.forEach(h => {
            let item = d2.find(x => {
                return x.info.mKeyID == h.info.mKeyID;
            })
            if (item) {
                let totalItem = total2.find(x => {
                    return x.info.mKeyID == h.info.mKeyID;
                })
                if (totalItem) {
                    if (item.data instanceof CWebProcessData && h.data instanceof CWebProcessData) {
                        totalItem.data = CWebProcessData.merge(item.data, h.data);
                    }
                    else if (item.data instanceof ProcessData && h.data instanceof ProcessData) {
                        totalItem.data = ProcessData.merge(item.data, h.data);

                    }
                    else {
                        let aaaa = 0;
                    }
                }
            }
            else {
                total2.push(h);
            }

        });

        return total2;
    }

}




export class WebProcessInfoData<I extends CWebPresetResultInfo |CWebPresetResultInfo|InfoMeta, D extends CWebProcessData  |ProcessData>{
    info: I;   //  ref: CWebPresetResultInfo;
    data: D;
    constructor(info: I, data: D) {
        this.info = info;
        this.data = data;

    }

}
