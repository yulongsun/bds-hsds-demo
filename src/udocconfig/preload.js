"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreLoad = void 0;
var dilight_js_1 = require("dilight.js");
var fs = require("fs");
"";
var path = require("path");
var got_1 = require("got");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var bdshelper_1 = require("../app/_utils/bdshelper");
//import { StorageTool } from '../app/service/storagetool';
//从环境中获取
var defaul_preload = {
    //  udocapi: 'http://www.hhunj.com:8890/bdsapi/', //8890 路由转 10.0.0.10:8899, 不同的任具有不同的
    udocapi: 'http://39.108.69.210:8899/bdsapi/',
    region: 190,
};
var PreLoad = /** @class */ (function () {
    function PreLoad() {
        this._preload = defaul_preload;
        /*
            //数据库 RetainTmpl  保存的数据库，用于定时调用
            //RetainTmplTasks 可以存有多个，用于不同的专题，
            async generateRetainTmplTasks(uDoc: UserDocType, plannname: string, t0: Date,fnCall?:(x:IdleTaskType)=>void): Promise<DbTaskType[]> {
                let dbtasks: DbTaskType[] = await this.retainTasks();
              
                console.info(`生成:   TaskPovider 定时任务:   generateRetainTasks   ${uDoc.basin}   ${dbtasks.length} 个`);
                 //delay for unique uuid
                 this._delaySerirs(dbtasks).subscribe(async (dbtask: DbTaskType) => {
                    let task = dbtask.task;
                    console.warn(`----定时任务在这里要重设时间去替换任务时间 ${task.t0}`);
                    //todo: 该名称应该是模板名称和依据时间的合成，测试时只用一个依据时间，所以暂时用当前uuid 时间代替
                    let now = new Date();
                    task.t0 = t0;
        
                    //这里的名字要采用模板定义中的名子 dbtask.name
                    task.uuid = StorageTool.generateUuid(now);
                    task.name = '定时_' + dbtask.name                      // task.uuid.substr(4);//将 uuid 的前缀换成 定时任务 用以区别
        
                    if (fnCall) {
                        fnCall(task);
                    }
                    else {
                        await this.submitIdleTask(task);
                    }
        
        
                });
        
                return dbtasks;
            }
        */
    }
    Object.defineProperty(PreLoad.prototype, "preload", {
        get: function () {
            return this._preload;
        },
        set: function (pre) {
            this._preload = pre;
        },
        enumerable: false,
        configurable: true
    });
    PreLoad.prototype.getUDocUrl = function () {
        return this.preload.udocapi;
    };
    //verifiy 路径的格式
    PreLoad.prototype.verifyUdocApi = function (root) {
        var url = '^(((ht|f)tp(s?))\://)?(www.|[a-zA-Z].)[a-zA-Z0-9\-\.]+\.(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk)(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))*$';
        return new RegExp(url).test(root);
    };
    PreLoad.prototype.setRegion = function (region) {
        this.preload.region = region;
        return this.preload;
    };
    PreLoad.prototype.setUDocRoot = function (root) {
        if (this.verifyUdocApi(root)) {
            this.preload.udocapi = root;
            this._saveConfig();
        }
        else {
            console.debug('udocapi 格式出错');
        }
    };
    PreLoad.prototype.getAlias = function (basin) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (basin === 'www') {
                            return [2 /*return*/, basin];
                        }
                        return [4 /*yield*/, this.getUdocConfig()];
                    case 1:
                        _a.sent();
                        config = this.configlist.find(function (x) {
                            return x.udoc.basin === basin;
                        });
                        if (config) {
                            return [2 /*return*/, config.udoc.alias];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //存入到文件中
    PreLoad.prototype._saveConfig = function () {
        var preload = this.preload;
        var pathname = path.join(__dirname, '../cloudrest.json');
        console.debug('_saveConfig 路径： ', pathname);
        if (fs.existsSync(pathname)) {
            if (preload) {
                var str = JSON.stringify(preload);
                fs.writeFileSync(pathname, str);
            }
        }
    };
    PreLoad.prototype.getUdocConfig = function (pre) {
        return __awaiter(this, void 0, void 0, function () {
            var preload, url, response, ret, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        preload = pre ? pre : {};
                        this.preload = __assign(__assign({}, this.preload), preload);
                        url = this.getUDocUrl() + "udocconfig";
                        return [4 /*yield*/, got_1.default(url, { timeout: 2000 })];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        if (ret.result) {
                            this.configlist = ret.data;
                            return [2 /*return*/, this.configlist];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1.message, ',  请用 bds pm2 重启一遍 huishuidataserver :8899');
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //save  new regon
    PreLoad.prototype.switchBasin = function (config, configlist) {
        var region = config.udoc.region;
        this.preload.region = region;
        this._saveConfig();
        this.curConfig = config;
        this.listTable(configlist);
    };
    PreLoad.prototype.listTable = function (configlist, info) {
        var _this = this;
        if (info === void 0) { info = true; }
        if (configlist) {
            this.configlist = configlist;
        }
        this.curConfig = this.configlist.find(function (x) {
            return x.udoc.region == _this.preload.region;
        });
        this.configlist.map(function (config) {
            var basin = config.udoc.basin;
            if (_this.curConfig == config) {
                _this.curConfig = config;
                basin = "* " + basin;
            }
            if (info) {
                console.debug(basin);
            }
            return basin;
        });
        var aa = 0;
    };
    PreLoad.prototype.switchTask = function (task, configlist) {
        this.curTask = task;
        this.listTable(configlist);
    };
    ////////////////////
    PreLoad.prototype.removeOneTask = function (region, key) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, ret, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = this.getUDocUrl() + "removeOneTask/?region=" + region + "&key=" + key + "&page=0";
                        return [4 /*yield*/, got_1.default(url, { timeout: 2000 })];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        return [2 /*return*/, ret];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreLoad.prototype.emptyTasks = function (region, key) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, ret, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = this.getUDocUrl() + "emptyTasks/?region=" + region + "&key=" + key + "&page=0";
                        return [4 /*yield*/, got_1.default(url, { timeout: 2000 })];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        return [2 /*return*/, ret];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreLoad.prototype.submitIdleTask = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var region, basin, url, body, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.curConfig) return [3 /*break*/, 2];
                        region = this.curConfig.udoc.region;
                        basin = this.curConfig.udoc.basin;
                        url = this.getUDocUrl() + "addIdleTask/?region=" + region;
                        return [4 /*yield*/, got_1.default.post(url, {
                                json: task,
                                responseType: 'json'
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        ret = body;
                        if (ret.result == 1) {
                            //写入成功
                            console.warn("----TaskPovider @ " + task.uuid + " AddIdleTask");
                        }
                        else {
                            console.error("----TaskPovider @ " + task.uuid + " AddIdleTask err");
                        }
                        return [2 /*return*/, ret];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    PreLoad.prototype.listTask = function (region, key, page) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, ret, names, error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = this.getUDocUrl() + "listTask/?region=" + region + "&key=" + key + "&page=0";
                        return [4 /*yield*/, got_1.default(url, { timeout: 2000 })];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        if (ret.result) {
                            this.tasklist = ret.data;
                            names = this.tasklist.map(function (x) {
                                var taskname = x.name;
                                if (!_this.curTask || _this.curTask == x) {
                                    _this.curTask = x;
                                    taskname = "* " + taskname;
                                }
                                return taskname;
                            });
                        }
                        return [2 /*return*/, ret];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreLoad.prototype.retainTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var region, basin, plan, url, response, ret, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!this.curConfig) return [3 /*break*/, 2];
                        region = this.curConfig.udoc.region;
                        basin = this.curConfig.udoc.basin;
                        plan = this.curConfig.subjectSeries.mPlanName;
                        url = this.getUDocUrl() + "listRetainTask?region=" + region + "&prefix=" + plan;
                        return [4 /*yield*/, got_1.default(url)];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        if (ret.result) {
                        }
                        return [2 /*return*/, ret.data];
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5.response.body);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PreLoad.prototype.OutputSch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = '${root}listTask/bdsapi/OutputSch?uuid=task2020_1_14_0_7_29';
                        return [4 /*yield*/, got_1.default(url)];
                    case 1:
                        response = _a.sent();
                        console.log(response.body);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6.response.body);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //
    PreLoad.prototype.input = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    PreLoad.prototype.output = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /////////////////////////
    PreLoad.prototype.getDummyTask = function (regin) {
        var config = this.configlist.find(function (x) {
            return regin == x.udoc.region;
        });
        return config === null || config === void 0 ? void 0 : config.task;
    };
    //todo:   从 __spinner  得到 defaultregion
    PreLoad.prototype.getDummyDoc = function (regin) {
        var config = this.configlist.find(function (x) {
            return regin == x.udoc.region;
        });
        return config === null || config === void 0 ? void 0 : config.udoc;
    };
    PreLoad.prototype.getDummySubjectSeries = function (regin) {
        var config = this.configlist.find(function (x) {
            return regin == x.udoc.region;
        });
        return config === null || config === void 0 ? void 0 : config.subjectSeries;
    };
    //delay 保证 uuid 以秒计唯一性 
    PreLoad.prototype._delaySerirs = function (tasks) {
        var obvs = [];
        tasks.forEach(function (task) {
            var observable = new rxjs_1.Observable(function (subscriber) {
                subscriber.next(task);
                subscriber.complete();
            }).pipe(operators_1.delay(2000)); //保证 uuid 以秒计唯一性 
            obvs.push(observable);
        });
        return rxjs_1.concat(obvs).pipe(operators_1.concatAll());
    };
    PreLoad.prototype.gettaskTmpleDay8 = function (uDoc, plannname, index) {
        if (index === void 0) { index = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var dbtasks, task, subser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.retainTasks()];
                    case 1:
                        dbtasks = _a.sent();
                        if (dbtasks) {
                            task = dbtasks[index].task;
                            subser = task.subjectSeries;
                            task.t0 = bdshelper_1.BdsHelper.getDayT08(subser);
                            return [2 /*return*/, task];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PreLoad = __decorate([
        dilight_js_1.Injectable({
            providedIn: 'root'
        })
    ], PreLoad);
    return PreLoad;
}());
exports.PreLoad = PreLoad;
//# sourceMappingURL=preload.js.map