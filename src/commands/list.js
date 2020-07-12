"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var preload_1 = require("../udocconfig/preload");
function listInstance(udocconfig, bjson) {
    console.debug('');
    console.debug('');
    //console.debug('udocapi:  ', Preload.getUDocUrl());
    // --table 和 --json 二种格式
    if (bjson) {
        var Configs = udocconfig.map(function (config) {
            return {
                task: config.task,
                udoc: config.udoc,
                subjectSeries: config.subjectSeries
            };
        });
        console.debug(JSON.stringify(Configs, null, '  '));
        return Configs;
    }
    else {
        //不是本项目的设置，而是正在运行的 dataserv 中获
        var tablehead = '流域名称 别名 分区号 专题名 绑定-port redis-port';
        var dash = '----------------------------------------------';
        var Configs = udocconfig.map(function (config) {
            var _a;
            var udoc = config.udoc;
            var subjectSeries = config.subjectSeries;
            var storage = config.task;
            return [udoc.basin, udoc.alias, udoc.region, subjectSeries ? subjectSeries.mPlanName : 'no_series', (_a = udoc.binding) !== null && _a !== void 0 ? _a : 'no_binding', storage.redis.port].join('  '); //storage.mongo.a
        });
        Configs = __spreadArrays([tablehead, dash], Configs);
        var aa = Configs.join('\r\n');
        console.debug(aa);
        return;
    }
}
module.exports = function (udocapi, bjson) {
    if (bjson === void 0) { bjson = false; }
    return __awaiter(this, void 0, void 0, function () {
        var preloader, urlRoot, udocconfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    preloader = new preload_1.PreLoad();
                    urlRoot = preloader.getUDocUrl();
                    console.debug('udocapi= ', urlRoot);
                    return [4 /*yield*/, preloader.getUdocConfig()];
                case 1:
                    udocconfig = _a.sent();
                    if (!udocconfig) {
                        console.debug('no udocconfig');
                        return [2 /*return*/];
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
                    return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=list.js.map