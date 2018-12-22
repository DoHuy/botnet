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
const puppeteer = require("puppeteer");
const path = require('path');
const curl = require('curl');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Constants = require('./Constants');
const config = require('./Configs');
function generatePath(currentPath, destinationFolder, filename) {
    destinationFolder = filename == null ? destinationFolder : `${destinationFolder}/${filename}`;
    return path.normalize(path.relative(currentPath, destinationFolder));
}
function generateRandomLink() {
    return Constants.LINKS[generateRandomIndex(0, Constants.LINKS.length - 1)];
}
function generateRandomIndex(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}
function requestCurl(url, proxyServer = null, timeOutProxy = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let rawResult = {};
        let result = {};
        let timeout = timeOutProxy == null ? config.DEFAULT_TIMEOUT : timeOutProxy;
        let cmd = proxyServer !== null
            ? `curl --max-time ${timeout} --proxy http://${proxyServer.ip}:${proxyServer.port} -w "%{http_code} %{time_namelookup} %{time_connect} %{time_appconnect} %{time_pretransfer} %{time_redirect} %{time_starttransfer} %{time_total}" -o /dev/null -s "${url}"`
            : `curl --max-time ${timeout} -w "%{http_code} %{time_namelookup} %{time_connect} %{time_appconnect} %{time_pretransfer} %{time_redirect} %{time_starttransfer} %{time_total}" -o /dev/null -s "${url}"`;
        try {
            let tmp = yield exec(cmd);
            let tmp2 = tmp.stdout.split(" ");
            let fields = ['http_code', 'time_namelookup', 'time_connect',
                'time_appconnect', 'time_pretransfer', 'time_redirect',
                'time_starttransfer', 'time_total'];
            for (let i = 0; i < fields.length; i++) {
                rawResult[fields[i]] = Number.parseFloat(tmp2[i].trim().replace(",", "."));
            }
            result.DNSLookup = rawResult.time_namelookup;
            result.ConnectionTime = rawResult.time_connect - rawResult.time_namelookup + rawResult.time_appconnect - rawResult.time_connect;
            result.WaitTime = rawResult.time_starttransfer - rawResult.time_appconnect;
            result.DataTransfer = rawResult.time_total - rawResult.time_starttransfer;
            result.TotalTime = rawResult.time_total;
        }
        catch (e) {
            throw e;
        }
        return result;
    });
}
function requestWithPuppeteer(url, imagePath, proxyServer = null, timeOutProxy = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = {};
        let response;
        let page;
        let option = proxyServer == null ? { headless: true } : { headless: true, args: [`--proxy-server=${proxyServer.ip}:${proxyServer.port}`] };
        const browser = yield puppeteer.launch(option);
        let timeout = timeOutProxy == null ? config.DEFAULT_TIMEOUT : timeOutProxy;
        try {
            page = yield browser.newPage();
            response = yield page.goto(url, {
                waitUntil: "domcontentloaded",
                timeout: timeout
            });
            result = yield page.evaluate(() => {
                let nav = {};
                let res = {};
                let pagNav = window.performance.timing.toJSON();
                nav.DNSLookup = pagNav.domainLookupEnd - pagNav.domainLookupStart;
                nav.InitConnection = pagNav.connectEnd - pagNav.connectStart;
                nav.DataTransfer = pagNav.responseEnd - pagNav.responseStart;
                nav.ResponseTime = pagNav.responseEnd - pagNav.requestStart;
                nav.WaitTime = pagNav.responseStart - pagNav.requestStart;
                return nav;
            });
            result.status = response["_headers"].status == undefined ? response["_status"] : response["_headers"].status;
            result.server = response["_headers"].server == undefined ? "not available".toLocaleUpperCase() : response["_headers"].server;
            if (result.status !== '200') {
                yield page.screenshot({
                    path: imagePath
                });
            }
            else {
                yield page.screenshot({
                    path: imagePath,
                    fullPage: true,
                    omitBackground: false
                });
            }
            yield browser.close();
            return result;
        }
        catch (e) {
            yield page.screenshot({
                path: imagePath
            });
            yield browser.close();
            return {
                server: "NOT AVAILABLE",
                status: '500',
                message: e.message
            };
        }
        yield browser.close();
    });
}
function base64EncodeUrl(str) {
    str = Buffer.from(str).toString('base64');
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}
function base64DecodeUrl(str) {
    str = (str + '===').slice(0, str.length + (str.length % 4));
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    return Buffer.from(str, 'base64').toString('ascii');
}
function getQueryUrl(url, ...params) {
    let result = {};
    let query = url.split('/')[url.split('/').length - 1];
    let tmp = new URLSearchParams(query);
    params.forEach(key => {
        let value = tmp.get(key);
        if (key != null) {
            result[key] = value;
        }
        else {
            result[key] = null;
        }
    });
    return result;
}
;
function convertDataToCsv(fields, data) {
    let csv = "";
    fields = fields.join(',');
    data = data.map((value, index) => {
        let tmp = [];
        for (let key in value) {
            tmp.push(value[key]);
        }
        tmp = tmp.join(',');
        return tmp;
    });
    data = data.join('\n');
    csv = `${fields}\n${data}`;
    return csv;
}
module.exports = {
    generatePath,
    generateRandomLink,
    generateRandomIndex,
    requestCurl,
    requestWithPuppeteer,
    base64EncodeUrl,
    base64DecodeUrl,
    getQueryUrl,
    convertDataToCsv
};
//# sourceMappingURL=Libs.js.map