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
const ServiceInterface = require("./ServiceIneterface");
const MonitoredWebsiteDAO = require("../../dao/MonitoredWebsiteDAO");
const ResponseStateDAO = require("../../dao/ResponseStateDAO");
const util = require("util");
const monitoredWebsiteDAO = new MonitoredWebsiteDAO();
const responseStateDAO = new ResponseStateDAO();
function MultipleCountryUpDownCheckingService() {
    ServiceInterface.call(this);
}
util.inherits(MultipleCountryUpDownCheckingService, ServiceInterface);
function adaptData(webId, limit = null, start = null, end = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let rs = { siteName: "", url: "", responseTime: {}, notification: {} };
        let condition;
        if ((start != null && end != null) && limit == null) {
            condition = `webid=${webId} AND created between '${start}' AND '${end}' ORDER BY id DESC`;
        }
        else if (limit != null && !(start != null && end != null)) {
            condition = `webid=${webId} ORDER BY id DESC limit ${limit}`;
        }
        else {
            condition = `webid=${webId} ORDER BY id DESC`;
        }
        try {
            let site = yield monitoredWebsiteDAO.findById(webId);
            let respState = yield responseStateDAO.findByCondition(condition);
            if (respState == null)
                return null;
            respState.forEach(e => {
                rs.responseTime[e.created] = e.response;
                rs.notification[e.created] = e.notification;
            });
            rs.siteName = site.siteName;
            rs.url = site.url;
        }
        catch (e) {
            throw e;
        }
        return rs;
    });
}
MultipleCountryUpDownCheckingService.prototype.doOperation = (jsonData) => __awaiter(this, void 0, void 0, function* () {
    let result = { siteName: "", url: "" };
    let webId = jsonData.webId;
    let web = yield adaptData(webId, jsonData.limit, jsonData.start, jsonData.end);
    if (web == null)
        return null;
    let response = web.responseTime;
    let notification = web.notification;
    let siteName = web.siteName;
    let url = web.url;
    for (let i in response) {
        if (response[i].multipleCountries != undefined) {
            result[i] = { response: [], notification: [], maxResponse: 0, minResponse: 0, averageResponse: 0 };
            let maxResp = Number.MIN_SAFE_INTEGER;
            let minResp = Number.MAX_SAFE_INTEGER;
            let totalResp = 0;
            let map = new Map(response[i].multipleCountries);
            for (let el of map) {
                maxResp = maxResp > el[1]["ResponseTime"] ? maxResp : el[1]["ResponseTime"];
                minResp = minResp < el[1]["ResponseTime"] ? minResp : el[1]["ResponseTime"];
                totalResp += el[1]["ResponseTime"];
            }
            result[i].response = response[i].multipleCountries;
            result[i].notification = notification[i].multipleCountries;
            result[i].maxResponse = maxResp;
            result[i].minResponse = minResp;
            result[i].averageResponse = totalResp / 4;
        }
    }
    result.siteName = siteName;
    result.url = url;
    return result;
});
module.exports = MultipleCountryUpDownCheckingService;
//# sourceMappingURL=MultipleCountryUpDownCheckingService.js.map