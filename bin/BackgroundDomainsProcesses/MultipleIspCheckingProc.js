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
const ProxyDAO = require("../../dao/ProxyDAO");
const Lib = require("../../commons/Libs");
const CONSTANT = require("../../commons/Constants");
const Configs_1 = require("../../commons/Configs");
const CONFIG = require("../../commons/Configs");
let proxyDAO = new ProxyDAO();
let MultipleIspCheckingProc = {};
const calculateMetric = (city, connectionTimeout, url) => __awaiter(this, void 0, void 0, function* () {
    let response;
    let notification;
    let created = `${new Date().toISOString()}`;
    let metric;
    let image = `${created}.png`;
    let map = new Map(CONSTANT.STATUS_CODE);
    let imagePath = Lib.generatePath(__dirname, CONSTANT.PATH.FILE_DATA_PATH, image);
    let tmp = {};
    let proxyList = [];
    const MAX = 1;
    for (let i = 0; i < MAX; i++) {
        let index = Lib.generateRandomIndex(0, city.length - 1);
        proxyList.push(city[index]);
        city = city.filter((value, i, arr) => {
            return value != city[index];
        });
    }
    let count = 0;
    try {
        for (let i = 0; i < proxyList.length; i++) {
            let proxy = proxyList[i];
            metric = yield Lib.requestWithPuppeteer(url, imagePath, { ip: proxy.ip, port: proxy.port }, connectionTimeout);
            if ((metric.status == '500' || metric.status == 500) && count != MAX - 1) {
                count++;
            }
            else if ((metric.status == '500' || metric.status == 500) && count == MAX - 1) {
                response = {
                    DNSLookup: 0,
                    InitConnection: 0,
                    DataTransfer: 0,
                    ResponseTime: 0,
                    WaitTime: 0,
                    location: proxy.details
                };
                notification = {
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
        console.log(e);
        throw e;
    }
    ;
    return { response, notification };
});
MultipleIspCheckingProc.connectionTimeout = process.argv[2] || 90;
MultipleIspCheckingProc.url = process.argv[3] || "https://www.24h.com.vn/";
MultipleIspCheckingProc.run = () => __awaiter(this, void 0, void 0, function* () {
    let hnVnpt = [], hnVietel = [], hcmVnpt = [], hcmVietel = [];
    let sql = `details->>'city' like '%Hanoi%' OR details->>'city' like '%Ho Chi Minh City%' AND status = 'active'`;
    try {
        let proxies = yield proxyDAO.findByCondition(sql);
        proxies.forEach((e) => {
            if (e.details.city == 'Hanoi' && e.details.isp == 'VNPT Corp') {
                hnVnpt.push(e);
            }
            else if (e.details.city == 'Hanoi' && e.details.isp == 'Viettel Group') {
                hnVietel.push(e);
            }
            else if (e.details.city == 'Ho Chi Minh City' && e.details.isp == 'Viettel Group') {
                hcmVietel.push(e);
            }
            else {
                hcmVnpt.push(e);
            }
        });
        let hnVietelMetric = yield calculateMetric(hnVietel, MultipleIspCheckingProc.connectionTimeout, MultipleIspCheckingProc.url);
        let hnVnptMetric = yield calculateMetric(hnVnpt, MultipleIspCheckingProc.connectionTimeout, MultipleIspCheckingProc.url);
        let hcmVnptMetric = yield calculateMetric(hcmVnpt, MultipleIspCheckingProc.connectionTimeout, MultipleIspCheckingProc.url);
        let hcmVietelMetric = yield calculateMetric(hcmVietel, MultipleIspCheckingProc.connectionTimeout, MultipleIspCheckingProc.url);
        return {
            isps: ['hnVietel', 'hnVnpt', 'hcmVnpt', 'hcmVietel'],
            result: [{ response: hnVietelMetric.response, notification: hnVietelMetric.notification },
                { response: hnVnptMetric.response, notification: hnVnptMetric.notification },
                { response: hcmVnptMetric.response, notification: hcmVnptMetric.notification },
                { response: hcmVietelMetric.response, notification: hcmVietelMetric.notification }]
        };
    }
    catch (e) {
        throw e;
    }
});
MultipleIspCheckingProc.run().then(rs => {
    process.send(rs);
    process.exit(0);
});
//# sourceMappingURL=MultipleIspCheckingProc.js.map