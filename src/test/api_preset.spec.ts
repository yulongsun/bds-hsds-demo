import 'mocha';
import * as should from 'should'
import { BdsApiController } from '../udocconfig/bdsapi-control'
import { defaul_preload } from '../udocconfig/preload';


describe('BdsApiController', function () {
   let region = defaul_preload.region;
    let contrl = new BdsApiController()



    it('Preset', async function () {
        let task = (await contrl.getLatestTask(region)).data;
        let model = await contrl.Preset(task.uuid, region);
        let modeldata = model.data;
        should(modeldata).be.Array();
        let zip=modeldata[0].data.zip  //一种按 分钟计时的压缩格式
        should(zip).be.eql('minite');

        let data = modeldata[0].data.mData;
        should(data).be.Array();
        //info
        let info = modeldata[0].info;
        should(info).be.Object();
        should(info.mKeyID).Number();

        let feature = modeldata[0].feature;
        should(feature).be.Object();

        let keyids = modeldata.map(x => {
            return x.info.mKeyID;
        })
        should(keyids).be.Array();

        should(model.result).be.greaterThan(0);
    });




    it('Preset with keyid', async function () {
        let task = (await contrl.getLatestTask(region)).data;
        let keyid = 1551;
        let model = await contrl.Preset(task.uuid, region, keyid);
        let data = model.data;
        should(data.length).be.equal(1);


    });



});




