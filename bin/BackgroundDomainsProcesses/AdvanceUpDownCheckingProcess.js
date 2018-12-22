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
const SubProcManager = require("./SubProcManager");
const CONSTANT = require("../../commons/Constants");
let AdvanceUpDownCheckingProcess = {};
let responseStateDAO = new ResponseStateDAO();
let arrTest = JSON.stringify(['usa', 'uk', 'russia', 'japan']);
AdvanceUpDownCheckingProcess.frequently = process.argv[2] || 180000;
AdvanceUpDownCheckingProcess.connectionTimeout = process.argv[3] || 120000;
AdvanceUpDownCheckingProcess.webId = process.argv[4] || 108;
AdvanceUpDownCheckingProcess.url = process.argv[5] || "https://youtube.com";
AdvanceUpDownCheckingProcess.countries = process.argv[6] || arrTest;
AdvanceUpDownCheckingProcess.run = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let metric = {};
        let created = new Date().toISOString();
        let countriesList = [];
        let countriesMap = new Map(CONSTANT.COUNTRIES);
        if (typeof AdvanceUpDownCheckingProcess.countries != 'object') {
            AdvanceUpDownCheckingProcess.countries = JSON.parse(AdvanceUpDownCheckingProcess.countries);
        }
        AdvanceUpDownCheckingProcess.countries.forEach((e) => {
            let kq = countriesMap.get(e);
            countriesList.push({ key: e, value: kq });
        });
        countriesList = JSON.stringify(countriesList);
        try {
            let proc1 = SubProcManager.initCurrentIpCheckingProc(AdvanceUpDownCheckingProcess.connectionTimeout, AdvanceUpDownCheckingProcess.webId, AdvanceUpDownCheckingProcess.url);
            let proc2 = SubProcManager.initMultipleIspCheckingProc(AdvanceUpDownCheckingProcess.connectionTimeout, AdvanceUpDownCheckingProcess.url);
            let proc3 = SubProcManager.initMultipleCountryCheckingProc(AdvanceUpDownCheckingProcess.connectionTimeout, AdvanceUpDownCheckingProcess.url, countriesList);
            let dataProc1 = new Promise((resolve) => {
                proc1.on('message', (msg) => {
                    resolve(msg);
                });
            });
            let dataProc2 = new Promise((resolve) => {
                proc2.on('message', (msg) => {
                    resolve(msg);
                });
            });
            let dataProc3 = new Promise((resolve) => {
                proc3.on('message', (msg) => {
                    resolve(msg);
                });
            });
            Promise.all([dataProc1, dataProc2, dataProc3]).then((vals) => __awaiter(this, void 0, void 0, function* () {
                let multipleIspResp = [];
                let multipleCountriesResp = [];
                let multipleIspNoti = [];
                let multipleCountriesNoti = [];
                for (let i = 0; i < vals[1]["isps"].length; i++) {
                    let isp = vals[1]["isps"][i];
                    let result = vals[1]["result"][i];
                    let country = vals[2]["countries"][i];
                    let result2 = vals[2]["result"][i];
                    multipleIspResp.push([isp, result.response]);
                    multipleCountriesResp.push([country, result2.response]);
                    multipleIspNoti.push([isp, result.notification]);
                    multipleCountriesNoti.push([country, result2.notification]);
                }
                let newResponse = {
                    response: vals[0]["response"],
                    multipleIsp: multipleIspResp,
                    multipleCountries: multipleCountriesResp
                };
                let newNotification = {
                    notification: vals[0]["notification"],
                    multipleIsp: multipleIspNoti,
                    multipleCountries: multipleCountriesNoti
                };
                yield responseStateDAO.create({
                    response: newResponse,
                    notification: newNotification,
                    created: created,
                    webId: AdvanceUpDownCheckingProcess.webId
                });
            }));
        }
        catch (e) {
            throw e;
        }
    });
};
setInterval(() => {
    AdvanceUpDownCheckingProcess.run();
}, AdvanceUpDownCheckingProcess.frequently);
//# sourceMappingURL=AdvanceUpDownCheckingProcess.js.map