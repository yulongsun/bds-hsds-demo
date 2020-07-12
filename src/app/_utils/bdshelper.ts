import {  Observable, Subscription, Subscriber, } from 'rxjs';

import {SubjectSeries, CWebScheduleObjectInfo, CWebPredictDikeDataItem } from '../_def/bds-meta'
import { Helpers } from '../_utils/helpers';
import { CtgrStyle } from '../_def/base-def'
import { Injectable, Injector } from '../_def/serve-def'

import {IdleTask,IdleTaskType } from '../_def/redis-def';



export class BdsHelper {

    static getDayT08(subSer: SubjectSeries): Date {
        let t0: Date = new Date(subSer.mRealStartTime);
        //定时任务在这里要重设时间去替换任务时间
        let now = new Date();//t0.getFullYear()
        let hours=8;
        let day=now.getDate();
         if(now.getHours()<8){
             day-=1;
         }
        //yulong
        t0 = new Date(t0.getFullYear(), now.getMonth(), day, hours); //依据时间
        return t0;

    }
    static getHourT0(subSer: SubjectSeries): Date {
        let t0: Date = new Date(subSer.mRealStartTime);
        //定时任务在这里要重设时间去替换任务时间
        let now = new Date();//t0.getFullYear()
        //yulong
        t0 = new Date(t0.getFullYear(), now.getMonth(), now.getDate(), now.getHours()); //依据时间
        return t0;
    }


    //off_field 和 on_field 是在和C# saop api交互时的  C#总是在属性上加一个 field 不能去掉的hack
    // data为 null时返回{}  已改为返回 Null
    //note:  static off_field  已转为 RestBase 内部函数
    static on_field(data:any) {
        let type: string = Array.isArray(data) ? "array" : typeof (data);
        let  obj:any;
        if (type === 'array') {
            obj = [];
        } else if (type === 'object') {
            obj = {};
        } else {
            //不再具有下一层次
            return data;
        }
        if (type === 'array') {
            for (let i = 0, len = data.length; i < len; i++) {
                obj.push(this.on_field(data[i]));
            }
        } else if (type === 'object') {
            for (let key in data) {
                let skey = key + "Field";
                obj[skey] = this.on_field(data[key]);
            }
        }
        return obj;
    }
    static _urlParam(obj:{[key:string]:string}): string {
        let keys = Object.keys(obj);
        let arr:string[] = [];
        keys.forEach((ki) => {
            arr.push(ki + '=' + obj[ki]);
        })
        return arr.join('&');
    }

    static _parseParam(parma:string): object {
        let queryArr = parma.split('&');
        let obj:{[key:string]:string} = {};
        queryArr.forEach((item) => {
            let key = item.split('=')[0];
            let value = item.split('=')[1];
            obj[key] = value;
        });
        return obj;
    }


    static formatHH(fd: Date): string {
        return Helpers.formatHH(fd, true);//detail
    }

    static formatDH(fd: Date): string {
        return Helpers.formatDHM(fd);
    }
    static formatD(fd: Date): string |null{
        return Helpers.formatD(fd, 99);
    }
    static formatMDH(fd: Date): string {
        return Helpers.formatMDH(fd);
    }
    static formatDateMDH(fd:Date):string {
        var new_time = "";
        var month = fd.getMonth() + 1;
        if (month >= 10) {
            new_time += month + "-";
        } else {
            //在小于10的月份上补0
            new_time += "0" + month + "-";
        }

        if (fd.getDate() >= 10) {
            new_time += fd.getDate();
        } else {
            //在小于10的日期上补0
            new_time += "0" + fd.getDate();
        }

        if (fd.getHours() >= 10) {
            new_time += " " + fd.getHours() + ":";
        }
        else {
            new_time += " 0" + fd.getHours() + ":";
        }
        return new_time; //输出格式：01-02 12
    }


