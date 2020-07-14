
import 'mocha';
import * as should from 'should'
import { BdsApiController }from '../udocconfig/bdsapi-control'

import { RtnType,CWebProcessData,CWebDataTypeItemInfo, ResultSet, ResultModelRaw } from '../app/_def/bds-meta';
import { defaul_preload } from '../udocconfig/preload';


describe('BdsApiController', function () {

    it('ResultTypeList', async function () {
        const contrl = new BdsApiController()
        const region = defaul_preload.region;

        const prefix = "里下河实时预报";
        const uuid = "task2019_11_31_12_14";


        let itemid = 67109077;
        let seci = 0;
        let model: RtnType<CWebDataTypeItemInfo[]> = await contrl.ResultTypeList(uuid, region, prefix, itemid, seci);
        should(model.result).be.greaterThan(0);
    });




});


