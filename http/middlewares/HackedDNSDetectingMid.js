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
const Auth = require("../../domains/Auth/Auth");
const Lib = require("../../commons/Libs");
const MonitoredWebsiteDAO = require("../../dao/MonitoredWebsiteDAO");
const DomainsDAO = require("../../dao/DomainsDAO");
let validator = new Validator();
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let domainsDAO = new DomainsDAO();
let auth = new Auth();
let HackedDNSDetectingMid = {};
const FREQUENTLY = 3 * 60 * 1000;
HackedDNSDetectingMid.beforeAddConfigDNS = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        req.input = { domains: [], ip: null, frequently: null };
        try {
            let ok = yield validator.validateAddConfigDNS(req.body, req.params.id, req.credentialId);
            if (ok.flag == false) {
                return res.status(ok.statusCode).send({ flag: false, message: ok.message });
            }
            else {
                let web = yield monitoredWebsiteDAO.findById(req.params.id);
                let defaultDomain = web.url.match(/^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/igm)[0];
                defaultDomain = defaultDomain.split('/')[defaultDomain.split('/').length - 1];
                req.input.domains.push({ domain: defaultDomain, expired: req.body.expiredOfMainDNS });
                if (req.body.domains != undefined) {
                    for (let i = 0; i < req.body.domains.length; i++) {
                        req.input.domains.push(req.body.domains[i]);
                    }
                }
                req.input.ip = req.body.ip;
                req.input.frequently = req.body.frequently != undefined ? req.body.frequently : FREQUENTLY;
                next();
            }
        }
        catch (e) {
            return res.status(500).send({ flag: false, message: e.message });
        }
    });
};
HackedDNSDetectingMid.beforeCheckDNS = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let done = yield validator.validateCheckDNS(req.params.id, req.credentialId);
            if (done.flag == false) {
                return res.status(done.statusCode).send({ flag: true, message: done.message });
            }
            else {
                let query = Lib.getQueryUrl(req.url, 'limit');
                req.jsonData = {
                    webId: req.params.id,
                    limit: query.limit
                };
                next();
            }
        }
        catch (e) {
            return res.status(500).send({ flag: true, message: e.message });
        }
    });
};
HackedDNSDetectingMid.beforeDelete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let done = yield validator.validateDelete(req.params.id, req.credentialId);
        if (done.flag == false) {
            return res.status(done.statusCode).send({ flag: false, message: done.message });
        }
        else {
            next();
        }
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
module.exports = HackedDNSDetectingMid;
//# sourceMappingURL=HackedDNSDetectingMid.js.map