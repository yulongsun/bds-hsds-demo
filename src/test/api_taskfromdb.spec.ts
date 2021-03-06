
import 'mocha';
import * as should from 'should'
import { BdsApiController } from '../udocconfig/bdsapi-control'
import { IdleTask, HydroType, RedisMsgResult, IdleTaskType, DbTaskType, TaskType } from '../app/_def/redis-def';
import { DataFeature, RtnType, ResultModelRaw } from '../app/_def/bds-meta'
import { DocConfig, StorageConfig } from '../app/_def/udoc-def';
import { defaul_preload } from '../udocconfig/preload';


let region = defaul_preload.region;
const contrl = new BdsApiController()



describe('BdsApiController',  function () {

    //http://localhost:8890/bdsapi/listIdleTask?region=20&prefix=里下河实时预报
    it('getTaskTmpl', async function () {
        const configs: DocConfig[] = (await contrl.udocconfig(region)).data;
        const prefix = configs[0].subjectSeries.mPlanName;

        let ret = await contrl.getTaskTmpl(region, prefix);
        should(ret.data).be.Array();

    });



    it('getLatestTask', async function () {
        let ret: RtnType<IdleTaskType> = await contrl.getLatestTask(region, '里下河突发污染');
        if (ret.result > 0) {
            let firsttsk = ret.data;
            console.info('最新任务名称', firsttsk.name);
            console.info('任务依据时间', firsttsk.t0);

        }
    });




    //http://localhost:8890/bdsapi/listIdleTask?region=20&prefix=里下河实时预报
    it('getTaskList', async function () {

        const configs: DocConfig[] = (await contrl.udocconfig(region)).data;
        const prefix = configs[0].subjectSeries.mPlanName;

        let ret = await contrl.getTaskList(region, prefix);
        let length = ret.result;
        should(length).be.greaterThan(0);

    });


});