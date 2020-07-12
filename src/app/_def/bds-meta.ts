import { CWebModelSchemaType } from "./base-def";


//当前结果采用的最小实测时间
//水文序列的最小实测时间
//拟采用的开始计算时间
//依据时间应该大于这个时间？



export interface Dictionary<T> {
    [key: string]: T;
}





export enum Status {
    Idle = 0,
    Expire,
    Hired,

}



//界面节点显示状态
export enum StatusFlag {
    node_status_mouseover = -3,
    node_status_selected = -2,  //selected
    node_status_null = -1,
    node_status_unselected = -1,
    node_status_disable = 0,
    node_status_enable = 1,
    node_status_ing = 2,
    node_status_done = 3,
    node_status_source = 4, //源是发动机on状态，行为是done,但不受from端的影响。
    node_status_pass = 5,  //路径，通由上一个节点的任一个节点通向（源 完成节点）
    node_status_break = 6,  // b
}
/*
export class SerializationHelper {
    static toInstance<T>(obj: T, json: string | object): T {
        var jsonObj: object = <object>(json);
        if (typeof json == "string")
            jsonObj = JSON.parse((json));

        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        }
        return obj;
    }
}
*/
//将jsonobj l转换成相应的类实例
class ToClassInstance {

    toClassInstance(jsonObj:any) {
        for (var propName in jsonObj) {
          // this [propName] = jsonObj[propName];
           Object.defineProperty(this,propName,jsonObj[propName])
        }
        return this;
    }
}


/*
export class SelectListItem {
    //
    // 摘要:
    //     获取或设置一个值，该值指示是否禁用此 System.Web.Mvc.SelectListItem。
    Disabled: boolean;
    //
    // 摘要:
    //     表示此项已包装到的选项组 HTML 元素。在选择列表中，支持多个同名组。它们与引用相等性进行比较。
    Group: any;    //SelectListGroup
    //
    // 摘要:
    //     获取或设置一个值，该值指示是否选择此 System.Web.Mvc.SelectListItem。
    //
    // 返回结果:
    //     如果选定此项，则为 true；否则为 false。
    Selected: boolean;
    //
    // 摘要:
    //     获取或设置选定项的文本。
    //
    // 返回结果:
    //     文本。
    Text: string;
    //
    // 摘要:
    //     获取或设置选定项的值。
    //
    // 返回结果:
    //     值。
    Value: string;

}
*/
/* predict time
export class T1Fold {
    T0: Date;
}
*/
export class T2Fold {
    T0: Date; //依据时间
    T1: Date  //依据时间 +预报周期
}
export class T3Fold extends T2Fold {
    T_: Date;  //历史数据的起点
}
export class T4Fold extends T3Fold {
    Ta: Date;  //计算点时间
}

export class RtnType<T>{
    /// 出错时返回的提示信息
    /// </summary>
    msg: string;
    /// <summary>
    /// 标题
    /// </summary>
    title: string;
    /// <summary>
    /// 返回结果码
    /// </summary>
    result: number;
    /// <summary>
    /// 根据执行的情况显示不同的节点状态
    /// </summary>
    status: number;//NODE_STATUS
    /// <summary>
    /// 返回结构体信息内容
    /// </summary>
    data: T;
    // toRet :()=>ReturnType<string>;
}

export function NullRtnType(msg: string) {
    return {
        result: -1,
        msg: msg,
        data: null,
        title: '',
        status: 0,
    }

}


// 零维模型要素，如调蓄湖泊等等
export class resultCell {
    keyID: number;// 模型的ID
    zz: number;// 水位
    envirData:number[];// 各水质指标及来水组成项的数据输出
}
// 联系模型，比如闸泵工程等。
export class resultLinker {
    keyID: number;// 模型的ID
    qq: number;// 流量
}

// 河道模型
export class resultRiver {

    keyID: number;// 模型的ID
    zz: number[];// 各断面水位
    qqin: number[];// 各断面流入断面流量
    qqout: number[];// 各断面流出断面流量
    bb: number[];// 各断面水面宽度
    aa: number[];// 各断面过流面积
    envirData: number[][];// 各断面水质指标及来水组成项的数据输出，
}
// 管网模型
export class resultPipe {

