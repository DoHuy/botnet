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
const Configor = require("../../domains/MonitorServices/ServiceSettingManager");
const CONSTANT = require("../../commons/Constants");
const Logger = require("../../domains/Loger/Logger");
const MonitoredWebsiteDAO = require("../../dao/MonitoredWebsiteDAO");
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
const configor = new Configor();
const logger = new Logger();
let SettingCon = {};
SettingCon.addWebSite = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let site;
        try {
            site = yield configor.createWebsite(req.input, req.credentialId);
            let jsonLogData = {
                log: CONSTANT.LOG_FEATURES.addMonitoredWebsite,
                created: new Date().toISOString()
            };
            yield logger.createLog(CONSTANT.LOG_FEATURES.addMonitoredWebsite, jsonLogData, req.credentialId);
            return res.status(200).send({
                flag: true,
                webId: site.id,
                frequently: site.frequently
            });
        }
        catch (e) {
            return res.status(500).send({ flag: false, message: e.message });
        }
    });
};
SettingCon.changeConfig = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let updatedList;
        try {
            updatedList = yield configor.modifyConfigWebsite(req.input, req.credentialId);
            let jsonLogData = {
                log: CONSTANT.LOG_FEATURES.modifyMonitoredWebsite,
                created: new Date().toISOString()
            };
            yield logger.createLog(CONSTANT.LOG_FEATURES.modifyMonitoredWebsite, jsonLogData, req.credentialId);
            req.updatedList = updatedList;
            next();
        }
        catch (e) {
            return res.status(500).send({ flag: false, message: e.message });
        }
    });
};
SettingCon.addAdvanceConfig = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let list;
        try {
            list = yield configor.addAdvanceConfigWebsite(req.config, req.credentialId);
            let jsonLogData = {
                log: CONSTANT.LOG_FEATURES.addAdvanceConfigMonitoredWebsite,
                created: new Date().toISOString()
            };
            yield logger.createLog(CONSTANT.LOG_FEATURES.addAdvanceConfigMonitoredWebsite, jsonLogData, req.credentialId);
            req.subSiteList = list;
            next();
        }
        catch (e) {
            return res.status(500).send({ flag: false, message: e.message });
        }
    });
};
SettingCon.removeWebsite = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let check;
        let check2;
        try {
            let web = yield monitoredWebsiteDAO.findByCondition(`parent=${req.params.id}`);
            check = yield configor.removeWebsite(req.params.id);
            web.forEach((e) => __awaiter(this, void 0, void 0, function* () {
                yield configor.destroyHackedDNSDetecting(e.id);
                yield configor.destroyCoinminerDetecting(e.id);
            }));
            let jsonLogData = {
                log: CONSTANT.LOG_FEATURES.removeMonitoredWebsite,
                created: new Date().toISOString()
            };
            yield logger.createLog(CONSTANT.LOG_FEATURES.removeMonitoredWebsite, jsonLogData, req.credentialId);
            return res.status(200).send({ flag: true, message: "remove successfully" });
        }
        catch (e) {
            return res.status(500).send({ flag: false, message: e.message });
        }
    });
};
module.exports = SettingCon;
//# sourceMappingURL=SettingCon.js.map