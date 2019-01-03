"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseStateDAO = require("../../dao/ResponseStateDAO");
const Lib = require("../../commons/Libs");
const CONFIG = require("../../commons/Configs");
const CONSTANT = require("../../commons/Constants");
const util = require("util");
const Configs_1 = require("../../commons/Configs");
const exec = util.promisify(require('child_process').exec);
let CurrentIpCheckingProc = {};
let responseStateDAO = new ResponseStateDAO();
CurrentIpCheckingProc.connectionTimeout = process.argv[2] || '30000';
CurrentIpCheckingProc.webId = process.argv[3] || 1;
CurrentIpCheckingProc.url = process.argv[4] || "https://news.zing.vn";
CurrentIpCheckingProc.run = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let notification;
        let created = `${new Date().toISOString()}`;
        let infoIp = yield exec(`curl https://ipinfo.io`);
        let location = JSON.parse(infoIp.stdout);
        let image = `${created}.png`;
        let imagePath = Lib.generatePath(__dirname, CONSTANT.PATH.FILE_DATA_PATH, image);
        let tmp = {};
        let map = new Map(CONSTANT.STATUS_CODE);
        let metric;
        try {
            metric = yield Lib.requestWithPuppeteer(CurrentIpCheckingProc.url, imagePath, null, CurrentIpCheckingProc.connectionTimeout);
            if (metric.status == '500') {
                response = {
                    DNSLookup: 0,
                    InitConnection: 0,
                    DataTransfer: 0,
                    ResponseTime: 0,
                    WaitTime: 0,
                    averageResponseTime: 0,
                    maxResponseTime: 0,
                    minResponseTime: 0,
                    location: location
                };
                notification = {
                    server: null,
                    statusCode: metric.status,
                    code: map.get(`${metric.status}`).code,
                    message: metric.message,
                    state: Configs_1.NOTICE_RULE.state[1],
                    img: `${CONFIG.DEPLOY}/${image}`,
                    level: "error"
                };
            }
            else {
                let respStateData = yield responseStateDAO.findByCondition(` webid = ${CurrentIpCheckingProc.webId}`);
                let web;
                if (respStateData != null) {
                    web = { responseTime: {}, notification: {} };
                    respStateData.forEach((e) => {
                        web.responseTime[e.created] = e.response;
                        web.notification[e.created] = e.notification;
                    });
                }
                else {
                    web = { responseTime: null, notification: null };
                }
                let averageResponseTime = 0;
                let maxResponseTime = Number.MIN_SAFE_INTEGER;
                let minResponseTime = Number.MAX_SAFE_INTEGER;
                let firstResponse = {};
                firstResponse[created] = {
                    DNSLookup: metric.DNSLookup,
                    InitConnection: metric.InitConnection,
                    DataTransfer: metric.DataTransfer,
                    ResponseTime: metric.ResponseTime,
                    WaitTime: metric.WaitTime,
                    averageResponseTime: 0,
                    maxResponseTime: 0,
                    minResponseTime: 0,
                    location: location
                };
                let details = web.responseTime != null ? web.responseTime : firstResponse;
                details[created] = firstResponse[created];
                let totalResp = 0;
                let count = 0;
                for (let i in details) {
                    if (details[i].ResponseTime != Number.MIN_SAFE_INTEGER) {
                        if (details[i].multipleCountries == undefined) {
                            if (details[i].ResponseTime != 0) {
                                averageResponseTime += details[i].ResponseTime;
                                maxResponseTime = maxResponseTime >= details[i].ResponseTime ? maxResponseTime : details[i].ResponseTime;
                                minResponseTime = minResponseTime <= details[i].ResponseTime ? minResponseTime : details[i].ResponseTime;
                                count++;
                            }
                        }
                        else {
                            if (details[i].ResponseTime != 0) {
                                averageResponseTime += details[i].response.ResponseTime;
                                maxResponseTime = maxResponseTime >= details[i].response.ResponseTime ? maxResponseTime : details[i].response.ResponseTime;
                                minResponseTime = minResponseTime <= details[i].response.ResponseTime ? minResponseTime : details[i].response.ResponseTime;
                                count++;
                            }
                        }
                    }
                }
                averageResponseTime = averageResponseTime / count;
                response = {
                    DNSLookup: metric.DNSLookup,
                    InitConnection: metric.InitConnection,
                    DataTransfer: metric.DataTransfer,
                    ResponseTime: metric.ResponseTime,
                    WaitTime: metric.WaitTime,
                    averageResponseTime: averageResponseTime,
                    maxResponseTime: maxResponseTime,
                    minResponseTime: minResponseTime,
                    location: location
                };
                tmp.server = metric.server;
                tmp.statusCode = metric.status;
                tmp.code = map.get(`${metric.status}`).code;
                tmp.message = map.get(`${metric.status}`).message;
                tmp.state = Configs_1.NOTICE_RULE.state[0];
                tmp.img = `${CONFIG.DEPLOY}/${image}`;
                if (tmp.statusCode == '200' && metric.ResponseTime <= CONFIG.NOTICE_RULE.connectionTimeout["threshold"].success) {
                    tmp.level = "success";
                }
                else if (tmp.statusCode == '200' && metric.ResponseTime > CONFIG.NOTICE_RULE.connectionTimeout["threshold"].success) {
                    tmp.level = "warning";
                }
                else {
                    tmp.level = "error";
                }
                notification = tmp;
            }
        }
        catch (e) {
            throw e;
        }
        ;
        return { response, notification };
    });
};
CurrentIpCheckingProc.run().then(rs => {
    process.send(rs);
    process.exit(0);
});
//# sourceMappingURL=CurrentIpCheckingProc.js.map