    keyID: number;// 模型的ID
    zz: number[];// 各断面水位
    qqin: number[];// 各断面流入断面流量
    qqout: number[];// 各断面流出断面流量
    envirData: number[][];// 各断面水质指标及来水组成项的数据输出，
}

// 湖泊二维
export class resultLake2D {

    keyID: number;// 模型的ID
    zz: number[];// 各网格水位
    uu: number[];// 各网格U方向流速
    vv: number[];// 各网格V方向流速
    envirData: number[][];// 各网格水质指标及来水组成项的数据输出，
}

// 河道二维
export class resultRiver2D {
    keyID: number;// 模型的ID
    zz: number[];;// 各网格点水位
    uu: number[];;// 各网格点ξ方向流速
    vv: number[];;// 各网格点η方向流速D:\防洪决策系统软件开发\BdsServer2\BdsServer2\App_Start\
    envirData: number[][][];// 各网格点水质指标及来水组成项的数据输出，
}
export declare type RESULLISTELM =
    resultCell |    //零维模型要素
    resultLinker | ///联系模型
    resultRiver |   // 河道模型
    resultPipe |  // 管网模型
    resultLake2D |// 湖泊二维
    resultRiver2D; // 河道二
export declare type RESULLIST =
    resultCell[] |    //零维模型要素
    resultLinker[] | ///联系模型
    resultRiver[] |   // 河道模型
    resultPipe[] |  // 管网模型
    resultLake2D[] |// 湖泊二维
    resultRiver2D[]; // 河道二


export class ResultSet {
    rcList?: resultCell[];    //零维模型要素
    rlList?: resultLinker[]; ///联系模型
    rrList?: resultRiver[];   // 河道模型
    rpList?: resultPipe[];;     // 管网模型
    rl2DList?: resultLake2D[]; // 湖泊二维
    rr2DList?: resultRiver2D[]; // 河道二维
}

export type ResultSetSeries = {
    index: number;            //预见期小时序数
    totalsize: number;      //数据总的大小
    data: ResultSet;        //在小时数时的数据
}



export interface Db_ModelData {
    _id: {
        uuid: string
        t1: Date
    },
    uuid: string,
    t1: Date,
    prefix: string,
    file: ResultSet

}



export declare type ItemSecReq = {

    itemid: number, seci: number
}

export declare type TmarkReq = {

    fname: string;
}

/*
export class GeoIndex {
    ID: number;
    name: string;
}
export interface SelectItem {
    name: string;
    id: number;

}
*/
//////////////////////////////////////////////
//真接用string 代替！
export interface CWebToken {
    data1: number;
    data2: number;
    data3: number;
    data: number[];
}


/*

            [{
    "mKeyID": 1,
    "mName": "水位"
}, {
    "mKeyID": 7,
    "mName": "流量IN"
}, {
    "mKeyID": 8,
    "mName": "流量OUT"
}, {
    "mKeyID": 72,
    "mName": "圩内调蓄水位"
}, {
    "mKeyID": 73,
    "mName": "圩外调蓄水位"
}, {
    "mKeyID": 74,
    "mName": "圩内调蓄水深"
}, {
    "mKeyID": 28,
    "mName": "流速"
}, {
    "mKeyID": 13,
    "mName": "水深"
}, {
    "mKeyID": 29,
    "mName": "过水面积"
}, {
    "mKeyID": 17,
    "mName": "河宽"
}, {
    "mKeyID": 16,
    "mName": "底高"
}, {
    "mKeyID": 24,
    "mName": "总入流流量"
}, {
    "mKeyID": 25,
    "mName": "总出流流量"
}, {
    "mKeyID": 14,
    "mName": "水面积"
}, {
    "mKeyID": 15,
    "mName": "蓄量"
}, {
    "mKeyID": 18,
    "mName": "平均水深"
}, {
    "mKeyID": 19,
    "mName": "平均水位"
}, {
    "mKeyID": 20,
    "mName": "最高水位"
}, {
    "mKeyID": 21,
    "mName": "最低水位"
}, {
    "mKeyID": 26,
    "mName": "水面线"
}, {
    "mKeyID": 27,
    "mName": "底高程线[沿程]"
}, {
    "mKeyID": 37,
    "mName": "左岸堤高程[沿程]"
}, {
    "mKeyID": 38,
    "mName": "右岸堤高程[沿程]"
}, {
    "mKeyID": 42,
    "mName": "河道大断面图"
}, {
    "mKeyID": 82,
    "mName": "流量[沿程]"
}]
*/
export class CWebDataTypeItemInfo {
    mKeyID: number;//             对应着的ID
    mName: string;//             对应着的说明或名称

};



