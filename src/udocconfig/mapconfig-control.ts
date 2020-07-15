
import { RESULTNAME, RtnType, OutputSch, CWebDataTypeItemInfo, CWebProcessData, ResultSet, TaskFeature, } from '../app/_def/bds-meta';
import { Controller, QueryParam, Body, Get, Post, Put, Delete } from "routing-controllers";
import { PreLoad, bdscall } from './preload';
import { BdsApiController } from './bdsapi-control';
import { DocConfig, StorageConfig } from '../app/_def/udoc-def';
import got from 'got';

import { FeatureCollection, MultiPolygon, LineString, GeoJsonObject } from 'geojson';



@Controller("/mapapi") 
export class MapconfigController {
    contrl: BdsApiController
    constructor() {
        this.contrl = new BdsApiController()
    }



    /**
     * 请求：得到流域的json 地图渲染的geojson文件、
     * 返回 :文件内容
     * 示例： https://hhunjpub.oss-cn-shenzhen.aliyuncs.com/ysun_web/mapconfig/里下河河网/预报降雨分区.json
     */
    @Get("/geojson")
    async mapConfig(
        @QueryParam("region") region?: number,//流域id  
        @QueryParam("name") name?: string,//文件名称
    ) :Promise<FeatureCollection>{
        let preloader = new PreLoad()
        let configs: DocConfig[] = (await this.contrl.udocconfig(region)).data;
        let basin = configs[0].udoc.basin;
        let url = `${preloader.getMapUrl()}${basin}/${name}.json`;
        let response = await got(url, {
            timeout: 2000
        })

        let content=response.body.replace(/\r\n/g,'');
        //编码转换
        let ret = JSON.parse(content);
        return ret;
    }





}
