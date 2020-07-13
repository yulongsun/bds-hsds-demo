
import 'mocha';
import * as should from 'should'
import { BdsApiController } from '../udocconfig/control'
import { IdleTask, HydroType, RedisMsgResult, IdleTaskType, DbTaskType, TaskType } from '../app/_def/redis-def';
import { DataFeature, RtnType, ResultModelRaw } from '../app/_def/bds-meta'
import { DocConfig, StorageConfig } from '../../src/app/_def/udoc-def';



const region = 20;
const contrl = new BdsApiController()



describe('BdsApiController', async function () {

    //http://localhost:8890/bdsapi/listIdleTask?region=20&prefix=里下河实时预报
    it('getTaskTmpl', async function () {
        let prefix = '里下河流裁域';
        let ret = await contrl.getTaskTmpl(region, prefix);
        let length = ret.result;
        should(length).be.greaterThanOrEqual(0);

    });


});


it('getLatestTask', async function () {
    let ret: RtnType<IdleTaskType> = await contrl.getLatestTask(region, '里下河突发污染');
    if (ret.result > 0) {
        let firsttsk = ret.data;
        let length = ret.result;
        let ser = firsttsk.subjectSeries;

        console.info('最新任务名称', firsttsk.name);
        console.info('任务依据时间', firsttsk.t0);

        let data = firsttsk.jdata.data;

        should(ser.mHydroDtNo).be.greaterThan(23);
        should(data.mHydroDtNo).be.equals(ser.mHydroDtNo);

        should(length).be.greaterThan(0);
       
    }
});



describe('BdsApiController', async function () {

    //http://localhost:8890/bdsapi/listIdleTask?region=20&prefix=里下河实时预报
    it('getTaskList', async function () {

        let configs :DocConfig[]= (await contrl.udocconfig(region)).data;
        let prefix = configs[0].subjectSeries.mPlanName;
        let ret = await contrl.getTaskList(region, prefix);
        let length = ret.result;
        should(length).be.greaterThan(0);

    });


});