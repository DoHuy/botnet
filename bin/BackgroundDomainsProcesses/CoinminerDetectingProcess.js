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
const Lib = require("../../commons/Libs");
const path = require("path");
const fs = require("fs");
const CONFIG = require("../../commons/Configs");
const MonitoredWebsiteDAO = require("../../dao/MonitoredWebsiteDAO");
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let CoinMinerDetectingProcess = {};
CoinMinerDetectingProcess.webId = process.argv[2] || 11;
CoinMinerDetectingProcess.run = (webId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let website = yield monitoredWebsiteDAO.findById(webId);
        let option = { headless: true };
        const browser = yield puppeteer.launch(option);
        let page = yield browser.newPage();
        let response = yield page.goto(website.url, {
            waitUntil: "domcontentloaded"
        });
        let domains = yield page.evaluate(() => {
            const getDomain = (url) => {
                const match = url.match(/:\/\/(.[^/]+)/);
                return match ? match[1] : '';
            };
            let resource = performance.getEntriesByType("resource");
            resource = resource.filter(e => e.initiatorType == "script");
            console.log(resource);
            resource = resource.map(e => {
                let dns = getDomain(e.name);
                return dns;
            });
            return resource;
        });
        yield browser.close();
        let blackListPath = path.join(__dirname, '..', '..', 'data', 'store', 'coinminer', 'blacklist.txt');
        fs.readFile(blackListPath, 'utf8', (err, data) => {
            if (err)
                throw err;
            let detected = [];
            let blackList = data.split('\n');
            blackList = blackList.map(e => {
                let dns = Lib.getDomain(e);
                let tmp = "";
                let rs = {
                    dns: 'hashforcash.us',
                    regex: /(hashforcash.us)/
                };
                if (dns[0] === '*') {
                    [].forEach.call(dns, (char, index) => {
                        if (index != 0) {
                            tmp += char;
                        }
                    });
                }
                else if (dns.length > 0) {
                    tmp = dns;
                }
                if (tmp.charAt(0) === '.') {
                    rs = {
                        dns: '*' + tmp,
                        regex: new RegExp(`\\w+${tmp}`, 'gm')
                    };
                }
                else if (tmp.length > 0) {
                    rs = {
                        dns: tmp,
                        regex: new RegExp((`(${tmp})`), 'gm')
                    };
                }
                return rs;
            });
            let kq_kiemtra = [];
            for (let i = 0; i < blackList.length; i++) {
                for (let j = 0; j < domains.length; j++) {
                    let boolean = blackList[i].regex.test(domains[j]);
                    if (boolean == true) {
                        detected.push(domains[j]);
                    }
                }
            }
            let resultFilesDbPath = path.join(__dirname, '..', '..', 'data', 'store', 'filesDb');
            let resultFilePath = path.join(__dirname, '..', '..', 'data', 'store', 'filesDb', `coinminer_${webId}.json`);
            let content;
            if (fs.existsSync(resultFilesDbPath)) {
                if (detected.length == 0) {
                    content = {
                        notice: "safe",
                        detected: detected,
                        created: new Date().toISOString()
                    };
                    fs.writeFile(resultFilePath, JSON.stringify(content), 'utf8', (err) => {
                        if (err)
                            throw err;
                    });
                }
                else {
                    content = {
                        notice: "un_safe",
                        detected: detected,
                        created: new Date().toISOString()
                    };
                    fs.writeFile(resultFilePath, JSON.stringify(content), 'utf8', (err) => {
                        if (err)
                            throw err;
                    });
                }
            }
            else {
                fs.mkdirSync(resultFilesDbPath);
                if (detected.length == 0) {
                    content = {
                        notice: "safe",
                        detected: detected,
                        created: new Date().toISOString()
                    };
                    fs.writeFile(resultFilePath, JSON.stringify(content), 'utf8', (err) => {
                        if (err)
                            throw err;
                    });
                }
                else {
                    content = {
                        notice: "un_safe",
                        detected: detected,
                        created: new Date().toISOString()
                    };
                    fs.writeFile(resultFilePath, JSON.stringify(content), 'utf8', (err) => {
                        if (err)
                            throw null;
                    });
                }
            }
        });
    }
    catch (e) {
        throw e;
    }
});
setInterval(() => __awaiter(this, void 0, void 0, function* () {
    yield CoinMinerDetectingProcess.run(CoinMinerDetectingProcess.webId);
}), CONFIG.DEFAULT_DETECT_COINMINER_TIME);
//# sourceMappingURL=CoinminerDetectingProcess.js.map