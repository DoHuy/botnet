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
const DetectingServiceInterface = require("./DetectingServiceInterface");
const util = require("util");
const DomainsDAO = require("../../dao/DomainsDAO");
const DomainsStateDAO = require("../../dao/DomainsStateDAO");
const domainsDAO = new DomainsDAO();
const domainsStateDAO = new DomainsStateDAO();
function HackedDNSDetectingService() {
    DetectingServiceInterface.call(this);
}
util.inherits(HackedDNSDetectingService, DetectingServiceInterface);
HackedDNSDetectingService.prototype.doDetection = (jsonData) => __awaiter(this, void 0, void 0, function* () {
    try {
        let domain = yield domainsDAO.findByCondition(`webid=${jsonData.webId} order by id desc`);
        let condition;
        if (jsonData.limit == null) {
            condition = `domainsid= ${domain[0].id} order by id DESC`;
        }
        else {
            condition = `domainsid= ${domain[0].id} order by id DESC limit ${jsonData.limit}`;
        }
        let domainState = yield domainsStateDAO.findByCondition(condition);
        if (domainState !== null) {
            domainState.forEach(e => {
                delete e.id;
                delete e.domainsId;
            });
        }
        return domainState;
    }
    catch (e) {
        throw e;
    }
});
module.exports = HackedDNSDetectingService;
//# sourceMappingURL=HackedDNSDetectingService.js.map