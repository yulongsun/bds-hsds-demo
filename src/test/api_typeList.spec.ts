
import 'mocha';
import * as should from 'should'
import { BdsApiController }from '../udocconfig/control'

import { RtnType,CWebProcessData,CWebDataTypeItemInfo, ResultSet, ResultModelRaw } from '../app/_def/bds-meta';



describe('BdsApiController', function () {

    it('ResultTypeList', async function () {
        let contrl = new BdsApiController()
        let region = 20;
        let prefix = "里下河实时预报";
        let uuid = "task2019_11_31_12_14";
        let itemid = 67109077;
        let seci = 0;
        let model: RtnType<CWebDataTypeItemInfo[]> = await contrl.ResultTypeList(uuid, region, prefix, itemid, seci);
        should(model.result).be.greaterThan(0);
    });




});


