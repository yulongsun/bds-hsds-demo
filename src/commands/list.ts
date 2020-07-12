


import { PreLoad } from '../udocconfig/preload';
import { DocConfig, StorageConfig } from '../../src/app/_def/udoc-def';




/**
 * 列出ysun_web, ysun_bin,ysun_model....
 * udocapi :  新设置  udocapi
 */
export =  async function (udocapi?: string, bjson: boolean=false) {
    let preloader = new PreLoad()
    let urlRoot = preloader.getUDocUrl();
    console.debug('udocapi= ', urlRoot);

    let udocconfig = await preloader.getUdocConfig();
    if (!udocconfig) {
        console.debug('no udocconfig');
        return
    }

    if (udocapi) {
        // todo: verify...
        //重设redisapi
        preloader.setUDocRoot(udocapi);

        console.debug('redisRoot change to  ', udocapi);

        listInstance(udocconfig, bjson);
    }
    else {

        listInstance(udocconfig, bjson);
    }
}





function listInstance(udocconfig: DocConfig[], bjson: boolean) {

    console.debug('');
    console.debug('');
    //console.debug('udocapi:  ', Preload.getUDocUrl());

    // --table 和 --json 二种格式
    if (bjson) {
        let Configs = udocconfig.map(config => {
            return {
                task: config.task,
                udoc: config.udoc,
                subjectSeries: config.subjectSeries
            }
        });
        console.debug(JSON.stringify(Configs, null, '  '));
        return Configs;
    }
    else {
        //不是本项目的设置，而是正在运行的 dataserv 中获
        let tablehead = '流域名称 别名 分区号 专题名 绑定-port redis-port'
        let dash = '----------------------------------------------';
        let Configs = udocconfig.map(config => {
            let udoc = config.udoc;
            let subjectSeries = config.subjectSeries;
            let storage = config.task;
            return [udoc.basin, udoc.alias, udoc.region, subjectSeries?subjectSeries.mPlanName : 'no_series', udoc.binding ?? 'no_binding', storage.redis.port].join('  ')  //storage.mongo.a

        })

        Configs = [tablehead, dash, ...Configs];
        let aa = Configs.join('\r\n');
        console.debug(aa);

        return
    }
}
