
import 'mocha';
import * as should from 'should'
import { BdsApiController }from '../udocconfig/bdsapi-control'

import { RtnType,CWebProcessData,CWebDataTypeItemInfo, ResultSet, ResultModelRaw } from '../app/_def/bds-meta';
import { defaul_preload } from '../udocconfig/preload';


describe('BdsApiController', function () {
    const contrl = new BdsApiController()
    const region = defaul_preload.region;

    it('OutputSch', async function () {
        let task = (await contrl.getLatestTask(region)).data;
        let model = await contrl.OutputSch(task.uuid, region);
        let data = model.data;

        should(data.feature).be.Array();// feature 是指所有历史上所有任务的总属性，用于渲染分级
        should(data.predictSchema).be.Array();
        should(data.presetSchema).be.Object(); //todo: 只是一个 object：{'1':array,'2':array}, array中为分组内容
        should(data.statisticsSchema).be.Array();
        should(data.modelSchema.mTimeList.mDateTime).be.Array();
        
        //。。。

    });


});