export type ModelResultypeSch = {
    itemid: number,
    seci: number,
    data: CWebDataTypeItemInfo[]
}

export type Db_Modelsch = {
    _id: {
        itemid: number,
        seci: number,
    },
    item: number,
    seci: number,
    uuid: string,  //
    prefix: string,
    sch: CWebDataTypeItemInfo[]


}

export interface LimitFeature {
    id: number;
    type: number;
    ymaxlimit: number;
    yminlimit: number;

}

export interface CWebModelItemInfo {//水动力模型要素基本信息
    mKeyID: number;//             对应的模型要素ID值
    mName: string;//             名称
    mType: number;//             类型，是指模型要素 零维(0)、一维(1)、联系（2）、二维（3）

};


export class GeoData<T> extends ToClassInstance {
    type: number;
    name: String;
    _data: T[];
    _time: Date;

}

export class GeoFiles extends GeoData<string>{
    files: string[];
    checkeds: boolean[] = [];//是否选中的列表，与files配套便用
    listeds: boolean[] = [];  //是否下载列表，，与files配套便用

    getFileTitle(i: number): string {
        let path = this.files[i];
        let fileName = path.split(/[\\/]/).pop();
        if(!fileName){
            return '';
        }
        let aaa: string[] = fileName.split('.');
        return aaa[0];
    }
    //yulong 这里决定加载的webshaper 文件列表
    //文件放在data/result/目录下
    getWebfiles(i: number): string {
        //只对传入的shape 文件有效
        //如果有多个文件多个文件用，隔开,应该取第一个，有可能这时取到最后一个???????????
        let path = this.files[i];
        let fileName = path.split(",")[0].split(/[\\/]/).pop();  //???????????????????
        if(!fileName){
            return '';
        }
        if (this.type >= 0)//shape图  存在  data/Result 文件夹
        {
            let aaa: string[] = fileName.split('.');
            let dbfFile = "Result/" + aaa[0] + ".DBF";
            //webshape 默认放在 data文件夹下的
            let shapefile = "Result/" + fileName;
            let fillist = shapefile + "," + dbfFile;
            //   fillist += ",Result/一维河道[断面].SHP,Result/一维河道[断面].DBF";
            return fillist;
        }
        else {
            //直接返回文件名，存在 data 文件夹
            //点击时需要转到地图
            //string fillist = GeoModel.getModeltypeMap(_typeTab);
            //return fillist;
            //下载时需要的文件名
            return fileName;
        }
    }
}


export class GeoModel {
    _mdlist: CWebModelItemInfo[];
    _modeltype: number;//filetype
    KeyID: number;
    constructor(modeltype: number, mdlist: CWebModelItemInfo[], KeyID: number) {
        this._modeltype = modeltype;
        //   this._typeTab = typeTab;
        this._mdlist = mdlist;
        this.KeyID = KeyID;
    }
}

export class GeoFilesModel<T> extends GeoModel {
    _gfl: T[];
    constructor(modeltype: number, gfl: T[], mdlist: CWebModelItemInfo[], KeyID: number) {
        super(modeltype, mdlist, KeyID);
        this._gfl = gfl;

    }
}




export type MenuItemObj = {
    value: string,
    icon?: number,
    sep?: boolean,
}
export declare type MenuItem = {
    menuid: number;
    value: string;
    icon?: number;
    sep?: boolean;
    postid?: number;
    background?: string;
}


//todo:GroupItem 直接用 CWebOutDataItem！！
export class GroupItem {
    mGroupNumber: number;
    label: string;//综合得到的显示名称
    mDataItemList: CWebPresetResultInfo[];
    mDataType: number; //类型
    isOpen: boolean;     //yulong  是否在正在找开的列表中

