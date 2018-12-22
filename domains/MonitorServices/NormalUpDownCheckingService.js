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
const util = require("util");
const ServiceInterface = require("./ServiceIneterface");
const MonitoredWebssiteDAO = require("../../dao/MonitoredWebsiteDAO");
const ResponseStateDAO = require("../../dao/ResponseStateDAO");
const monitoredWebsiteDAO = new MonitoredWebssiteDAO();
const responseStateDAO = new ResponseStateDAO();
function NormalUpDownCheckingService() {
    ServiceInterface.call(this);
}
util.inherits(NormalUpDownCheckingService, ServiceInterface);
function adaptData(webId, limit = null, start = null, end = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let rs = { siteName: "", url: "", responseTime: {}, notification: {} };
        let condition;
        if ((start != null && end != null) && limit == null) {
            condition = `webid=${webId} AND created between '${start}' AND '${end}' ORDER BY id DESC`;
        }
        else if (limit != null && !(start != null && end != null)) {
            condition = `webid=${webId}  ORDER BY id DESC limit ${limit}`;
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
NormalUpDownCheckingService.prototype.doOperation = (jsonData) => __awaiter(this, void 0, void 0, function* () {
    let result = { siteName: "", url: "", upDown: {} };
    let webId = jsonData.webId;
    try {
        let web = yield adaptData(webId, jsonData.limit, jsonData.start, jsonData.end);
        if (web == null)
            return null;
        let siteName = web.siteName;
        let url = web.url;
        let response = web.responseTime;
        let notification = web.notification;
        let upResp = 0;
        let downResp = 0;
        for (let i in response) {
            result[i] = { response: {}, notification: {} };
            if (response[i].multipleCountries !== undefined) {
                delete response[i].multipleCountries;
                delete response[i].multipleIsp;
                delete notification[i].multipleCountries;
                delete notification[i].multipleIsp;
            }
            result[i].response = response[i];
            result[i].notification = notification[i];
            if (notification[i].level == 'error') {
                downResp++;
            }
            else {
                upResp++;
            }
        }
        result.upDown.totalUp = upResp;
        result.upDown.totalDown = downResp;
        result.siteName = siteName;
        result.url = url;
        return result;
    }
    catch (e) {
        throw e;
    }
});
module.exports = NormalUpDownCheckingService;
//# sourceMappingURL=NormalUpDownCheckingService.js.map