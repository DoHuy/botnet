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
const HackedDNSDetectingService = require("../../domains/MonitorServices/HackedDNSDetectingService");
const ServiceSettingManager = require("../../domains/MonitorServices/ServiceSettingManager");
const Logger = require("../../domains/Loger/Logger");
const CONSTANT = require("../../commons/Constants");
let monitor = new Monitor(new HackedDNSDetectingService());
let manager = new ServiceSettingManager();
let logger = new Logger();
let HackedDNSDetectingCon = {};
HackedDNSDetectingCon.addConfigDNS = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let done = yield manager.turnOnHackedDNSDetecting(req.input, req.params.id);
        let jsonLogData = {
            log: CONSTANT.LOG_FEATURES.createDNS,
            created: new Date().toISOString()
        };
        yield logger.createLog(CONSTANT.LOG_FEATURES.createDNS, jsonLogData, req.credentialId);
        return res.status(200).send({ flag: true, message: "successfully" });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
HackedDNSDetectingCon.checkDNS = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let rs = yield monitor.executeDetectingService(req.jsonData);
        return res.status(200).send({ flag: true, result: rs });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
HackedDNSDetectingCon.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let done = yield manager.destroyHackedDNSDetecting(req.params.id);
        let jsonLogData = {
            log: CONSTANT.LOG_FEATURES.removeDNS,
            created: new Date().toISOString()
        };
        yield logger.createLog(CONSTANT.LOG_FEATURES.removeDNS, jsonLogData, req.credentialId);
        return res.status(200).send({ flag: true, message: "successfully" });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
module.exports = HackedDNSDetectingCon;
//# sourceMappingURL=HackedDNSDetectingCon.js.map