    //由第一个项止 得到分组类型和分组名称
    constructor(aa?: CWebPresetResultInfo[]) {
        if (aa) {
            aa.forEach(gitem => {
                let name = gitem.mName;
                if (name.indexOf("计算") > 0) {
                    name = name.replace("计算", "");
                }
                else {
                    name = name.replace("实测", "");
                }
                this.label = name;
                //???????
                this.mDataType = gitem.mDataType;

                this.mGroupNumber = gitem.mGroupNumber;
                /*
                    mMaxData: number;
                    mMinData: number;
                    mPerData: number;
                    mDbsCode: string;
                    */
            })
            this.mDataItemList = aa;

        }
    }
}

export declare type GroupItemDic = {
    [key: number]: GroupItem
}


export class CWebPredictOutItem {
    mCKeyID: number;
    mRKeyID: number;
    mName: string;
    mType: number;
}

declare interface CWebPredictDataInfo {
    mBasinName: string;
    mWebPredictOut: CWebPredictOutItem[];
}

export interface CWebSubjectInfo {
    mIsRealDike: boolean
    mBasicModelName: string
    mBasicModelGroupName: string
    mBasicModelInfo: string
}

export interface CWebDownloadFileItemInfo {//该结构专门用于传输文件用
    mpBuffer: any;
    mnReadSize: number;
    mbEof: boolean;

}

export interface CWebHydroSeries {//水文序列信息
    mKeiID: number;//             对应着的ID,是指年份？？？
    mName:string;//             对应着的说明或名称
    mStartTime: Date;//             水文序列上的起始时间
    mEndTime: Date;//             水文序列上的结束时间

}
/// <summary>
/// 水文系列和主题
/// </summary>
export interface SubjectSeries {
    /// <summary>
    /// 方案名称
    /// </summary>
    mPlanName: string;
    /// <summary>
    /// 起始时间
    /// </summary>
    mRealStartTime: Date;
    /// <summary>
    /// 结束时间
    /// </summary>
    mRealEndTime: Date;
    /// <summary>
    /// 预报点数
    /// </summary>
    mHydroDtNo: number;
    /// <summary>
    /// 预报时长
    /// </summary>
    mHydroDt: number;
    /// <summary>
    /// 流域名称
    /// </summary>
    mBasinName: string;
    /// <summary>
    /// 水文序列
    /// </summary>
    //  _mdlist: CWebHydroSeries[];
    /// <summary>
    /// 水文序列名称
    /// </summary>
    mName: string;

    /// <summary>
    /// 水文序列ID
    /// </summary>
    mKeiID: number;

}



/**
 * 流程图配置项
 */
export interface ConfigElement {
    postid: number     //流程图id
    value: string;
    background: string;  //背景图id
}
export class MenuAct {
    postid: string;
    sub: string;
    background: string;
}

//RunTimeInfo  运行时信息
export class CWebBasicModelDynaPara {
    mPredictTime: Date;
    mCurComputeTime: Date;
    mHydroDtNo: number;

}


export interface CWebSubjectDetailInfo {//专题静态参数,输出

    mIsRealDike: boolean;//             是否为实时预报调度专题
    mDtt: number;//             水动力时间步长
    mHydroDt: number;//             水文模型步长
    mHydroDtNo: number;//             水动力时间步长、水文时间步长与预报时段数
    mComputeInfo: number;//             专题计算信息，    #NAME?
    mBasinName: string;//             流域名称
    mPlanName: string;//             专题名称
    mBasicModelGroupName: string;//             相应的专题分组名称， 增加
    mBasicModelInfo: string;//             相应的专题说明， 增加
    mRealStartTime: Date;//             水文序列上的起始实测资料时间
    mRealEndTime: Date;//             水文序列上的结束实测资料时间
    mXForBL: number,
    mYForBL: number;//             流域中心点经纬度坐标                 ,2013-4-8

};

