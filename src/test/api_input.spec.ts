
import 'mocha';
import * as should from 'should'
import { BdsApiController } from '../udocconfig/bdsapi-control'
import { IdleTask, HydroType, RedisMsgResult, IdleTaskType, DbTaskType, TaskType } from '../app/_def/redis-def';
import { DataFeature, RtnType, ResultModelRaw } from '../app/_def/bds-meta'
import { DocConfig, StorageConfig } from '../app/_def/udoc-def';
import { defaul_preload, PreLoad } from '../udocconfig/preload';


let region = defaul_preload.region;
const contrl = new BdsApiController()
let preloader = new PreLoad()


describe('BdsApiController', function () {


    it('udocconfig', async function () {
        let udocconfig = await preloader.getUdocConfig();
        should(udocconfig).be.Array();
        let ret: RtnType<IdleTaskType> = await contrl.getLatestTask(region, '里下河突发污染');
        let udoc = ret.data.udoc;
        should(udoc).be.Object();
    });


    it('subjectSeries', async function () {
        let ret: RtnType<IdleTaskType> = await contrl.getLatestTask(region, '里下河突发污染');


        should(ret.result > 0).True();
        let firsttsk = ret.data;
        //ser 专题序列
        let ser = firsttsk.subjectSeries;
        should(ser.mHydroDtNo).be.greaterThan(23);

        let jdata = firsttsk.jdata.data;
        should(jdata.mHydroDtNo).be.equals(ser.mHydroDtNo);

    });




    it('inputparam', async function () {
        let ret: RtnType<IdleTaskType> = await contrl.getLatestTask(region, '里下河突发污染');
        should(ret.result > 0).True();
        let firsttsk = ret.data;

        //jdata  输入条件
        let jdata = firsttsk.jdata.data;
        should(jdata.mHydroDtNo).be.greaterThan(23);
        should(jdata.mPredictDikeData).be.Array(); //输入参数列表

    });




});