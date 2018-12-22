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
const validator = new Validator();
let OtherMid = {};
OtherMid.beforeGetMonitoredWebSite = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let check = yield validator.validateGetMonitoredWebSite(req.params.id, req.credentialId);
        if (check.flag == false) {
            return res.status(check.statusCode).send({ flag: false, message: check.message });
        }
        else {
            next();
        }
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
OtherMid.beforeGetAllParentMonitoredWebSite = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let check = yield validator.validateGetAllParentMonitoredWebSite(req.credentialId);
        if (check.flag == false) {
            return res.status(check.statusCode).send({ flag: false, message: check.message });
        }
        else {
            next();
        }
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
OtherMid.beforeGetDomainsOfWebsite = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let check = yield validator.validateGetDomainsOfWebsite(req.params.id, req.credentialId);
        if (check.flag == false) {
            return res.status(check.statusCode).send({ flag: false, message: check.message });
        }
        else {
            next();
        }
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
module.exports = OtherMid;
//# sourceMappingURL=OtherMid.js.map