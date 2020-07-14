


## 数字流域  hushuidataserver  调用演示(bds-hsds-demo)程序


本`bds-hsds-demo`程序演示了 `数字流域模型`调用接口和 `geojson`地图的调用接口


github 地址
     https://github.com/yulongsun/bds-hsds-demo.git 

本`bds-hsds-demo`程序已经将当前数据连接到云服务，开箱即用，无需另外配置，如需手工配置本地服务器，见下节。



### 数字流域测试数据库

#### 测试数据库下载


https://hhunjpub.oss-cn-shenzhen.aliyuncs.com/ysun_backup/Mongo.zip

用户可以自行下载压缩文件，并将其恢复到mongodb数据库， mongodb数据库采用安装时的缺省端口 27017 ，结合 hushuidataserver 构建自已的服务. 详见 hushuidataserver 文档。并记得修改 preload 中的配置项，见下节。

#### 数据库内容 

   测试数据库中目前仅存`里下河河网` 的数据。



### 数字流域调用接口

#### 初始化流域配置

当前流域配置配置到`里下河河网`，配置文件的位置在  src/udocconfig/preload.ts

```javascript

const defaul_preload: PreLoadType = {
    udocapi: 'http://39.108.69.210:8899/bdsapi/',  //模型接口地址，连接到hushuidataserver服务（已建在云上，如果用户需要连接自已的 hushuidataserver服务，修改这里）
    mapapi: 'https://hhunjpub.oss-cn-shenzhen.aliyuncs.com/ysun_web/mapconfig/',  //地图接口地址连接到mapconfig文件服务（已建在云上，如果用户需要连接自已的 mapconfig服务，修改这里）
    region: 20,     //当前使用的流域模型是 '里下河河网'，如果需要测试其它流域模型，修改这里，但数据库中必须存在该模型数据
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

    1. 编译  			npm run build
    2. 测试  			npm run test    
    
    3. 调试
    起动	npm start
    然后打开当前的测试页面 (xxx.spec.ts)，选中调试下拉项(jtest 当前测试spec文档) ， 运行 Start Debugging（F5）.
    
    

#### 编译出错

在使用 npm run build 编译时, 如果在 Terminal 栏中出现以下错误，需要如下进行：

选中打开 node_modules/got/dist/source/core/index.d.ts 文档，将文档中的

_write(chunk: any, encoding: `BufferEncoding` | undefined, callback: (error?: Error | null) => void): void;

中的 `BufferEncoding` 改为 `string`


-----
`node_modules/got/dist/source/core/index.d.ts`:301:5 - error TS2416: Property '_write' in type 'Request' is not assignable to the same property in base type 'Duplex'.
  Type '(chunk: any, encoding: "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex" | undefined, callback: (error?: ErrnoException | null | undefined) => void) => void' is not assignable to type '(chunk: any, encoding: string, callback: (error?: Error | null | undefined) => void) => void'.
    Types of parameters 'encoding' and 'encoding' are incompatible.
      Type 'string' is not assignable to type '"ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex" | undefined'.

301     _write(chunk: any, encoding: BufferEncoding | undefined, callback: (error?: Error | null) => void): void;    


Found 1 error.

------












