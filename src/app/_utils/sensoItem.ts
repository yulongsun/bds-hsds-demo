

import { T4Fold,CWebDateTimeArray,CWebProcessData,DataFeature } from '../_def/bds-meta';
import { Helpers } from '../_utils/helpers';

export class SensoItem {


    _id:string;
    uuid: string;
    tt: Date;     //时间
    order: number;


    //accum 取最后一个值
    static toCWebProcessData<T>(klassA:any, metea: SensoItem[]): CWebProcessData[] {
        let dataList: CWebProcessData[] = [];
        for (let k: number = 0; k < klassA.attr.length; k++) {
            let data: CWebProcessData = new CWebProcessData();
            //时间数据
            data.mDateTime = [];
            data.mData = [];
            data.mData.length = metea.length;


            for (let i = 0; i < metea.length; i++) {
                data.mDateTime[i] = metea[i].tt;
                 let kk= klassA.attr[k]  as keyof  SensoItem
                data.mData[i] = metea[i] [kk ] as number;
            }
            dataList[k] = data;
        }
        return dataList;
    }



    //数据规范化，用不同的Nomal反复调用，归一化为含有Z/P/Q/RW
    static normalizeData<T extends SensoItem>(klassA:any, itemlist: T[], st: string, data: T[]) {
        data && data.forEach(xx => {

            let x=xx  as any;
            if (x['TM']) {
                let tt = Helpers.parseDate(x['TM']); //tm TM
                //从已有的数据中找到相贩的时间项
                let item = itemlist.find(y => {
                    return tt == y.tt;
                }) || new klassA();


                //在这里设主键
                item._id = {
                    tt,
                    st,
                };
                item.uuid = st;
                item.tt = tt;

                klassA.attr.forEach((at: string) => {
                    let val = x[at];
                    if (val) {
                        //格式化
                        item[at] = Number(val);
                        itemlist.push(item);
                    }
                });

            }


        });
    }

}
