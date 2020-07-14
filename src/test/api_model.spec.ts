import 'mocha';
import * as should from 'should'
import { BdsApiController } from '../udocconfig/bdsapi-control'

import { RtnType, CWebProcessData, CWebDataTypeItemInfo, ResultSet, ResultModelRaw } from '../app/_def/bds-meta'
import { defaul_preload } from '../udocconfig/preload';
import { DocConfig, StorageConfig } from '../../src/app/_def/udoc-def';



describe('BdsApiController', function () {

    const region = defaul_preload.region;
    const contrl = new BdsApiController()


    // const uuid = "task2019_11_31_12_14"; //任务id
    // const prefix = "里下河实时预报";


    //sch
    it('ResultTypeList', async function () {
        const configs: DocConfig[] = (await contrl.udocconfig(region)).data;
        const prefix = configs[0].subjectSeries.mPlanName;
        const task = (await contrl.getLatestTask(region)).data;
        const uuid = task.uuid;

        let itemid = 67109077;
        let seci = 0;

        let model: RtnType<CWebDataTypeItemInfo[]> = await contrl.ResultTypeList(uuid, region, prefix, itemid, seci);
        should(model.result).be.greaterThan(0);
    });

    //data
    it('ModelData', async function () {

        const configs: DocConfig[] = (await contrl.udocconfig(region)).data;
        const prefix = configs[0].subjectSeries.mPlanName;

        const task = (await contrl.getLatestTask(region)).data;
        const uuid = task.uuid;

        let dt = new Date("2018-06-28T11:00:00.000Z");

        let ret: RtnType<ResultSet> = await contrl.ModelData(uuid, region, prefix, dt.toJSON());

        //todo:因为数据量太在，目前没有数据，
        //  should(ret.result).be.greaterThan(0);
    });


    ///100663412  rrList
    //全流域时间点数据
    it('ModelElm', async function () {

        let configs: DocConfig[] = (await contrl.udocconfig(region)).data;
        let prefix = configs[0].subjectSeries.mPlanName;
        let task = (await contrl.getLatestTask(region)).data;
        let uuid = task.uuid;


        let elmi = 0;
        let itemid = 67109137;  //河道
        let seci = 0;
        let model: RtnType<CWebProcessData> = await contrl.ModelElm(uuid, region, prefix, itemid, seci, elmi, 'Cell');
        should(model.result).be.greaterThan(0);

    });


})