//用于预报的通用站点
export declare type resultset_bds = 'Cell' | 'Linker' | 'River' | 'Pipe' | 'Lake2D' | 'River2D';
//用于非预报的通用站点
export declare type resultset_type = 'MRTEO' | 'BBB' | 'DDD' | 'TTT' | 'DDP' | 'SSS' | 'PPP' | 'ZZZ' | 'ZZQ' | 'RRR' | 'ZZG' | 'ZZB'
  |'ZZ'     | 'DRP' | 'RSVR' | 'RIVER' | 'TIDE' | 'WAS' |'BasinRain'|'ImgSer';
export declare type RESULTNAME = resultset_bds | resultset_type;

export enum JTYPE {
    jRiver2D = -7,
    jLake2D = -6,
    jPipe = -5,

    jRiver = -4,
    jLinke = -3,
    jCell = -2,
    jAll = -1, //unkown
    jRain = 0,
    jWL,
    jFlow,
    jSchedule,
     jEnvi,
     jPredict,
    jPreset,

//组合的数据来源，可以是以上的数据来原的合成，用于在地图图层的切换组合
    jWl_Flow,


};
export enum CTGRTYPE {
    cAll = -1,
    cPreset = 0,
    cPredict,
    cStat,
}



export interface CWebScheduleObjectInfo {//预报输入对象信息，包括：降雨、引入流量、调度对象及潮位预报等
    //             实时预报调度对象信息，主要是用于给外界应用提交供相关信息
    //             该数据结构也可以用于预报成果输出的对象信息中
    //             也可以是其他的一些信息要素集
    mKeyID: number;//             对应的模型要素ID值
    mName: string;//             名称
    mType: JTYPE;//             类型，注意就是模型要素的类型值 0--降雨, 1--- 潮位 2--流量  3--工程调度4--水质预报边界
    //             还有一种是指模型要素 零维、一维、二维
    mSchedulingPlanNameArray?: string[];//             调度对象包含的调度预案名称列表增加

};//与结构CWebModelDataItemInfo相同，



export interface CWebScheduleObjectArray {
    mBasinName: string;//             对应着流域名称
    mWebModelDataInfo: CWebScheduleObjectInfo[];//             输出项，得到服务器端的专题信息集，用于客户端界面用

};//与结构CWebModelDataInfo相同，
export interface CWebPredictAnalysisObjectInfo {//保存预报输出的信息，主要是对应着BDS中的CHydroDataEmendationItem信息
    mCKeyID: number;//             对应的CDataOutItem中的ID值，全局唯一,一个是模型计算
    mRKeyID: number;//             对应的CDataOutItem中的ID值，全局唯一,一个是实测输出ID值
    mName: string;//             名称
    mType: number;//             类型，注意就是数据类型值 1---水位 2--流量

};
export interface CWebPredictAnalysisObjectArray {
    mBasinName: string;//             对应着流动名称
    mWebPredictOut: CWebPredictAnalysisObjectInfo;//             输出项，得到服务器端的预报信息集，用于客户短界面用

};
export class PresetRequest  {
    grpid: number;
    t0: Date;
    t1: Date;
    subid: number;//和服务起一起需要改为keyid
    tab?:number; //输出 |预报 |统计相关,向服务器发送时不需要这一项

}



export class PredRequest  {
    name: string;
    tab: number;  //0: preset;1:predict:2:statistic
    ckeyid: number;
    rkeyid: number;
}

/*
//cf. CWebPresetResultInfo
export interface CWebOutDataItem {
    mKeyID: number;
    mName: string;
    mXO?: number;
    mYO?: number;
    mDataType: number;
    mMaxData?: number;
    mMinData?: number;
    mPerData?: number;
    mGroupNumber: number;// 归属分组，分组的唯一性依据
    mDbsCode?: string;
}
*/


//下面的一组数据是输出相应的主图形输出的成果信息
export class CWebPresetResultInfo {//对应着CDataOutItem
    mKeyID: number;//CDataOutItem             中对应着的mKeyID,全局唯一
    mName: string;//             对应着要素名称
    mXO?: number;//             对应着坐标点X
    mYO?: number;//             对应着坐标点Y
    mDataType: number;//             数据类型,小于0为实测资料，大于0为模型计算资料
    mMaxData?: number;
    mMinData?: number;
    mPerData?: number;//             该数据显示区间数值,2013-4-8,单位刻度数
    mGroupNumber: number;//             分组号，主要是用于解决计算与实测同显示问题                 ,2013-4-8
    mDbsCode?: string;//             对应着相应的数据库代码



};
export class CWebPresetResultInfoArray {//对应着所有主图形
    mBasinName: string;//             对应着流域名称
    mWebOutDatas: CWebPresetResultInfo[];

};
export type PresetInfo =
    {
        [key: number]: CWebPresetResultInfo[]
    }

