import 'mocha';
import * as should from 'should'
import { BdsApiController }from '../udocconfig/control'

import { RtnType, CWebProcessData, CWebDataTypeItemInfo, ResultSet, ResultModelRaw } from '../app/_def/bds-meta'



describe('BdsApiController', function () {

    const prefix = "里下河实时预报";
    const uuid = "task2019_11_31_12_14";
    const region = 20;
    const contrl = new BdsApiController()


    //sch
    it('ResultTypeList', async function () {
        let itemid = 67109077;
        let seci = 0;
        let model: RtnType<CWebDataTypeItemInfo[]> = await contrl.ResultTypeList(uuid, region, prefix, itemid, seci);
        should(model.result).be.greaterThan(0);
    });


    //data
    it('ModelData', async function () {

        let dt = new Date("2018-06-28T11:00:00.000Z");
        let ret: RtnType<ResultSet> = await contrl.ModelData(uuid, region, prefix, dt);
        should(ret.result).be.greaterThan(0);
    });


///100663412  rrList
    //全流域时间点数据
    it('ModelElm', async function () {
        let elmi = 0;
        let itemid = 67109137;
        let seci = 0;
        let model: RtnType<CWebProcessData> = await contrl.ModelElm(uuid, region, prefix, itemid, seci, elmi,'Cell');
        should(model.result).be.greaterThan(0);

    });


})