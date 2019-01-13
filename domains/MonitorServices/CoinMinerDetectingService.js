"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DetectingServiceInterface = require("./DetectingServiceInterface");
const util = require("util");
const fs = require("fs");
const path = require("path");
function CoinMinerDetectingService() {
    DetectingServiceInterface.call(this);
}
util.inherits(CoinMinerDetectingService, DetectingServiceInterface);
CoinMinerDetectingService.prototype.doDetection = (jsonData) => {
    try {
        let fileData = path.join(__dirname, '..', '..', 'data', 'store', 'filesDb', `coinminer_${jsonData.webId}.json`);
        return new Promise(((resolve, reject) => {
            fs.readFile(fileData, 'utf8', (err, data) => {
                if (err)
                    reject(err);
                resolve(data);
            });
        }));
    }
    catch (e) {
        throw e;
    }
};
module.exports = CoinMinerDetectingService;
//# sourceMappingURL=CoinMinerDetectingService.js.map