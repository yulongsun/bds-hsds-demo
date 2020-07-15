import 'mocha';
import * as should from 'should'
import { MapconfigController } from '../udocconfig/mapconfig-control';
import { defaul_preload } from '../udocconfig/preload';




describe('MapconfigController', function () {
   let region = defaul_preload.region;


    it('预报降雨分区.json', async function () {
        let contrl = new MapconfigController()
        let model = await contrl.mapConfig(region, '预报降雨分区');
        should(model.features).be.Array();

    });

    it('潮位水位边界.json', async function () {
        let contrl = new MapconfigController()
        let model = await contrl.mapConfig(region, '潮位水位边界');
       should(model.features).be.Array();

    });

    it('流量边界.json', async function () {
        let contrl = new MapconfigController()
        let model = await contrl.mapConfig(region, '流量边界');
       should(model.features).be.Array();

    });

    it('可调度工程.json', async function () {
        let contrl = new MapconfigController()
        let model = await contrl.mapConfig(region, '可调度工程');
       should(model.features).be.Array();

    });





})