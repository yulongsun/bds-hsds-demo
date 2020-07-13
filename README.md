


## 数字流域  hushuidataserver  调用演示(bds-hsds-demo)程序


本`bds-hsds-demo`程序演示了 `数字流域模型`调用接口和 `geojson`地图的调用接口


github 地址
     https://github.com/yulongsun/bds-hsds-demo.git 

本`bds-hsds-demo`程序已经将当前数据连接到云服务，开箱即用，无需另外配置，如需手工配置服务器，见下节。



### 数字流域测试数据库

#### 测试数据库下载


https://hhunjpub.oss-cn-shenzhen.aliyuncs.com/ysun_backup/Mongo.zip

用户可以自行下载，恢复到mongodb数据库， mongodb数据库采用安装时的缺省端口 27017 ，结合 hushuidataserver 构建自已的服务.

#### 数据库内容 

   测试数据库中目前仅存`里下河流域` 的数据。



### 数字流域调用接口

#### 初始化流域配置

当前流域配置配置到`里下河流域`，配置文件的位置在  src/udocconfig/preload.ts

```javascript
const defaul_preload: PreLoadType = {
    udocapi: 'http://39.108.69.210:8899/bdsapi/',  //模型接口地址
    mapapi: 'https://hhunjpub.oss-cn-shenzhen.aliyuncs.com/ysun_web/mapconfig/',  //地图接口地址
    region: 20,
}

```


#### 数字流域模型调用接口

数字流域模型调用接口文档说明的位置在  src/udocconfig/bdsapi-control.ts

#### 数字流域地图调用接口

数字流域地图调用接口文档说明的位置在  src/udocconfig/mapconfig-control.ts


#### 数字流域模型实时数据调用接口




 
### 安装与使用

#### 安装

下载本项目后，采用npm 安装  

    npm i

#### 使用

    编译  			npm run build
    起动且watch  	npm start
    测试  			npm run test


测试程序调试

使用 vdcode 调试（debug）：  

	jtest 当前测试spec文档














