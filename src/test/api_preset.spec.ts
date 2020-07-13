import 'mocha';
import * as should from 'should'
import { BdsApiController }from '../udocconfig/control'



describe('BdsApiController',  function () {
    let region = 20;



    it('OutputSch', async function () {
        let contrl = new BdsApiController()
        let task = (await contrl.getLatestTask(region)).data;
        let model = await contrl.OutputSch(task.uuid, region);
      
        let ssss = model;

    });




    it('Preset', async function () {
        let contrl = new BdsApiController()
        let task = (await contrl.getLatestTask(region)).data;


        let model = await contrl.Preset(task.uuid, region);
        let aa = model.data;
        should(aa.length).be.greaterThan(1);


      //  let id = 8986   //name:"红星河水位"
     

        let data = model.data[0].data.mData;
        let info = model.data[0].info;
        let keyids = model.data.map(x => {
            return x.info.mKeyID;
        })

       // should(keyids.indexOf(id) >= 0).be.True();
        should(data.length).be.greaterThan(1);
        should(model.result).be.greaterThan(0);
    });






});




