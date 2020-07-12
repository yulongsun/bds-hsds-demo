"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.BdsApiController = void 0;
var got_1 = require("got");
var routing_controllers_1 = require("routing-controllers");
var preload_1 = require("./preload");
var BdsApiController = /** @class */ (function () {
    function BdsApiController() {
    }
    /**
    请求：全流域模型数数据
    返回: 全流域模型数据的类型列表
     */
    BdsApiController.prototype.ResultTypeList = function (uuid, //任务id
    region, //流域id
    prefix, //流域.方案。如里下河实时预报、  突发满天飞染...
    itemid, //河道id
    seci) {
        return __awaiter(this, void 0, void 0, function () {
            var preloader, url, response, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        preloader = new preload_1.PreLoad();
                        url = preloader.getUDocUrl() + "ResultTypeList";
                        return [4 /*yield*/, got_1.default(url, {
                                searchParams: { uuid: uuid, region: region, prefix: prefix, itemid: itemid, seci: seci },
                                timeout: 2000
                            })];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /**
     *
    请求：读取任务模板
    返回:  任务模板结构
     */
    BdsApiController.prototype.getTaskList = function (region, //流域id
    prefix) {
        return __awaiter(this, void 0, void 0, function () {
            var preloader, url, response, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        preloader = new preload_1.PreLoad();
                        url = preloader.getUDocUrl() + "getTaskList";
                        return [4 /*yield*/, got_1.default(url, {
                                searchParams: { region: region, prefix: prefix },
                                timeout: 2000
                            })];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /*
        请求：最后一个任务
        返回:  最后一个任务
    */
    BdsApiController.prototype.getLatestTask = function (region, //流域id
    prefix) {
        return __awaiter(this, void 0, void 0, function () {
            var preloader, url, response, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        preloader = new preload_1.PreLoad();
                        url = preloader.getUDocUrl() + "getLatestTask";
                        return [4 /*yield*/, got_1.default(url, {
                                searchParams: { region: region, prefix: prefix },
                                timeout: 2000
                            })];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /**
     *
    请求：读取任务模板
    返回:  任务模板结构
     */
    BdsApiController.prototype.getTaskTmpl = function (region, //流域id
    prefix) {
        return __awaiter(this, void 0, void 0, function () {
            var preloader, url, response, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        preloader = new preload_1.PreLoad();
                        url = preloader.getUDocUrl() + "getTaskTmpl";
                        return [4 /*yield*/, got_1.default(url, {
                                searchParams: { region: region, prefix: prefix },
                                timeout: 2000
                            })];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /**
    请求：一个任务分组中的数据特征值（任务分组可以非常大，特征值用于分析）
    返回:  一个任务分组中的结果分析对像或预报分析数据特征值
     */
    BdsApiController.prototype.DataFeature = function (region, //流域id
    taskgrp, //任务分组名称，
    keyid) {
        return __awaiter(this, void 0, void 0, function () {
            var preloader, url, response, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        preloader = new preload_1.PreLoad();
                        url = preloader.getUDocUrl() + "DataFeature";
                        return [4 /*yield*/, got_1.default(url, {
                                searchParams: { region: region, taskgrp: taskgrp, keyid: keyid },
                                timeout: 2000
                            })];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /**
    请求：一个全流域全架构信息
    返回:  一个全流域全架构信息
     */
    BdsApiController.prototype.OutputSch = function (uuid, //任务id
    region) {
        return __awaiter(this, void 0, void 0, function () {
            var preloader, url, response, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        preloader = new preload_1.PreLoad();
                        url = preloader.getUDocUrl() + "OutputSch";
                        return [4 /*yield*/, got_1.default(url, {
                                searchParams: { uuid: uuid, region: region, },
                                timeout: 2000
                            })];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /*
        请求：结果一个分析对象预见期的数据(或 预置值 或 Preset)
        返回:  结果一个分析对象的预见期的数据
    */
    BdsApiController.prototype.Preset = function (uuid, //流域id
    region, //流域id
    keyid) {
        return __awaiter(this, void 0, void 0, function () {
            var preloader, url, response, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        preloader = new preload_1.PreLoad();
                        url = preloader.getUDocUrl() + "OutputSch";
                        return [4 /*yield*/, got_1.default(url, {
                                searchParams: { uuid: uuid, region: region, },
                                timeout: 2000
                            })];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /**
    请求：一个时段的模型数据的全流域结果
    返回:  一个时段的全流域断面结果
     */
    BdsApiController.prototype.ModelData = function (uuid, //任务id
    region, //流域id
    prefix, //流域.方案。如里下河实时预报、  突发满天飞染...
    dt) {
        return __awaiter(this, void 0, void 0, function () {
            var preloader, url, response, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        preloader = new preload_1.PreLoad();
                        url = preloader.getUDocUrl() + "ModelData";
                        return [4 /*yield*/, got_1.default(url, {
                                searchParams: { uuid: uuid, region: region, prefix: prefix, dt: dt.toJSON() },
                                timeout: 2000
                            })];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /**
    请求：一个断面的模型数据所有时段结果
    返回： 一个断面的预见期内所有时段的数据
     */
    BdsApiController.prototype.ModelElm = function (uuid, //任务id
    region, //流域id
    prefix, //流域.方案。如里下河实时预报、  突发满天飞染...
    itemid, //河道id
    seci, //断面id
    elmi, //元互素id
    resulset) {
        return __awaiter(this, void 0, void 0, function () {
            var preloader, url, response, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        preloader = new preload_1.PreLoad();
                        url = preloader.getUDocUrl() + "ModelElm";
                        return [4 /*yield*/, got_1.default(url, {
                                searchParams: { uuid: uuid, region: region, prefix: prefix, itemid: itemid, seci: seci, elmi: elmi, resulset: resulset },
                                timeout: 2000
                            })];
                    case 1:
                        response = _a.sent();
                        ret = JSON.parse(response.body);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    __decorate([
        routing_controllers_1.Get("/ResultTypeList"),
        __param(0, routing_controllers_1.QueryParam("uuid")),
        __param(1, routing_controllers_1.QueryParam("region")),
        __param(2, routing_controllers_1.QueryParam("prefix")),
        __param(3, routing_controllers_1.QueryParam("itemid")),
        __param(4, routing_controllers_1.QueryParam("seci")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number, String, Number, Number]),
        __metadata("design:returntype", Promise)
    ], BdsApiController.prototype, "ResultTypeList", null);
    __decorate([
        routing_controllers_1.Get("/getTaskList"),
        __param(0, routing_controllers_1.QueryParam("region")),
        __param(1, routing_controllers_1.QueryParam("prefix")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, String]),
        __metadata("design:returntype", Promise)
    ], BdsApiController.prototype, "getTaskList", null);
    __decorate([
        routing_controllers_1.Get("/getLatestTask"),
        __param(0, routing_controllers_1.QueryParam("region")),
        __param(1, routing_controllers_1.QueryParam("prefix")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, String]),
        __metadata("design:returntype", Promise)
    ], BdsApiController.prototype, "getLatestTask", null);
    __decorate([
        routing_controllers_1.Get("/getTaskTmpl"),
        __param(0, routing_controllers_1.QueryParam("region")),
        __param(1, routing_controllers_1.QueryParam("prefix")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, String]),
        __metadata("design:returntype", Promise)
    ], BdsApiController.prototype, "getTaskTmpl", null);
    __decorate([
        routing_controllers_1.Get("/DataFeature"),
        __param(0, routing_controllers_1.QueryParam("region")),
        __param(1, routing_controllers_1.QueryParam("taskgrp")),
        __param(2, routing_controllers_1.QueryParam("keyid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, String, Number]),
        __metadata("design:returntype", Promise)
    ], BdsApiController.prototype, "DataFeature", null);
    __decorate([
        routing_controllers_1.Get("/OutputSch"),
        __param(0, routing_controllers_1.QueryParam("uuid")),
        __param(1, routing_controllers_1.QueryParam("region")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number]),
        __metadata("design:returntype", Promise)
    ], BdsApiController.prototype, "OutputSch", null);
    __decorate([
        routing_controllers_1.Get("/Preset"),
        __param(0, routing_controllers_1.QueryParam("uuid")),
        __param(1, routing_controllers_1.QueryParam("region")),
        __param(2, routing_controllers_1.QueryParam("keyid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number, Number]),
        __metadata("design:returntype", Promise)
    ], BdsApiController.prototype, "Preset", null);
    __decorate([
        routing_controllers_1.Get("/ModelData"),
        __param(0, routing_controllers_1.QueryParam("uuid")),
        __param(1, routing_controllers_1.QueryParam("region")),
        __param(2, routing_controllers_1.QueryParam("prefix")),
        __param(3, routing_controllers_1.QueryParam("dt")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number, String, Date]),
        __metadata("design:returntype", Promise)
    ], BdsApiController.prototype, "ModelData", null);
    __decorate([
        routing_controllers_1.Get("/ModelElm"),
        __param(0, routing_controllers_1.QueryParam("uuid")),
        __param(1, routing_controllers_1.QueryParam("region")),
        __param(2, routing_controllers_1.QueryParam("prefix")),
        __param(3, routing_controllers_1.QueryParam("itemid")),
        __param(4, routing_controllers_1.QueryParam("seci")),
        __param(5, routing_controllers_1.QueryParam("elmi")),
        __param(6, routing_controllers_1.QueryParam("resulset")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number, String, Number, Number, Number, String]),
        __metadata("design:returntype", Promise)
    ], BdsApiController.prototype, "ModelElm", null);
    BdsApiController = __decorate([
        routing_controllers_1.Controller("/bdsapi") //
    ], BdsApiController);
    return BdsApiController;
}());
exports.BdsApiController = BdsApiController;
//# sourceMappingURL=control.js.map