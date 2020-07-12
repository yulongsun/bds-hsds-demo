
import { TaskStrategy, RESULTNAME, JTYPE, RtnType, OutputSch, CWebDataTypeItemInfo, CWebProcessData, ResultSet, TaskFeature, 
 } from '../app/_def/bds-meta';
import { IdleTask, DbTaskType, IdleTaskType, TaskType } from '../app/_def/redis-def';
import { ProcessData, ProcessInfoData } from '../app/_core/_data';
import got from 'got';
import { Controller, Param, QueryParam, Body, Get, Post, Put, Delete } from "routing-controllers";
import { PreLoad } from './preload';





@Controller("/bdsapi") //
export class BdsApiController {
    /**
    请求：全流域模型数数据
    返回: 全流域模型数据的类型列表
     */
    @Get("/ResultTypeList")
    async ResultTypeList(
        @QueryParam("uuid") uuid: string,  //任务id
        @QueryParam("region") region: number, //流域id
        @QueryParam("prefix") prefix: string,  //流域.方案。如里下河实时预报、  突发满天飞染...
        @QueryParam("itemid") itemid: number, //河道id
        @QueryParam("seci") seci: number,   //断面id
    ): Promise<RtnType<CWebDataTypeItemInfo[]>> {
        let preloader = new PreLoad()
        let url = `${preloader.getUDocUrl()}ResultTypeList`;
        let response = await got(url, {
            searchParams: { uuid, region, prefix, itemid, seci },
            timeout: 2000
        })
        let ret = JSON.parse(response.body);
        return ret;

    }



    /**
     * 
    请求：读取任务模板
    返回:  任务模板结构
     */
    @Get("/getTaskList")
    async getTaskList(
        @QueryParam("region") region: number,//流域id
        @QueryParam("prefix") prefix: string,//流域方案。如里下河实时预报、  突发满天飞染...

    ): Promise<RtnType<DbTaskType[]>> {
        let preloader = new PreLoad()
        let url = `${preloader.getUDocUrl()}getTaskList`;
        let response = await got(url, {
            searchParams: { region, prefix },
            timeout: 2000
        })
        let ret = JSON.parse(response.body);
        return ret;
    }



    /*
        请求：最后一个任务
        返回:  最后一个任务
    */
    @Get("/getLatestTask")
    async getLatestTask(
        @QueryParam("region") region: number,//流域id
        @QueryParam("prefix") prefix?: string,//流域方案。如里下河实时预报、  突发满天飞染...

    ): Promise<RtnType<IdleTaskType>> {
        let preloader = new PreLoad()
        let url = `${preloader.getUDocUrl()}getLatestTask`;
        let response = await got(url, {
            searchParams: { region, prefix },
            timeout: 2000
        })
        let ret = JSON.parse(response.body);
        return ret;
    }




    /**
     * 
    请求：读取任务模板
    返回:  任务模板结构
     */
    @Get("/getTaskTmpl")
    async getTaskTmpl(
        @QueryParam("region") region: number,//流域id
        @QueryParam("prefix") prefix: string,//流域方案。如里下河实时预报、  突发满天飞染...

    ): Promise<RtnType<DbTaskType[]>> {
        let preloader = new PreLoad()
        let url = `${preloader.getUDocUrl()}getTaskTmpl`;
        let response = await got(url, {
            searchParams: { region, prefix },
            timeout: 2000
        })
        let ret = JSON.parse(response.body);
        return ret;
    }





    /**
    请求：一个任务分组中的数据特征值（任务分组可以非常大，特征值用于分析）
    返回:  一个任务分组中的结果分析对像或预报分析数据特征值
     */
    @Get("/DataFeature")
    async DataFeature(
        @QueryParam("region") region: number, //流域id
        @QueryParam("taskgrp") taskgrp: string, //任务分组名称，
        @QueryParam("keyid") keyid?: number, //结果分析对像或预报分析对象id

    ): Promise<RtnType<TaskFeature>> {

        let preloader = new PreLoad()
        let url = `${preloader.getUDocUrl()}DataFeature`;
        let response = await got(url, {
            searchParams: { region, taskgrp,keyid },
            timeout: 2000
        })
        let ret = JSON.parse(response.body);
        return ret;
    }


    /**
    请求：一个全流域全架构信息
    返回:  一个全流域全架构信息
     */
    @Get("/OutputSch")
    async OutputSch(
        @QueryParam("uuid") uuid: string, //任务id
        @QueryParam("region") region: number,  //流域id
    ): Promise<RtnType<OutputSch>> {

        let preloader = new PreLoad()
        let url = `${preloader.getUDocUrl()}OutputSch`;
        let response = await got(url, {
            searchParams: { uuid, region, },
            timeout: 2000
        })
        let ret = JSON.parse(response.body);
        return ret;
    }


    /*
        请求：结果一个分析对象预见期的数据(或 预置值 或 Preset)
        返回:  结果一个分析对象的预见期的数据
    */
    @Get("/Preset")
    async Preset(
        @QueryParam("uuid") uuid: string,  //流域id
        @QueryParam("region") region: number,  //流域id
        @QueryParam("keyid") keyid?: number, //结果分析对像id
    ): Promise<RtnType<ProcessInfoData[]>> {

        let preloader = new PreLoad()
        let url = `${preloader.getUDocUrl()}OutputSch`;
        let response = await got(url, {
            searchParams: { uuid, region, },
            timeout: 2000
        })
        let ret = JSON.parse(response.body);
        return ret;
    }




    /**
    请求：一个时段的模型数据的全流域结果
    返回:  一个时段的全流域断面结果
     */
    @Get("/ModelData")
    async ModelData(
        @QueryParam("uuid") uuid: string,   //任务id
        @QueryParam("region") region: number,  //流域id
        @QueryParam("prefix") prefix: string, //流域.方案。如里下河实时预报、  突发满天飞染...
        @QueryParam("dt") dt: Date,           //时段点

    ): Promise<RtnType<ResultSet>> {
        let preloader = new PreLoad()
        let url = `${preloader.getUDocUrl()}ModelData`;
        let response = await got(url, {
            searchParams: { uuid, region, prefix, dt:dt.toJSON() },
            timeout: 2000
        })
        let ret = JSON.parse(response.body);
        return ret;
    }




    /**
    请求：一个断面的模型数据所有时段结果
    返回： 一个断面的预见期内所有时段的数据
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

        let preloader = new PreLoad()
        let url = `${preloader.getUDocUrl()}ModelElm`;
        let response = await got(url, {
            searchParams: { uuid, region, prefix, itemid, seci, elmi, resulset },
            timeout: 2000
        })
        let ret = JSON.parse(response.body);
        return ret;
    }




}