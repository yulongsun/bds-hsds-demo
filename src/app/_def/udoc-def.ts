
import {CWebPredictOutItem, JTYPE,SubjectSeries,CWebBasicModelDynaPara} from './bds-meta';

import {  MapCatalog, } from './map-def';

export type SmartMode = 'test' | 'simple' |'primary' |  'professional' | 'advanced';
//数据库前缀
export type BasinTaskMongoName = 'task_test' | 'tasktaihu' | 'tasklixiahe' | 'taskquanshui'|  'taskshanghaislice';



export type MenuHeading = {
    text: string,
    headingMain: boolean
};

//在 infopanel.html 中 通过 routelink 关取到 route项中
export type MenuItem = {
    text: string, //'预报结果',
    link: string,// '/bdsserver/bdsshape' ,

    params?: {
        catalogi: number,//21,
        appdix: boolean,  //独立图形
        src?: string                //'ext'|'cnweather'|'zjsq' |'powerrec'//关联到route 时区分数据来源是， 流程图内部来源不需要定义
    }
};



//这个需要了，已
export interface MenuConfig {
    text: string,//'预报服务',
    link: string,//'/bdsserver',
    icon: string,    //  'icon-folder',
    submenu: MenuItem[]
}



export interface UserDocType {
    region: number;
    basin: string;
    alias:string;
    token: string;
    userkey: string;
    smartmode: SmartMode;

    binding?: string;
    usermenu?: MenuConfig[];

    useMapCat?(): boolean;
    getAccessUrl?(): string;
    showBackImg?():boolean;
}


export interface ServFindDef {
    bdsapi: string;
    redis: string;
    shpapi: string;
    extapi: string;
    loginapi: string;
    resapi: string;
    modelapi: string;
}


export interface ServConfig {
   start: {
        load:string,
        redis:boolean,
        "realtime":boolean,
        "//":string
    },

    udoc: {
        udocApi: string,
    },

    prod: ServFindDef;
    //  dev: ServFindDef;
}


export interface Spinner {
    getBaseUrl():string;
    accessUdoc(): UserDocType
    sevefind(): ServConfig,
    useBinding(): boolean;
    appBootstrap(): void;

}



export enum SmartPlayMode {
    AUTOPLAY = 0,   //显示smartbar ，流程图与smartba自动进行,但是连续执行
    NORMALPLAY = 1,   //显示smartbar， 但是单步，  --没测试
    SMARTPLAY = 2,   //显示smartbar，打开左测样则流程图单步，合上则自动
    NOFLOWBAR = 3,    //显示smartbar，不允许打开左侧流程图  --没测试
    NOSMARTBAR = 4,   //不显示smartbar,打开左侧，且单步，最原始的调试步骤

    NONEALL = 5,  //不显示smartbar, 不显示左侧，逻辑由程序自已次定面不是流程图决定

};

//AUTOPLAY, NOSMARTBAR
export const smartplay_mode = SmartPlayMode.NONEALL;

export type FlowSubitem = {
    postid: number,
    value: string,//专题名称
    background: string
}        
export type Flowitems = {
       batchid:number,
       items:FlowSubitem[],

}
/*
export type UFeature = {
    mPlanName: string;
    mRealStartTime: Date;
    mRealEndTime: Date;
    mHydroDtNo: number;
    mHydroDt: number;
    mBasinName: string;
    mName: string;
    mKeiID: number;
    mPredictTime: Date;
    mCurComputeTime: Date;
}
*/

export type UDocFeature = {
    udoc: UserDocType,
    udocList:UserDocType[],
    dynamParam: CWebBasicModelDynaPara;
    subjectSeries: SubjectSeries,
    backImg?:string,

}




export type PROP = {
    KeyID: number,  //todo:切换到 itemid
    Name: string,  //todo:切换到 itemname
    jType: JTYPE,//todo: 数据来源

    accum?: number,
    unit?: string,
    /////////////////
    itemid?: number; //同 KeyID
    itemname?: string;//同 Name
    seci?: number,
    secname?: string,
}

export type AccumPROP = {
    id: number,
    name: string,
    jType: JTYPE,//todo:用以不同的symbol的图图标表达！！！
    accum: number,
    unit: string,
}




export type InputParam = {
    keepColMode?: number,
    onlyAccum?:boolean,
}


//todo:首屏显示： 关键量，根据需要不断调整，得到好的设计
export type StartPage = {
    shape: number,              //首屏矢量图上的形状
    rain: number,               //首屏流域降雨相关,keyid:  0 全流域平均降雨，-1：所有雨量合在一起显示
  //  wl: CWebPredictOutItem,     //首屏水位边界相关
    predict:CWebPredictOutItem     //首屏流量边界相关   params 只能是简单对象通过url传递
 };

//测试用初始的依据时间，通常情况下是数字流域服务决定
export type StartaParam = {
    //  smartmode:SmartMode,
    startPredictTime?: Date | string,
    startPage?: StartPage,
    mainPage?:'google'|'regulate',
    redis:boolean, //redis 代表数据存储用于 task，testcase 不存数据为 false
}

export type OuttParam = {
    exclude?: number[],
}

export type OutPages = {
    preset: OuttParam,
    predict: OuttParam,
    statistic: OuttParam,
};

export type ModelName='quanshuiSys';




export type InputConfigItem = {
    start: StartaParam,
    exclude: number[],
    model?:ModelName,
    outpages?: OutPages,
    inpages?: { [key: string]: InputParam }
}

export type InputConfigDef = {
    [key: string]: InputConfigItem;
};





export type StorageConfig = {
        mongo: BasinTaskMongoName,
        redis: {
            address: string,
            port: number
        }
    }






/*
DocConfig 是 UDoc的一个超集（文档定义项的完整集），除了包含 Udoc项以外，还包含起动页面，地图定义，Input 格式项等
*/
export interface DocConfig {
    task:StorageConfig;
    udoc: UserDocType;
    subjectSeries: SubjectSeries;
    
    flowitems?:Flowitems;
    getSensorsCat?: string[];
    default_catalog?: MapCatalog;
    inputConfig?: InputConfigItem
}




export type PreLoadType ={
  udocapi:string;
  region:number;

}