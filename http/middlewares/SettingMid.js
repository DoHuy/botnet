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
const Validator = require("../../domains/Validator/Validator");
const CONFIG = require("../../commons/Configs");
const Auth = require("../../domains/Auth/Auth");
const MonitoredWebsiteDAO = require("../../dao/MonitoredWebsiteDAO");
let validator = new Validator();
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let auth = new Auth();
let SettingMid = {};
SettingMid.beforeAddWebsite = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let checkWebsite = validator.validateAddWebsite(req.body);
        if (checkWebsite) {
            let checkUrl = validator.validateUrl(req.body.url);
            if (checkUrl) {
                req.input = req.body;
                req.input.frequently = CONFIG.FREQUENTLY_DEFAULT;
                req.input.connectionTimeout = CONFIG.DEFAULT_TIMEOUT;
                next();
            }
            else {
                return res.status(400).send({ flag: false, message: `${req.body.url} invalid` });
            }
        }
        else {
            return res.status(400).send({ flag: false, message: "siteName field or url field is not empty" });
        }
    });
};
SettingMid.beforeAddAdvanceConfig = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let subList = req.body.subList;
        req.body.parent = req.params.id;
        let web = yield monitoredWebsiteDAO.findById(req.params.id);
        if (web != null && web.deleted != null) {
            return res.status(404).send({ flag: false, message: `not found id ${req.params.id}` });
        }
        let checkConfig = yield validator.validateAddAdvanceConfig(req.body);
        if (checkConfig.flag == true) {
            subList.forEach((e) => {
                let check = validator.validateUrl(e.url);
                if (!check)
                    return res.status(400).send({ flag: false, message: `${e} invalid` });
            });
            let checkPer = yield auth.authorize(req.credentialId, req.params.id);
            if (checkPer.flag == false) {
                return res.status(403).send({ flag: false, message: "Permission denied" });
            }
            else {
                req.config = req.body;
                next();
            }
        }
        if (checkConfig.flag == false) {
            return res.status(400).send({ flag: false, message: checkConfig.message });
        }
    });
};
SettingMid.beforeChangeConfig = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        req.input = {};
        let fields = [{ key: 'siteName', flag: false }, { key: 'frequently', flag: false },
            { key: 'connectionTimeout', flag: false }, { key: 'countries', flag: false }];
        let web = yield monitoredWebsiteDAO.findById(id);
        if (web.deleted != null) {
            return res.status(404).send({ flag: false, message: `not found id ${id}` });
        }
        let checkPer = yield auth.authorize(req.credentialId, id);
        if (checkPer.flag == false) {
            return res.status(403).send({ flag: false, message: "Permission denied" });
        }
        else {
            let fieldsInBody = Object.keys(req.body);
            let check = yield validator.validateChangeConfig(req.body);
            if (check.flag == true) {
                fields.forEach(e => {
                    fieldsInBody.forEach(i => {
                        if (e.key == i) {
                            e.flag = true;
                        }
                    });
                });
                fields.forEach(e => {
                    if (e.flag == true) {
                        req.input[e.key] = req.body[e.key];
                    }
                });
                req.input.parent = id;
                next();
            }
            else {
                return res.status(400).send({ flag: false, message: check.message });
            }
        }
    });
};
SettingMid.afterChangeConfig = (req, res) => {
    let updatedList = req.updatedList;
    let rs = [];
    let parent = {};
    updatedList.forEach(e => {
        if (e.id != e.parent) {
            rs.push({ siteName: e.siteName, id: e.id, frequently: e.frequently });
        }
        else {
            parent.siteName = e.siteName;
            parent.id = e.id;
            parent.frequently = e.frequently;
        }
    });
    return res.status(200).send({ flag: true, parent: parent, subList: rs });
};
SettingMid.beforeRemoveWebsite = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let check = yield validator.validateRemoveWebsite(req.params.id);
        if (check.flag == true) {
            let checkPer = yield auth.authorize(req.credentialId, req.params.id);
            if (checkPer.flag == false) {
                return res.status(403).send({ flag: false, message: "Permission denied" });
            }
            else
                next();
        }
        else {
            return res.status(400).send({ flag: false, message: check.message });
        }
    });
};
SettingMid.afterAddAdvanceConfig = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let subSiteList = req.subSiteList;
        let rs = [];
        subSiteList.forEach((e) => {
            rs.push({ siteName: e.siteName, id: e.id, frequently: e.frequently });
        });
        return res.status(200).send({ flag: true, subSiteIdList: rs });
    });
};
module.exports = SettingMid;
//# sourceMappingURL=SettingMid.js.map