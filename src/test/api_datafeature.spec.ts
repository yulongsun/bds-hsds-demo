import 'mocha';
import * as should from 'should'
import { BdsApiController }from '../udocconfig/control'

import { IdleTask, HydroType, RedisMsgResult, IdleTaskType, DbTaskType, TaskType } from '../app/_def/redis-def';

import { RtnType,DataFeature,TaskFeature, ResultSet, ResultModelRaw } from '../app/_def/bds-meta';



describe('BdsApiController', function () {
    let region = 20;


    it('DataFeature', async function () {
        let contrl = new BdsApiController()
        let task = await contrl.getLatestTask(region);
        let taskgrp = task.title;
        let model: RtnType<TaskFeature> = await contrl.DataFeature(region, taskgrp);
        let taskfeat: TaskFeature = model.data;

        let aaaa = Object.keys(taskfeat.feature);

       should(aaaa.length).be.greaterThan(0);

        let id= 8986   //name:"红星河水位"
       let  aa = taskfeat.feature[id];

        should(model.result).be.greaterThan(0);
    });



    it('DataFeature', async function () {
        let contrl = new BdsApiController()
        let task = (await contrl.getLatestTask(region)).data;

        let keyid=8986   //name:"红星河水位"


        let taskgrp = task.name;//task.title???
        let model: RtnType<TaskFeature> = await contrl.DataFeature(region, taskgrp, keyid);
        let rt: TaskFeature = model.data;
        if (rt.feature[keyid].start == rt.feature[keyid].last) {
            should(rt.data?.length).equals(1)
            should(rt.tasks.length).equals(1)
            should(rt.tasks[0].length).equals(2)
            should(rt.feature[keyid].start).equals(0)
            should(rt.feature[keyid].last).equals(0)

        }
        else {
            should(rt.data?.length).equals(2)
            should(rt.tasks.length).equals(2)
            should(rt.tasks[0].length).equals(2)
            should(rt.tasks[1].length).equals(2)
            should(rt.feature[keyid].start).equals(0)
            should(rt.feature[keyid].last).equals(1)
        }
    });






});