    //index 为数据集中的总序号
    static getSheduleItemsFromId(info: CWebScheduleObjectInfo[], index: number, keyid: number): CWebScheduleObjectInfo |null{
        if (index < info.length) { //有时会出现数据比 info 多一个
            if (info[index].mKeyID == keyid)
                return info[index];
            for (var i = 0; i < info.length; i++) {
                if (keyid === info[i].mKeyID)
                    return info[i];
            }
        }
        else {
            console.error(`getSheduleItemsFromId 中出现 schema (${index + 1}) 和 info(${info.length}) 的长度不等`);
        }
        return null;
    }
    //index 为从架构出发的 循环id
    static getItemsFromSheduleId(data: CWebPredictDikeDataItem[], index: number, keyid: number)
    : [CWebPredictDikeDataItem, number] |[null, -1]{
        //yulong 有可能数据列长度小于架构长度
        if (index >= data.length) {
            return [null, -1];
        }
        if (data[index].mKeyID === keyid)
            return [data[index], index];
        for (var i = 0; i < data.length; i++) {
            if (keyid === data[i].mKeyID) {
                return [data[i], i];
            }
        }
        return [null, -1];
    }

    //不是严格的有效数字
    static toDight(val: number, How:number): number {
        let sVal: string;
        if (val < 10) {  //3.950
            sVal = val.toFixed(3);
        }
        else if (val < 100) { //39.50
            sVal = val.toFixed(2);
        }
        else if (val < 1000) { //395.0
            sVal = val.toFixed(1);
        }
        else if (val < 1000) { //3950
             sVal = val.toFixed(0);
        }
        else {//39500
            return parseFloat((val / 10).toFixed(0)) * 10;
        }
        return parseFloat(sVal);

    }

    static formatCellValue(jtype: number, subtype: number, value: number): number {
        let sVal: string;
        if (jtype === 3) {//仅对 调度条件
            if (subtype === 1) {  //水位
                sVal = value.toFixed(2);
                return parseFloat(sVal);
            }
            else if (subtype == 2) {//yulong:流量采用4位有效数字
                return BdsHelper.toDight(value, 4);
            }
            else if (subtype == 3) {//开启度
                //水位
                sVal = value.toFixed(0);
                return parseFloat(sVal);

            }
            else {
                sVal = value.toFixed(0);
                return parseFloat(sVal);

            }

        }
        else if (jtype === 2) {//{//yulong:流量采用4位有效数字
            return BdsHelper.toDight(value, 4);
        }
        else if (jtype === 1) {//水位
            sVal = value.toFixed(2)
            return parseFloat(sVal);
        }
        else if (jtype === 0) {
            sVal = value.toFixed(0)
            return parseFloat(sVal);
        }


        return value;


    }
    static _getUnitFromtype(jtype: number, subItem: number, detail?: boolean): string {
        if (jtype === 0)
            return detail ? "降雨(mm)" : "(mm)";
        if (jtype === 1)
            return detail ? "水位(m)" : "(m)";
        if (jtype === 2)
            return detail ? "流量(m^3/s)" : "(m^3/s)";

        if (jtype === 3) {
            switch (subItem) {
                case 1:
                    return detail ? "水位(m)" : "(m)";;
                case 2:
                    return detail ? "流量(m^3/s)" : "(m^3/s)";;
                case 3:
                    return detail ? "开度%" : "%";
                case 4:
                    return "(规则号)";
            }
        }
        return "";
    }


    static _sumerizeRowDay(item: CWebPredictDikeDataItem, startRow: number, endRow: number, jtype: number): number {
        var sum1 = 0;
        var len = endRow - startRow;
        var count = 0;
        for (var j = 0; j < len; j++)//row
        {
            var index = startRow + j;
            if (index < item.mQZT.length) {
                sum1 += item.mQZT[index];
                count++;
            }
        }
        if (count === 0)
            return 0;
        if (jtype === 0)
            return sum1;
        return sum1 / count;
    }



    static _averateRowDay(item: CWebPredictDikeDataItem, startRow: number, endRow: number): number {
        var sum1 = 0;
        var len = endRow - startRow;
        for (var j = 0; j < len; j++)//row
        {
            var val = item.mQZT[startRow + j];
            if (val === 0.0) {
                len--;
                continue;
            }
            sum1 += val;

        }
        if (len === 0)
            return 0;
        return sum1 / len;
    }






    static _revertColRow(data: number[][]):number[] []{
        var revert:number[][]= [];//col
        for (var i = 0; i < data.length; i++) {//row
            var dd = data[i];
            for (var k = 0; k < dd.length; k++) {
                if (!revert[k])
                    revert[k] = [];
                revert[k][i] = dd[k];
            }
        }
        return revert;
    }

