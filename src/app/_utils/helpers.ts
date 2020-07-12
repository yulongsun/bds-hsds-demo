
export class Helpers {
    static __hours: number = 3600 * 1000;   //hour->sec

    //返回ms
    static connverTimeFromCsharpTick(sec: number): number {
        return sec * 100 - 62135596800000;
    }


    static datePipetransform(st: string | Date, fmt:string):string {
        let dt = new Date(st);
        let o :{ [key: string]: number }= {
            "M+": dt.getMonth() + 1, //月份
            "d+": dt.getDate(), //日
            "H+": dt.getHours(), //小时 //
            "m+": dt.getMinutes(), //分
            "s+": dt.getSeconds(), //秒
            "q+": Math.floor((dt.getMonth() + 3) / 3), //季度
            "S": dt.getMilliseconds() //毫秒
        };
    


        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));

        for (let k in o) {
          
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1,
                 (RegExp.$1.length == 1) ? (''+o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
         return fmt;
    }



    static tmFromNow(tm: Date): string {
        let dt = Date.now() - tm.getTime();
        let min = Math.round(dt / (60 * 1000));
        if (min <= 60) {
            return min + '分钟前';
        }
        let hours = Math.round(min / 60);
        if (hours < 24) {
            return hours + '小时' + (min % 60) + '分钟前';
        }
        else {
            return this.datePipetransform(tm, 'MM-dd HH:mm');
        }

    }



    static sharpHour(dt: number): number {
        return Math.floor(dt / 3600 / 1000) * 3600 * 1000;
    }

    static sharpDateHour(dt: Date): Date {
        return new Date(Helpers.sharpHour(dt.getTime()));
    }

    static formatDHM(fd: Date): string {
        let new_time = "";
        if (fd.getDate() >= 10) {
            new_time += fd.getDate() + "日";
        } else {
            //在小于10的日期上补0
            new_time += "0" + fd.getDate() + "日";
        }
        if (fd.getHours() >= 10) {
            new_time += " " + fd.getHours() + "时";
        }
        else {
            //在小于10的日期上补0
            new_time += " 0" + fd.getHours() + "时";
        }
        if (fd.getMinutes() >= 10) {
            new_time += fd.getMinutes();
        }
        else {
            new_time += "0" + fd.getMinutes();
        }
        return new_time; //输出格式：01日02时
    }


    static parseDate(str?:string):Date {
        if (typeof str == 'string') {
            let results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
            if (results && results.length > 3)
                return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]));
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
            if (results && results.length > 6)
                return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]), parseInt(results[6]));
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
            if (results && results.length > 7)
                return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]), parseInt(results[6]), parseInt(results[7]));
        }
        return new Date();
    }
    static formatDate(v:Date):string {
        if (typeof v == 'string') {
          v = Helpers.parseDate(v);
        }
        if (v instanceof Date) {
            let y = v.getFullYear();
            let m = v.getMonth() + 1;
            let d = v.getDate();
            let h = v.getHours();
            let i = v.getMinutes();
            let s = v.getSeconds();
         //   let ms = v.getMilliseconds();
            //   if (ms > 0) return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s ;+ '.' + ms;
            if (h > 0 || i > 0 || s > 0) return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
            return y + '-' + m + '-' + d;
        }
        return '';
    }

    static formatHH(fd: Date, detail?: boolean): string {
        let new_time = "";
        let hours = fd.getHours();
        if (hours == 0 || detail) {
            if (fd.getDate() >= 10) {
                new_time += fd.getDate() + "日";
            } else {
                //在小于10的日期上补0
                new_time += "0" + fd.getDate() + "日";
            }
        }
        if (hours >= 10) {
            new_time += "" + hours + "时";
        }
        else {
            //在小于10的日期上补0
            new_time += "0" + hours + "时";
        }

        return new_time; //输出格式：01日02时
    }



    static formatD(fd: Date, num: number): string|null { //所有的点以日为单位
        if (num <= 24) {
            return this.formatDHM(fd);
        }
        let date = fd.getDate();
        if (num >= 100) {
            if (date != 1) { //仅在1日时显示时间
                return null;
            }
            return fd.getMonth() + 1 + "月" + date;
        }
        return date + "日";
    }

    static formatMD(fd: Date): string {
        let date = fd.getDate();
        if (date >= 10) {
            return fd.getMonth() + 1 + "月" + date + "日";
        }
        else {
            return fd.getMonth() + 1 + "月0" + date + "日";
        }
    }


    static formatMDH(fd: Date): string { //所有的点以日为单位
        return (fd.getMonth() + 1) + "月" + Helpers.formatHH(fd, true);

    }
    static formatDateTimeHH(fd: Date): string {
        let new_time = fd.getFullYear() + "-";
        let month = fd.getMonth() + 1;
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
            new_time += " " + fd.getHours() + ":00";
        }
        else {
            new_time += " 0" + fd.getHours() + ":00";
        }

        return new_time; //输出格式：2013-01-02 12:00
    }


    static formatDateTime(fd: Date): string {
        let new_time = fd.getFullYear() + "-";
        let month = fd.getMonth() + 1;
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
        if (fd.getMinutes() >= 10) {
            new_time += fd.getMinutes() + ":";
        }
        else {
            new_time += "0" + fd.getMinutes() + ":";
        }
        if (fd.getSeconds() >= 10) {
            new_time += fd.getSeconds();
        }
        else {
            new_time += "0" + fd.getSeconds();
        }

        return new_time; //输出格式：2013-01-02 12:23:10
    }




    static getSharpType(type: number) {
        if (type < 10) {
            return '__' + type;
        }
        if (type < 100) {
            return '_' + type;
        }
        return type;
    }

//需要与服务器端一致
    static getPrePredictDay(hours:number) {
        return hours > 24 ? 3 : 1;
    }
    static getPreStatisticsDay(hours:number) {
        return hours > 24 ? 3 : 1;
    }

    static incDay(datetime: string, days: number, fn:Function |null) {
        var old_time = new Date(datetime.replace(/-/g, "/")); //替换字符，js不认2013-01-31,只认2013/01/31
        var fd = new Date(old_time.valueOf() + days * 24 * 60 * 60 * 1000); //日期加上指定的天数
        if (fn){
            return fn(fd);
        }
        return Helpers.formatDateTimeHH(fd);
    }

    static toJSON8(dt:Date): string {
        return dt.toJSON();//+ 8 * 3600 * 1000

    }


    static toArray(obj:any): any[] {
        let arr: any[]  = [];
        Object.keys(obj).map(function (key) {
            arr.push({
                key,
                value: obj[key]
            })
            return arr;
        });
        return arr;
    }
    static isAllZearo(arr: number[]): boolean {
        let ii = arr.findIndex(x => {
            return !!x;
        })
        return ii < 0;
    }
}
