import { Feature, FeatureCollection,  GeometryCollection } from 'GeoJSON'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import { of, from, merge } from 'rxjs';
import { map, find, reduce } from 'rxjs/operators';


export class Storage {
    fd: any;
    content = '';
    fname: string;

    constructor(name: string) {
        this.fname = path.join(name);
        this.fd = fs.openSync(this.fname, 'w');
    }

    writeContent(content:string) {
        fs.appendFileSync(this.fd, content);
    }


    //生成类
    genClass(name: string, inst: any[]) {
        from(inst).pipe(
            reduce((acc, val) => {
                return { ...acc, ...val };
            }),
        ).subscribe(h => {
            Object.keys(h).forEach(y =>
                h[y] = "string"
            );

            let klass = JSON.stringify(h, null, '   ').replace(/\"/g, '').replace(/,/g, ';');

            this.content = (`
            
    class  ${name}  ${klass}`);
        });
        this.writeContent(this.content);
    }
}





export class Utils {

    // "20190510230000"
    static parseStringDate(str: string): Date {
        let yyyy = Number(str.substr(0, 4));
        let MM = Number(str.substr(4, 2)) - 1;
        let dd = Number(str.substr(6, 2));
        let hh = Number(str.substr(8, 2));
        let mm = Number(str.substr(10, 2));
        let ss = Number(str.substr(12, 2));
        let t = new Date(Date.UTC(yyyy, MM, dd, hh, mm, ss));
        return t;
    }


    static mkdirs(dirpath:string, mode:string, callback:fs.NoParamCallback) {
        fs.exists(dirpath, (exists) => {
            if (exists) {
                let err= {
                    name:'',
                    message:'',

                    errno:0,
                    path:dirpath

                }
                callback(err);//yulong
            } else {
                //尝试创建父目录，然后再创建当前目录
                this.mkdirs(path.dirname(dirpath), mode, function () {
                    fs.mkdir(dirpath, mode, callback);
                });
            }
        });
    };


    static createGeo(Temp:any): FeatureCollection {
        let geo = Utils.deepCopy(Temp);
        return geo;
    }


    static GetnerateDateSeries(predoctT: Date, num: Number, step: number): Date[] {
        let dt = step * 1000;//86400.0;//sec->ms
        let Tlist: Date[] = [];
        for (let j = 0; j < num; j++) {
            Tlist.push(predoctT);
            predoctT = new Date(predoctT.getTime() + dt);
        }
        return Tlist;
    }






    static deepCopy(obj:any):any {
        let copy :Date| object[];

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        else if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.deepCopy(obj[i]);
            }
            return copy;
        }

        // Handle Object
        else if (obj instanceof Object) {
            let copy :any= {};
            for (let attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    /**
    * 生成n个随机数的的数组
    * @param n 数组的元素个数
    * @param rangeL 随机数的最小值
    * @param rangeR 随机数的最大值
    */
    static generateRandomArray(n: number, rangeL: number, rangeR: number): number[] {
        if (rangeL > rangeR) {
            throw new Error('rangeL应该大于rangR')
        }
        let arr = new Array(n)
        for (let i = 0; i < n; i++) {
            arr[i] = Math.floor(Math.random() * (rangeR - rangeL + 1)) + rangeL
        }
        return arr
    }


    static extractObject(str: string): object |null{
        let pos1 = str.indexOf('{');
        let pos2 = str.lastIndexOf('}');
        let aa = str.substring(pos1, pos2 + 1);
        if (aa) {
            try {
                return JSON.parse(aa);
            }
            catch (e) {
                // console.info(aa);
                return eval('(' + aa + ')');

            }
        }
        return null;

    }

    public static parseDate(str: string): Date {
        //2011-04-11T10:20:30Z'
        //return  new Date(str.replace(' ', 'T') + 'Z');
        str = str.replace(new RegExp("/", 'gm'), "-");
        let results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
        if (results && results.length > 3)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));

        results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}) *$/);
        if (results && results.length > 5)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), 0);

        results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
        if (results && results.length > 6)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10));
        results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
        if (results && results.length > 7)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10), parseInt(results[7], 10));

        return new Date();
    }




    public static getLocalIP(): string[] {

        const osType = os.type(); //系统类型
        const netInfo = os.networkInterfaces(); //网络信息
        let ips = [];
        if (osType === 'Windows_NT') {
            for (let dev in netInfo) {
                //win7的网络信息中显示为本地连接，win10显示为以太网
                //  if (dev === '本地连接' || dev === '以太网' || dev.indexOf('本地连接*')==0 ) {
                if (dev === 'WLAN' || dev ===  'NIC1'||dev === '本地连接' || dev === '以太网') {
                    for (let j = 0; j < netInfo[dev].length; j++) {
                        if (netInfo[dev][j].family === 'IPv4') {
                            ips.push(netInfo[dev][j].address);
                            //如果有多个，将多个一起加入到配置中

                        }
                    }
                }
            }

        } else if (osType === 'Linux') {
            ips.push(netInfo.eth0[0].address);
        }

        return ips;
    }



}