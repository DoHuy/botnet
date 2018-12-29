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
const Libs = require("../../commons/Libs");
const CONFIG = require("../../commons/Configs");
const ProxyDAO = require("../../dao/ProxyDAO");
const puppeteer = require("puppeteer");
let proxyDAO = new ProxyDAO();
function getDetailsLocationProxy(proxy) {
    return __awaiter(this, void 0, void 0, function* () {
        let browser;
        try {
            browser = yield puppeteer.launch({ headless: true, args: [`--proxy-server=${proxy.ip}:${proxy.port}`] });
            const page = yield browser.newPage();
            yield page.goto('https://www.iplocation.net/', {
                waitUntil: "domcontentloaded",
                timeout: 100000
            });
            const rs = yield page.evaluate(() => {
                let rs = {};
                let trList = document.querySelectorAll(".table_dark_green > tbody > tr");
                trList = [...trList];
                let tdList1 = trList[2].children;
                let tdList2 = trList[3].children;
                tdList1 = [...tdList1];
                tdList2 = [...tdList2];
                rs.ip = tdList1[0].innerText.trim();
                rs.country = tdList1[1].innerText.trim();
                rs.region = tdList1[2].innerText.trim();
                rs.city = tdList1[3].innerText.trim();
                rs.isp = tdList2[0].innerText.trim();
                rs.organization = tdList2[1].innerText.trim();
                rs.lat = tdList2[2].innerText.trim();
                rs.long = tdList2[3].innerText.trim();
                return rs;
            });
            yield browser.close();
            return rs;
        }
        catch (e) {
            yield browser.close();
            throw e;
        }
    });
}
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log("Bat dau update details cua cac proxy server ....");
        let rs = yield proxyDAO.findByCondition(`details IS NULL AND status = 'active'`);
        let proxies = rs;
        let link = Libs.generateRandomLink();
        let dem = 0;
        for (let proxy of proxies) {
            try {
                let result = yield Libs.requestCurl(link, { ip: proxy.ip, port: proxy.port }, CONFIG.DEFAULT_TIMEOUT);
                let details = yield getDetailsLocationProxy({ ip: proxy.ip, port: proxy.port });
                console.log(`${proxy.ip}: ${proxy.port} active`);
                console.log(details);
                yield proxyDAO.modifyById(proxy.id, "details", details);
            }
            catch (e) {
                yield proxyDAO.modifyById(proxy.id, 'status', 'inactive');
                console.log(`${proxy.ip}: ${proxy.port} inactive`);
            }
        }
        console.log("So luong cac proxy inactive: ", ++dem);
    }
    catch (e) {
        throw e;
    }
}))();
//# sourceMappingURL=updateDetail.js.map
