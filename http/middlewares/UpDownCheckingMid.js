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
const Lib = require("../../commons/Libs");
let validator = new Validator();
let UpDownCheckingMid = {};
UpDownCheckingMid.beforeGetNormalUpDownInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let check = yield validator.validateGetNormalUpDownInfo(req.params.id, req.credentialId);
        if (check.flag == true) {
            let query = Lib.getQueryUrl(req.url, 'limit', 'start', 'end');
            req.jsonData = {
                webId: req.params.id,
                limit: query.limit,
                start: query.start,
                end: query.end
            };
            next();
        }
        else {
            return res.status(400).send({ flag: false, message: check.message });
        }
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
UpDownCheckingMid.beforeGetCountriesInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let check = yield validator.validateGetCountriesInfo(req.params.id, req.credentialId);
        if (check.flag == true) {
            let query = Lib.getQueryUrl(req.url, 'limit', 'start', 'end');
            req.jsonData = {
                webId: req.params.id,
                limit: query.limit,
                start: query.start,
                end: query.end
            };
            next();
        }
        else {
            return res.status(400).send({ flag: false, message: check.message });
        }
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
UpDownCheckingMid.beforeGetIspsInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let check = yield validator.validateGetIspsInfo(req.params.id, req.credentialId);
        if (check.flag == true) {
            let query = Lib.getQueryUrl(req.url, 'limit', 'start', 'end');
            req.jsonData = {
                webId: req.params.id,
                limit: query.limit,
                start: query.start,
                end: query.end
            };
            next();
        }
        else {
            return res.status(400).send({ flag: false, message: check.message });
        }
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
module.exports = UpDownCheckingMid;
//# sourceMappingURL=UpDownCheckingMid.js.map