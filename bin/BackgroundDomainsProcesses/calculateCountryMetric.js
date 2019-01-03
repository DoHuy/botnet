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
const CONSTANT = require("../../commons/Constants");
const Lib = require("../../commons/Libs");
const Configs_1 = require("../../commons/Configs");
const CONFIG = require("../../commons/Configs");
const calculateMetric = (country, connectionTimeout, url) => __awaiter(this, void 0, void 0, function* () {
    let response;
    let notification;
    let created = `${new Date().toISOString()}`;
    let metric;
    let image = `${created}.png`;
    let map = new Map(CONSTANT.STATUS_CODE);
    let imagePath = Lib.generatePath(__dirname, CONSTANT.PATH.FILE_DATA_PATH, image);
    let tmp = {};
    let proxyList = [];
    const MAX = 3;
    for (let i = 0; i < MAX; i++) {
        let index = Lib.generateRandomIndex(0, country.length - 1);
        proxyList.push(country[index]);
        country = country.filter((value, i, arr) => {
            return value != country[index];
        });
    }
    let count = 0;
    try {
        for (let i = 0; i < proxyList.length; i++) {
            let proxy = proxyList[i];
            metric = yield Lib.requestWithPuppeteer(url, imagePath, {
                ip: proxy.ip,
                port: proxy.port
            }, connectionTimeout);
            if (metric.status == '500' && count != MAX - 1) {
                count++;
            }
            else if (metric.status == '500' && count == MAX - 1) {
                let response = {
                    DNSLookup: 0,
                    InitConnection: 0,
                    DataTransfer: 0,
                    ResponseTime: 0,
                    WaitTime: 0,
                    location: proxy.details
                };
                let notification = {
                    server: metric.server,
                    statusCode: metric.status,
                    code: map.get(`${metric.status}`).code,
                    message: metric.message,
                    state: Configs_1.NOTICE_RULE.state[1],
                    img: `${CONFIG.DEPLOY}/${image}`,
                    level: "error"
                };
                return { response, notification };
            }
            else {
                let newResponse = {};
                let newNotification = {};
                newResponse = {
                    DNSLookup: metric.DNSLookup,
                    InitConnection: metric.InitConnection,
                    DataTransfer: metric.DataTransfer,
                    ResponseTime: Math.abs(metric.ResponseTime - Number.parseFloat(proxy.responseTime)),
                    WaitTime: metric.WaitTime,
                    location: proxy.details
                };
                let level = newResponse.ResponseTime > CONFIG.NOTICE_RULE.connectionTimeout["threshold"].success ? CONFIG.NOTICE_RULE.levels[1] : CONFIG.NOTICE_RULE.levels[0];
                newNotification = {
                    server: metric.server,
                    statusCode: metric.status,
                    code: map.get(`${metric.status}`).code,
                    message: map.get(`${metric.status}`).message,
                    state: Configs_1.NOTICE_RULE.state[0],
                    img: `${CONFIG.DEPLOY}/${image}`,
                    level: level
                };
                response = newResponse;
                notification = newNotification;
                break;
            }
        }
    }
    catch (e) {
        throw e;
    }
    ;
    return { response, notification };
});
let arr = JSON.parse(process.argv[2]);
let connectionTimeout = process.argv[3];
let url = process.argv[4];
calculateMetric(arr, connectionTimeout, url)
    .then(rs => {
    process.send(rs);
    process.exit(0);
});
//# sourceMappingURL=calculateCountryMetric.js.map