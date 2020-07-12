//与 mapshaper-bds-svglayer.js  保持一致
export type SymbolType = "symbol" |"symbollabel"| "label"|"square"|"circle"| "rect" | "triangle" | "diamond" | "star"| "arrow";
export type SVGSymbol = SymbolType | SymbolType[];
export type SymbolLoc = "center";

import {  SubjectSeries ,RESULTNAME} from './bds-meta';


//
//yulong: 与 bds-hub.ts  中定义的 access 类型一致
export type SVGAccess = 'envi' |'hydro'|'rain'|'flow'|'relateelm'|'schedule'|'wl';

/*
export declare type Ctgitems = {
    encoding?: string,
    title: string,
    subtitle: string,
    access: string,    //todo:代表使用的接口插件
    url: string,
    files: string[],
    layers: LayerOption[],

};


export declare type Catalog = {
    title: string,
    cols: number,  //分列
    open?: boolean,
    items: Ctgitems[]
}

//地图配置定义
export declare type MANIFEST = {
    files: string[],
    catalog: Catalog,
    display_all: boolean

}


export declare type LayerOption = {
    idField: string,
    nameField: string,
    subField?: string,
    resultSet?: RESULTNAME,

    //通过在附加层不的同层控制 level0 可以实现分区域的显示 自动随缩放显示的技巧
    //通常 level0< level1, scale从小到大 选显示符号，再显示文本
    //符号控制   scale<level0 符号、文本都不显示
    level0?: number,
    //文字控制 文本都不显示
    level1?: number,
    canvas?: {
        fillshape?: boolean,

    },

    style?: {  //svg style
        type?: string,
        icons?: number[],
        locate?: string,  //start,end inbound,...
    },
    includes?: number[] | string[],
    excludes?: number[] | string[],
    reverse?: boolean,

}

*/




export type CanvasStyle = {
    fillshape?: boolean
}


export type SVGStyle = {
    type: SVGSymbol,
    locate?: SymbolLoc,
    icons?: number[],
};



///一个独立的图层控制项可能含有多个相关图层
export type LayerOption = {
    idField: string,
    nameField: string,
    subField?: string,
    resultSet?: RESULTNAME,  //也可以没有
    level0?: number,
    level1?: number,
    canvas?: CanvasStyle,
    style?: SVGStyle,  // style 应改为 svg
    includes: string[] | number[],
    excludes: string[]| number[],
    reverse: boolean


};



//一个独立的图层控制项，驱动由 access决定
export type MapItem = {

    title: string,
    subtitle: string,
    access: SVGAccess,
    url: string,
    encoding?: string  //"utf8"
    files: string[],
    layers: LayerOption[],
    id: number      //以后要把 id 补上
};


//一个项目含有多个图层控制
export type MapCatalog = {
    title: string,
    cols: number,
    open: boolean,
    items: MapItem[]

};


//地图的配置
export interface Mapconfig {
    files: string[],
    catalog: MapCatalog,
    display_all: boolean,

};