    static belongColor(ctgrstyle: CtgrStyle, val: number):string {
        var len = ctgrstyle.colors.length;
        var sel = ctgrstyle.colors[len - 1];
        for (var i = 0; i < len; i++) {
            if (ctgrstyle.vals[i] <= val) {
                sel = ctgrstyle.colors[i];
            }
            else {
                break;
            }
        };
        return sel;
    }


    ///////////////////////////////////////
    //根据predictTime和 预见期 对数据按天分配
    static _getPredictDays(predictTime:Date, hourspan:number): number[] {
        let hours: number;
        let days: number;
        let firstdayhours: number;
        let tHours: number = predictTime.getHours();
        if (tHours < 8) {

            firstdayhours = (8 - tHours);
            hours = hourspan - (8 - tHours);
            days = 1 + Math.trunc(hours / 24) + ((hours % 24 === 0) ? 0 : 1);
            //			[ 0,(8 -predictTime.hours)+0*24,(8 -predictTime.hours)+1*24..., ];

        }
        else {
            firstdayhours = 24 - (tHours - 8);
            hours = hourspan - 24 + (tHours - 8);
            days = 1 + Math.trunc(hours / 24) + ((hours % 24 == 0) ? 0 : 1);
        }

        var daysets = [];
        daysets[0] = 0;
        for (var j = 1; j < days; j++) {
            daysets[j] = firstdayhours + (j - 1) * 24;

        }
        daysets[days] = hourspan;
        return daysets;
    }

//IdleTask.to 在解析的时候为字符串，这里要把它变成 Date
   static  JSONparseTask(stask:string):IdleTaskType{
         let task= JSON.parse(stask) as IdleTaskType;
         task.t0 =new Date(task.t0);
         return task;
     }




    //流域.方案/如  里下涨流域.水动力学模型
    static getTaskPrefix(ss: SubjectSeries): string {
       // return ss.mBasinName + '.' + ss.mPlanName;
          return ss.mPlanName;
    }

}





//同步定阅,原型，用于扩展
export class ConstsSubscrib {
    _consts: any
    subscribe(cb:Function) {
        cb(this._consts);
    }
    constructor(option:any) {
        this._consts = option;
    }
}



//只有一个 subscribe，后面的 subscribe  取代前面的 subscribeｗ
//Injectable　仅用于 progressSrv，其它需要 new 一个实列
@Injectable({
    providedIn: 'root'
})
export class SoleSubscrib<T> {
    _subscriber: Subscriber<T>;
    _globalsubscriber: Subscriber<T>;
    constructor() {
    }

    unsubscribe() {
        if (this._subscriber) {
            this._subscriber.unsubscribe();
        }
    }
    ssubscribe(cb: (x:T) => void): Subscription {
        return new Observable<T>(h => {
            //多次定阅后面一个取代前面一个
            if (this._subscriber) {
                this._subscriber.unsubscribe();
            }
            this._subscriber = h;
        }).subscribe((x: T) => {
            cb(x);
        });
    }


    gsubscribe(cb: (x:T) => void): Subscription {
        return new Observable<T>(h => {
            //多次定阅不起作用，只认第一次
            if (!this._globalsubscriber) {
                this._globalsubscriber = h;
            }
        }).subscribe((x: T) => {
            cb(x);
        });
    }


    dispatch(trgs: T): void {
        if (this._subscriber) {
            this._subscriber.next(trgs);
        }
        if (this._globalsubscriber) {
            this._globalsubscriber.next(trgs);
        }

    }
    complete() {
        this._subscriber.complete();
    }
}



export class WSubscrib<T> {
    _subscriber: any[] = [];

    constructor() {
    }
    subscribe(cb: (x:T) => void): Subscription {
        return new Observable<T>(h => {
            this._subscriber.push(h);
        }).subscribe((x: T) => {
            cb(x);

        });
    }
    dispatch(trgs: T): void {
        this._subscriber.forEach(x => {
            if (x) {
                x.next(trgs);
            }
        });
    }
    complete() {
        this._subscriber.forEach(x => {
            x.complete();
        });
    }
}
