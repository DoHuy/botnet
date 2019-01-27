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
const SubProcManager = require("./SubProcManager");
let proxyDAO = new ProxyDAO();
let MultipleCountryCheckingProc = {};
let arrTest = JSON.stringify([{ key: 'usa', value: 'United States' }, { key: 'japan', value: 'Japan' }, { key: 'uk', value: 'United Kingdom' }, { key: 'russia', value: 'Russia' }]);
MultipleCountryCheckingProc.connectionTimeout = process.argv[2] || 30000;
MultipleCountryCheckingProc.url = process.argv[3] || "https://youtube.com";
MultipleCountryCheckingProc.countriesList = process.argv[4] || arrTest;
MultipleCountryCheckingProc.run = (countriesList) => __awaiter(this, void 0, void 0, function* () {
    let country1 = [], country2 = [], country3 = [], country4 = [];
    let countries = [];
    countriesList = JSON.parse(countriesList);
    for (let i = 0; i < countriesList.length; i++) {
        let e = countriesList[i];
        countries.push(e.key);
    }
    let sql = `details->>'country' like '%United States%' OR details->>'country' like '%${countriesList[0].value}%'
            OR details->>'country' like '%${countriesList[1].value}%' OR details->>'country' like '%${countriesList[2].value}%'
            OR details->>'country' like '%${countriesList[3].value}%' AND status = 'active'`;
    try {
        let proxies = yield proxyDAO.findByCondition(sql);
        proxies.forEach((e) => {
            switch (e.details.country) {
                case countriesList[0].value:
                    country1.push(e);
                    break;
                case countriesList[1].value:
                    country2.push(e);
                    break;
                case countriesList[2].value:
                    country3.push(e);
                    break;
                case countriesList[3].value:
                    country4.push(e);
                    break;
            }
        });
    }
    catch (e) {
        throw e;
    }
    let country1Proc = SubProcManager.initCalculateCountryProc(country1, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.url);
    let country2Proc = SubProcManager.initCalculateCountryProc(country2, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.url);
    let country3Proc = SubProcManager.initCalculateCountryProc(country3, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.url);
    let country4Proc = SubProcManager.initCalculateCountryProc(country4, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.url);
    let country1Data = new Promise((resolve) => {
        country1Proc.on('message', (msg) => {
            resolve(msg);
        });
    });
    let country2Data = new Promise((resolve) => {
        country2Proc.on('message', (msg) => {
            resolve(msg);
        });
    });
    let country3Data = new Promise((resolve) => {
        country3Proc.on('message', (msg) => {
            resolve(msg);
        });
    });
    let country4Data = new Promise((resolve) => {
        country4Proc.on('message', (msg) => {
            resolve(msg);
        });
    });
    Promise.all([country1Data, country2Data, country3Data, country4Data]).then(vals => {
        process.send({ countries: countries, result: vals });
        process.exit(0);
    });
});
MultipleCountryCheckingProc.run(MultipleCountryCheckingProc.countriesList);
//# sourceMappingURL=MultipleCountryCheckingProc.js.map