export class CWebDateTimeArray {
    mDateTime: Date[];//             输出的过程数据时间序列
    mRealStartTime: Date;//             水文序列上的起始实测资料时间
    mRealEndTime: Date;//             水文序列上的结束实测资料时间

};
export class RealWLProcessData  {
    mDateTime: Date[];//             输出的过程数据时间序列
    mData: number[];//
    mVlm: number[];//

}


//由echart 的tmark而来
export interface DateMark extends Date {
    itemStyle:string;
    value:string;

}

export class CWebProcessData {//得到过程数据,输出
    mDateTime: Date[];//             输出的过程数据时间序列
    mData: number[];//             输出的过程数据中的数据序列
    constructor(ss?: CWebProcessData) {
        if (ss&& ss.mData) {
            this.mDateTime =ss.mDateTime.map(x=> new Date(x));
            this.mData = ss.mData;
        }
        else{
            this.mDateTime =[];
            this.mData =[];
        }
    }

    //
    static merge(d1: CWebProcessData, d2: CWebProcessData):CWebProcessData {
        let total = new CWebProcessData();
        if (!d1) {
            d1 = new CWebProcessData();
        }
        if (!d2) {
            d2 = new CWebProcessData();
        }
        total.mDateTime = [ ...d1.mDateTime, ...d2.mDateTime];
        total.mData = [ ...d1.mData, ...d2.mData];
        return total;
    }

    static mergeWl(d1: RealWLProcessData, d2: RealWLProcessData):RealWLProcessData {
        let total = new RealWLProcessData();
        if (!d1) {
            d1 = new RealWLProcessData();
        }
        if (!d2) {
            d2 = new RealWLProcessData();
        }
        total.mDateTime = [ ...d1.mDateTime, ...d2.mDateTime];
        total.mData = [ ...d1.mData, ...d2.mData];
        total.mVlm = [ ...d1.mVlm, ...d2.mVlm];


        return total;
    }



};









export class CModelComputeDataItem {//得到当前瞬时整个要素的计算成果
    mKeyID: number;//             模型要素对应的ID值
    mData: number[];//             输出的过程数据中的数据序列,当前计算结果

};
export class CWebPredictDikeDataItem {//预报调度数据，仅仅一个对象的预报调度数据，输入
    mKeyID: number;//             对应着预报调度对象ID值
    mType: number;//yulong: 这里最后对应数据来源 JTYPE             对应着数据类型，注意就是模型要素的类型值或都是预报数据类型                 ,
    //如果是调度对象还需要保存着相关的调度类型(流量水位及开启度等)
    //0--降雨          1---潮位或水位 2--流量  3--工程调度开启度4---预案调度规则
    mQZT: number[];// 输入或输出的预报调度过程数据，也可以是从服务器得到预报成果数据

};
export interface CWebDikePlanInfo {
    mUserID: number;
    mComputID: number;
    mPlanText: string;

};



