import 'mocha';
import * as should from 'should'
import { BdsApiController } from '../udocconfig/bdsapi-control'
import { defaul_preload } from '../udocconfig/preload';


describe('BdsApiController', function () {
   let region = defaul_preload.region;
    let contrl = new BdsApiController()

    it('Predict ', async function () {
        let task = (await contrl.getLatestTask(region)).data;

        let model = await contrl.Predict(task.uuid, region);
        let data = model.data;

       should(data.data).be.Array();//预见期的预报值和对应的预见期前实测值
       should(data.feature).be.Array();  //为预见期内的 feature

 


    });



});




