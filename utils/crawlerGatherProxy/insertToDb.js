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
const fs = require('fs');
const ProxyDAO = require('../../dao/ProxyDAO');
const fetch = require('node-fetch');
let proxyDAO = new ProxyDAO();
(() => __awaiter(this, void 0, void 0, function* () {
    let data = yield new Promise((resolve, reject) => {
        fs.readFile(`listproxy.json`, 'utf8', (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
    data = JSON.parse(data);
    console.log(data);
    let count = 0;
    let proxyList = [];
    for (let i in data) {
        for (let proxy of data[i]) {
            let objTmp;
            objTmp = proxy;
            objTmp.details = null;
            try {
                let rs = yield proxyDAO.create(objTmp);
                console.log(rs);
                console.log("da insert duoc ", count++);
            }
            catch (e) {
                throw e;
            }
        }
    }
    process.exit();
}))();
//# sourceMappingURL=insertToDb.js.map