//初始条件设置
export class CWebStartDikeInfo {
    mComputID: number;
    mResultOrUserID: number;//             返回的结果或用户                 ID
    mHydroDtNo: number;//             预报时段数
    mPredictDikeData: CWebPredictDikeDataItem[];//             包括缺省输入的边界过程数据,主要是用于WEB界面的填充,返回的

};
export interface CWebBasinInitiData //专门描述统一方式给定初始条件数据之用的
{
    mbIsHaveInfo: boolean;//             标志是否给定数据
    mInitiDateTime: Date;//             开始计算的时间
    mbIsHaveRiver: boolean;
    mbIsHavePipe: boolean;
    mbIsHaveLinker: boolean;
    mbIsHaveHydro: boolean;//             是否有河道对象、管道对象、联系要素及水文模型数据
    mComputeEnvi: boolean;
    mComputeBedload: boolean;//             计算水质、来水组成、泥沙
    mLevel: number;
    mDikeFkc: number;
    mPipeH: number;
    mBedloadC: number;
    mBedloadH:number;
    //水位、开启度、管道深度、含沙量、床沙厚度
    mBasinState: number;
    mEnviNo: number;//             流域土壤状态、水质类别;
    //             干旱（0）    较干旱（1）一般（2）较湿润（3）湿润（4）
    //             一类(050）、二类（150）、三类（250）、四类（350）、五类（450），真正的水质类别数据是采用mEnviNo/100 的线性插值计算的

};
//下面的部分是统计相关预报模型要素需要的变量
export interface CStatisticsPredictItem {//基本信息
    mKeyID: number;//             对应着被预报要素的实测站ID
    mHydroDttOfsset: number;//             预报时间间隔小时,若为0则为纯神经网络相关算法
    mMaxHour: number;//             最大的影响小时，相应的若为0 的话，是纯神经网络相关算法
    mRecordCount0: number;//             最大的影响时段数
    mName: string;//             名称主要用于列表显示，模型名称
    mOutTextInfo: string[];//             被预报对象(输出项                 )
    mInputTextInfo: string[];//             预报要素输入项的称

};
export interface CStatisticsPredictDataItem {//一个统计相关预报数据的读写与回放
    mKeyID: number;//             对应着被预报要素的实测站ID
    mRecordCount: number;//             总的时段数,最大的影响时段数+ 预报时段数
    mResultID: number;//             返回的结果
    mDataItem: CModelComputeDataItem[];

};
export interface CModelParaDataInfo {
    mbIscanChang: boolean;//是否可以修改
    mParaName: string[];//             参数名
    mDataItem: number[];//             对应着参数数据

};
export interface CModelParameterArray {
    mbIscanChang: boolean;//是否可以修改
    mParaName: string[];//参数名
    mDataItem: number[];//对应着参数数据

};

export interface CParameter {
    name: string;
    value: number;
}



export interface CLocalRegionDataItem {//局部区域变量修改基本资料
    mKeyID: number;//             对应着要素对象ID值
    mStartIndex: number;//             开始的基本信息，对象内部
    mEndIndex: number;//             结束的基本信息，对象内部
    mDataItem :CModelComputeDataItem[];//             对应着基本数据，这个数据有可能是水位、流量、流速，也有可能是污染物浓度

};


export class TDataSeries {
    tmark: Date; //
    id: number;
    val: number[];//支持一个地图点的多值，对于雨量来说，只有一个值

}

export class DataFeature  {
    id: number;//tski 任务序号

    name: string;
    type: number;
    ymaxlimit: number;
    yminlimit: number;

    ymax: number;
    ymin: number;
    ymaxT: Date;
    yminT: Date;
    last?: number;    //最大值存放的任务序车
    lastT?: Date;
    start?:number;   //最小值存放的任务序号
    startT?:Date;
    data?:number[];
    dataT?:Date[];
}

export  type ZipType = 'hour' | 'minite' | 'second';


export interface ProcessDataType {
    zip: ZipType;
    mData: number[];  //可以限制小数位数
    mDateTime: number[];//tick/1000000 的增量时间格式
}


export type TaskStrategy = 'diff';

export type StrategyData = {
    uuid: string,
    diff: any
}  
export type TaskFeature = {
    tasks: string[][], //[taskid,tadkname]
    feature: { [key: number]: DataFeature },
    data?: ProcessDataType[],
};

export interface OutputSch {
    uuid: string,
    predictSchema: CWebPredictOutItem[],
    statisticsSchema: CStatisticsPredictItem[],
    presetSchema: PresetInfo,
    modelSchema:CWebModelSchemaType,
    feature:DataFeature[],
    //全流域数字模型
}

export interface ResultPredictData {
    uuid: string,
    predictData: Array< CWebProcessData[]>
}


export  type ResultModelRaw = {
    uuid: string
    prefix: string,
    dt: Date,
    file:{
       buffer:Buffer
    }
}
