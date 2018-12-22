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
let validator = new Validator();
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let auth = new Auth();
let SearchingMid = {};
SearchingMid.beforeSearchByDate = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        req.jsonData = { webId: null, start: null, end: null };
        let query = Lib.getQueryUrl(req.url, 'start', 'end');
        let check = yield validator.validateSearchByDate(req.params.id, req.credentialId, query);
        if (check.flag == true) {
            req.jsonData.webId = req.params.id;
            req.jsonData.start = query.start;
            req.jsonData.end = query.end;
            next();
        }
        else {
            return res.status(check.statusCode).send({ flag: false, message: check.message });
        }
    });
};
SearchingMid.beforeSearchComparison = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    req.jsonData = { webId: null, start: null, end: null };
    let query = Lib.getQueryUrl(req.url, 'start', 'end');
    let check = yield validator.validateSearchComparison(req.params.id, req.credentialId, query);
    if (check.flag == true) {
        req.jsonData.webId = req.params.id;
        req.jsonData.start = query.start;
        req.jsonData.end = query.end;
        next();
    }
    else {
        return res.status(check.statusCode).send({ flag: false, message: check.message });
    }
});
module.exports = SearchingMid;
//# sourceMappingURL=SearchingMid.js.map