
import {  RESULTNAME,  RtnType, OutputSch, CWebDataTypeItemInfo, CWebProcessData, ResultSet, TaskFeature, } from '../app/_def/bds-meta';
import { IdleTask, DbTaskType, IdleTaskType, TaskType } from '../app/_def/redis-def';
import { DataPredictList} from '../app/_def/base-def';

import { ProcessData, ProcessInfoData } from '../app/_core/_data';

import { Controller,  QueryParam, Body, Get, Post, Put, Delete } from "routing-controllers";
import { PreLoad ,bdscall} from './preload';
import { DocConfig, StorageConfig } from '../app/_def/udoc-def';




@Controller("/bdsapi") //
export class BdsApiController {
    /**
     * 请求：从配置文件中得到系经运行的配置信息，、
     * 返回 :配置信息
     * 示例： http://39.108.69.210:8899/bdsapi/udocconfig?region=20
     *
     */
    @Get("/udocconfig")
    async udocconfig(
        @QueryParam("region") region?: number,//流域id  
    ): Promise<RtnType<DocConfig[]>> {
        return bdscall('udocconfig', { region });
    }




    /**
     * 
     * 请求：读取任务列表
     * 返回:  任务列表的集合
     * 示例：http://39.108.69.210:8899/bdsapi/getTaskList?region=20&prefix=里下河实时预报
     */
    @Get("/getTaskList")
    async getTaskList(
        @QueryParam("region") region: number,//流域id
        @QueryParam("prefix") prefix: string,//流域方案。如里下河实时预报、  突发满天飞染...
        @QueryParam("page") page: number = 0,   //大数据量返回时会有出错
    ): Promise<RtnType<DbTaskType[]>> {
        return bdscall('getTaskList', { region, prefix, page });
    }


    /*
    *    请求：最后一个任务
    *   返回:  最后一个任务
    */
    @Get("/getLatestTask")
    async getLatestTask(
        @QueryParam("region") region: number,//流域id
        @QueryParam("prefix") prefix?: string,//流域方案。如里下河实时预报、  突发满天飞染...

    ): Promise<RtnType<IdleTaskType>> {
        return bdscall('getLatestTask', { region, prefix });
    }



    /**
     * 
    *请求：读取任务模板
    *返回:  任务模板结构
     */
    @Get("/getTaskTmpl")
    async getTaskTmpl(
        @QueryParam("region") region: number,//流域id
        @QueryParam("prefix") prefix: string,//流域方案。如里下河实时预报、  突发满天飞染...

    ): Promise<RtnType<DbTaskType[]>> {
        return bdscall('getTaskTmpl', { region, prefix });
    }



    /**
    *请求：一个任务分组中的数据特征值（任务分组可以非常大，特征值用于分析）
    *返回:  一个任务分组中的结果分析对像或预报分析数据特征值
     */
    @Get("/DataFeature")
    async DataFeature(
        @QueryParam("region") region: number, //流域id
        @QueryParam("taskgrp") taskgrp: string, //任务分组名称，
        @QueryParam("keyid") keyid?: number, //结果分析对像或预报分析对象id

    ): Promise<RtnType<TaskFeature>> {
        return bdscall('DataFeature', { region, taskgrp,keyid });
    }


    /**
    *请求：一个全流域全架构信息
    *返回:  一个全流域全架构信息
     */
    @Get("/OutputSch")
    async OutputSch(
        @QueryParam("uuid") uuid: string, //任务id
        @QueryParam("region") region: number,  //流域id
    ): Promise<RtnType<OutputSch>> {
        return bdscall('OutputSch', { uuid, region});
    }


    /*
     *   请求：结果所有分析对象预见期的数据(或 Predict)
     *   返回:  结果所有分析对象的数据（预见期的预报值和对应的预见期前实测值）集合，
    */
    @Get("/Predict")
    async Predict(
        @QueryParam("uuid") uuid: string, //任务id
        @QueryParam("region") region: number,  //流域id
    ) : Promise< RtnType<DataPredictList>>{
        return bdscall('Predict', { uuid, region });
    }



    /*
     *   请求：结果一个分析对象预见期的数据(或 预置值 或 Preset)
     *   返回:  结果一个分析对象的预见期的数据
    */
    @Get("/Preset")
    async Preset(
        @QueryParam("uuid") uuid: string,  //任务id
        @QueryParam("region") region: number,  //流域id
        @QueryParam("keyid") keyid?: number, //结果分析对像id
    ): Promise<RtnType<ProcessInfoData[]>> {
        return bdscall('Preset', { uuid, region,keyid });
    }




    /**
    *请求：一个时段的模型数据的全流域结果
    *返回:  一个时段的全流域断面结果
     */
    @Get("/ModelData")
    async ModelData(
        @QueryParam("uuid") uuid: string,   //任务id
        @QueryParam("region") region: number,  //流域id
        @QueryParam("prefix") prefix: string, //流域.方案。如里下河实时预报、  突发满天飞染...
        @QueryParam("dt") dt: string,           //时段点, Date.toJSON()

    ): Promise<RtnType<ResultSet>> {
        return bdscall('ModelData', { uuid, region,prefix, dt});
    }



    /**
    *请求：全流域模型数数据
    *返回: 全流域模型数据的类型列表
     */
    @Get("/ResultTypeList")
    async ResultTypeList(
        @QueryParam("uuid") uuid: string,  //任务id
        @QueryParam("region") region: number, //流域id
        @QueryParam("prefix") prefix: string,  //流域.方案。如里下河实时预报、  突发满天飞染...
        @QueryParam("itemid") itemid: number, //河道id
        @QueryParam("seci") seci: number,   //断面id
    ): Promise<RtnType<CWebDataTypeItemInfo[]>> {
          return bdscall('ResultTypeList', { uuid, region,prefix, itemid,seci});

    }

    /**
    *请求：一个断面的模型数据所有时段结果
    *返回： 一个断面的预见期内所有时段的数据
     */
    @Get("/ModelElm")
    async ModelElm(
        @QueryParam("uuid") uuid: string,   //任务id
        @QueryParam("region") region: number,  //流域id
        @QueryParam("prefix") prefix: string,   //流域.方案。如里下河实时预报、  突发满天飞染...
        @QueryParam("itemid") itemid: number,  //河道id
        @QueryParam("seci") seci: number,       //断面id
        @QueryParam("elmi") elmi: number,        //元互素id
        @QueryParam("resulset") resulset: RESULTNAME, //结果集名称

    ): Promise<RtnType<CWebProcessData>> {

        return bdscall('ModelElm', { uuid, region, prefix, itemid, seci,elmi,resulset });
    }




}