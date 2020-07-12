

import { T4Fold,CWebDateTimeArray,CWebProcessData,DataFeature } from './bds-meta';





export type DataFeatrue = { data: CWebProcessData, info: DataFeature };
//data2 是数据的二维表示
export type DataInfo = {
    data: CWebProcessData,
    info:    DataFeature,
    data2?: number[][] | Date[][]
};
export type DataPredictList = {
    data: Array<CWebProcessData[]>,
    feature: DataFeature[]

}


//服务端使用
export type ElmField =

    //ElmField
    //todo:   站点类型全部改为大小双字节，原有的单字节改为重叠双字节
    //todo:   传感器类型改为三字节（BOD...）
    'Q' | 'P' | 'RW' | 'Z' |'DRP'|
    'temp' | 'windD' | 'windDL' | 'windS' | 'rain' | 'hum' |
    'zz' |
    'qq' |  // "流量",
    'qqin' | //  "流入流量",
    'qqout' | // "流出流量",
    'bb' | // "水面宽度",
    'bb' | // "水面宽度",
    'aa' | // "过流面积",
    'envirData'; // "污染物浓度", //根据实际情况确定 突发污染的名称




//unit
export interface PollutTypeUnit {
    id: number; //ElmField
    name: string;
    unit: string;
}

export interface CtgrStyle {
    vals: number[],
    colors: string[],
}
export type SenosorType = {
    type: number;
    name: string;
    unit: string;
    cat?: CtgrStyle;  //分级标准
    chart: any
}




export type EnvMetaType = {
    //右键菜单中的相关项，和地图分组显示项，从 getEnvSChema 获取
    envir_type: number[],
    envir_name: string[],
    envir_unit: string[],  //与 envir_type 对应的单位
    envir_cat: CtgrStyle[],//与  envir_type 对应的分级 第0级是最后一级，  5，1，2，3，4  对于DO 来说是反序
    envir_chart?: unknown[], //EChartOption
    envir_sensor?:SenosorType[],

};


export class TypeElmCtgr {
    //根据    GetComputeElement 的品种（7个）将水质浓度分为五类
    //mEnviNo   一类(050）、二类（150）、三类（250）、四类（350）、五类（450），真正的水质类别数据是采用mEnviNo/100 的线性插值计算的

    /*
     static EnviItemKeyID: number[] = [
         50, 150, 250, 350, 450
     ];
 */
    types: number[];
    categery: CtgrStyle[];
    names?: string[];
    units?: string[];
    constructor(env?: EnvMetaType) {
        if (env) {
            this.names = env.envir_name;
            this.types = env.envir_type;
            this.categery = env.envir_cat;
            this.units = env.envir_unit;
        }

    }

}


export interface CWebModelSchemaType {
    mElmsCtgr: TypeElmCtgr
    mElmsUnit: PollutTypeUnit[]
    mTimeList: CWebDateTimeArray
}





export interface TypeItem {
     getAttr(): string[];
    getElmDataInfo(sttype: number, DataFeature: DataInfo, elmi: number): DataInfo;
    getElmOption(sttype: number): EnvMetaType;
    getChartStyle(elmi: number, t4: T4Fold): unknown;   //EChartOption

}


 export interface  IStationOptions{
    getElmOption(sttype: number): EnvMetaType;
    getEChartOption(jtype: number):  unknown;   //EChartOption

 }

export interface InfoMeta {
    mName: string;
    mDataType: number;
    getStationOption(): IStationOptions;
}


export type DBConfig = {
    username: string;
    password: string;
    database: string;
    //   ip: string;
    //  port: number,
    connStr: string;
    staiontable?: string;
    datatable?: string;

}