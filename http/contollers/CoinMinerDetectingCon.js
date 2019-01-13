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
const Monitor = require("../../domains/MonitorServices/Monitor");
const CoinMinerDetecting = require("../../domains/MonitorServices/CoinMinerDetectingService");
const ServiceSettingManager = require("../../domains/MonitorServices/ServiceSettingManager");
const CONSTANT = require("../../commons/Constants");
const Loger = require("../../domains/Loger/Logger");
let coinMinerDetecting = new Monitor(new CoinMinerDetecting());
let serviceSettingManager = new ServiceSettingManager();
let logger = new Loger();
let CoinMinerDetectingCon = {};
CoinMinerDetectingCon.detect = (req, res) => __awaiter(this, void 0, void 0, function* () {
    req.jsonData = {};
    req.jsonData.webId = req.params.id;
    try {
        let rs = yield coinMinerDetecting.executeDetectingService(req.jsonData);
        return res.status(200).send({ flag: true, result: JSON.parse(rs) });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
CoinMinerDetectingCon.registerService = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield serviceSettingManager.initCoinminerDetecting(req.params.id);
        let jsonLogData = {
            log: CONSTANT.LOG_FEATURES.registerDetectCoinMiner,
            created: new Date().toISOString()
        };
        yield logger.createLog(CONSTANT.LOG_FEATURES.registerDetectCoinMiner, jsonLogData, req.credentialId);
        return res.status(200).send({ flag: true, message: "register successfully" });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
CoinMinerDetectingCon.deleteService = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield serviceSettingManager.destroyCoinminerDetecting(req.params.id);
        let jsonLogData = {
            log: CONSTANT.LOG_FEATURES.removeDetectCoinMiner,
            created: new Date().toISOString()
        };
        yield logger.createLog(CONSTANT.LOG_FEATURES.removeDetectCoinMiner, jsonLogData, req.credentialId);
        return res.status(200).send({ flag: true, message: "destroy successfully" });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: "This service is deleted before" });
    }
});
module.exports = CoinMinerDetectingCon;
//# sourceMappingURL=CoinMinerDetectingCon.js.map