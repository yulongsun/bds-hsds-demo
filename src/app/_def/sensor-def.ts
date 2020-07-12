

import { EnvMetaType, CtgrStyle, SenosorType } from './base-def'

///////////////////////////////
//todo:以下需要通过配置文件进行更改
export  const     global_enableTintLevel=false;
export const     global_basecolor: string='#abe1fb'; //改成色值，实际应用时生成颜色列表，并传到mapshaper
 //note 这里定义了一个唯一的颜色分配表,不要使用代名称 如 'gray' 'yellow' 等，不好分级
export const     global_catcolors: string[] = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00',/* '#00ff80', */'#00ffff', '#0080ff', '#0000ff'];
/////////////////////////////////



const basecolor_list= [...Array(10)].map(x =>global_basecolor);
//传感器 default
export class Senosor {


    //todo: 需要将静态列表改为初始化函数实现
    static sensor_list: { [key: string]: Senosor } = {
        //note: 以下所有的传感器采用了 global_catcolors， 可以分不同的类型取不同的 colors
        '流量': new Senosor(-2, '流量', 'm3/s', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '计算流量': new Senosor(-2, '流量', 'm3/s', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '实测流量': new Senosor(-2, '流量', 'm3/s', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),

        //TGTQ
        '总过闸流量': new Senosor(-2, '总过闸流量', 'm3/s', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '水位': new Senosor(-1, '水位', 'm', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '计算水位': new Senosor(-1, '水位', 'm', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '实测水位': new Senosor(-1, '水位', 'm', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        //UPZ
        '闸上水位': new Senosor(-1, '闸上水位', 'm', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        //   DPZ
        '闸下水位': new Senosor(-1, '闸下水位', 'm', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '警戒水位': new Senosor(-1, '警戒水位', 'm', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '保证水位': new Senosor(-1, '保证水位', 'm', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '坝顶高程': new Senosor(-1, '坝顶高程', 'm', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),



        '降雨': new Senosor(0, '降雨', 'mm', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '流域降雨': new Senosor(0, '降雨', 'mm', { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),

        '风速': new Senosor(6, "风速", "m/s", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '平均风速': new Senosor(6, "平均风速", "m/s", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '最大风速': new Senosor(6, "最大风速", "m/s", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),


        '风向': new Senosor(10, "风向", "Deg", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '风向1': new Senosor(10, "风向1", "Deg", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '风向2': new Senosor(11, "风向2", "Deg C", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '平均风向': new Senosor(11, "平均风向", "Deg C", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '最大风向': new Senosor(11, "风向2", "Deg C", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '风向角': new Senosor(11, "风向角", "Deg C", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),

        '风力': new Senosor(12, "风力", "m/s", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),



        '温度': new Senosor(7, "温度", "C", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '蒸发量': new Senosor(8, "蒸发量", "mm", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '含水量': new Senosor(9, "含水量", "%", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '湿度': new Senosor(13, "湿度", "%", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),


        '吸力': new Senosor(14, "吸力", "KPa", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        '电导': new Senosor(15, "电导", "us/cm", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),


        "流入流量": new Senosor(21, "流入流量", "m/s", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        "流出流量": new Senosor(22, "流出流量", "m/s", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        "水面宽度": new Senosor(23, "水面宽度", "m/s", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),
        "过流面积": new Senosor(24, "过流面积", "m/s", { vals: [10, 30, 50, 80, 100], colors: global_catcolors }),


        /*
         _Ta(-22, "浓度", "m"),
         _Ta(99, "有降解污染物浓度", "kg/m^3"),
         _Ta(100, "温度", "度"),
         _Ta(101, "含沙量", "kg/m^3"),
         _Ta(102, "BOD5浓度", "mg/L"),
         _Ta(103, "DO浓度", "mg/L"),

         _Ta(104, "COD浓度", "kg/m^3"),
         _Ta(105, "总磷浓度", "mg/L"),
         _Ta(106, "总氮浓度", "mg/L"),

         _Ta(107, "叶绿素ａ浓度", "μg/l"),
         _Ta(108, "水面光照强度", "MJ/(m^2.D)"),
         _Ta(109, "总氮浓度", "mg/L"),

         _Ta(110, "总磷酸盐浓度", "mg/L"),
         _Ta(111, "难分解颗粒态有机磷浓度", "mg/L"),
         _Ta(112, "易分解颗粒态有机磷浓度", "mg/L"),

         _Ta(113, "溶解态有机磷浓度", "mg/L"),
         _Ta(114, "溶解态磷酸盐浓度", "mg/L"),
         _Ta(115, "颗粒态(吸附态)磷酸盐浓度", "mg/L"),


         _Ta(116, "蓝藻生物量浓度", "mg/L"),
         _Ta(117, "硅藻生物量浓度", "mg/L"),
         _Ta(118, "绿藻生物量浓度", "mg/L"),

         _Ta(119, "", "mg/L"),
         _Ta(120, "铁浓度", "mg/L"),
         _Ta(121, "Mn浓度", "mg/L"),


         _Ta(122, "SS浓度", "mg/L"),
         _Ta(123, "碱度", "mg/L"),
         _Ta(124, "PH", ""),


         _Ta(122, "SS浓度", "mg/L"),
         _Ta(123, "碱度", "mg/L"),
         _Ta(124, "PH", ""),

         _Ta(125, "浊度", "mg/L"),
         _Ta(126, "有机氮浓度", "mg/L"),
         _Ta(127, "硝态氮浓度", "mg/L"),

         _Ta(128, "NH3-N浓度", "mg/L"),
         _Ta(129, "难分解颗粒态有机氮浓度", "mg/L"),
         _Ta(130, "易分解颗粒态有机氮浓度", "mg/L"),

         _Ta(131, "溶解态有机氮浓度", "mg/L"),
         _Ta(132, "保守型污染物浓度", "mg/L"),
         _Ta(133, "挥发性污染物浓度", "mg/L"),

         _Ta(134, "难分解颗粒态有机碳浓度", "mg/L"),
         _Ta(135, "易分解颗粒态有机碳浓度", "mg/L"),
         _Ta(136, "溶解态有机碳浓度", "mg/L"),
         _Ta(159, "有降解污水排放量", "kg/s")
 */
    };




    senor: SenosorType;
    type: number;
    name: string;
    unit: string;
    cat: CtgrStyle;  //分级标准
    chart: any


    constructor(type: number, name: string, unit: string, cat: CtgrStyle, chart?: any) {
        if (!global_enableTintLevel) {
            //生成单色颜色列表
            cat.colors =  basecolor_list;

        }


        this.type = type;
        this.name = name;
        this.unit = unit;
        this.cat = cat;
        this.chart = chart;


        this.senor = {
            type,
            name,
            unit,
            cat,
            chart,
        }
    }

    //检测 Senosor 是否包含相关元素
    static include(...names: string[]): Senosor[] {
        return names.map(x => {
            return this.sensor_list[x];
        })
    }




    //由元素名称得到 option
    static option(...names: string[]): EnvMetaType {


        const name = names.map(x => {
            if (!Senosor.sensor_list[x]) {
                console.error('no sensor type ' + x);
            }
            return Senosor.sensor_list[x].name;
        });

        const type = names.map(x => {
            return Senosor.sensor_list[x].type;
        });

        const unit = names.map(x => {
            return Senosor.sensor_list[x].unit;
        });
        const cat = names.map((x, i) => {
            return Senosor.sensor_list[x].cat;
        });
        const sensor = names.map((x, i) => {
            return Senosor.sensor_list[x].senor;
        });



        /*
        const color = names.map(x => {
            return Senosor.sensor_list[x].colors;
        });
        */
        const chart = names.map(x => {
            return Senosor.sensor_list[x].chart;
        });



        const option: EnvMetaType = {
            //右键菜单中的相关项，和地图分组显示项，从 getEnvSChema 获取
            envir_type: type,
            envir_name: name,
            envir_cat: cat,//与  envir_elms 对应的分级 第0级是最后一级， 6个级别
            envir_unit: unit,
            envir_chart: chart,
            envir_sensor: sensor,

        };
        return option;
    }
}




