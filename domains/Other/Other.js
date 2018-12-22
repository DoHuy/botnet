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
const MonitoredWebsiteDAO = require("../../dao/MonitoredWebsiteDAO");
const DomainsDAO = require("../../dao/DomainsDAO");
const monitoredWebsiteDAO = new MonitoredWebsiteDAO();
const domainsDAO = new DomainsDAO();
function Other() { }
Other.prototype.getMonitoredWebsite = (id) => __awaiter(this, void 0, void 0, function* () {
    let kq = { parent: {}, sub: [] };
    try {
        let webs = yield monitoredWebsiteDAO.findByCondition(`parent=${id} AND deleted IS NULL`);
        if (webs == null)
            return null;
        webs.forEach(element => {
            if (element.parent == element.id) {
                kq.parent.id = element.id;
                kq.parent.siteName = element.siteName;
                kq.parent.url = element.url;
                kq.parent.frequently = element.frequently;
                kq.parent.connectionTimeout = element.connectionTimeout;
            }
            else {
                let tmp = { id: "", siteName: "", url: "", frequently: "", connectionTimeout: "" };
                tmp.id = element.id;
                tmp.siteName = element.siteName;
                tmp.url = element.url;
                tmp.frequently = element.frequently;
                tmp.connectionTimeout = element.connectionTimeout;
                kq.sub.push(tmp);
            }
        });
        return kq;
    }
    catch (e) {
        throw e;
    }
});
Other.prototype.getAllParentMonitoredWebsite = (credentialId) => __awaiter(this, void 0, void 0, function* () {
    let list = [];
    try {
        let webs = yield monitoredWebsiteDAO.findByCondition(`credentialid=${credentialId} AND deleted IS NULL`);
        if (webs == null)
            return null;
        webs.forEach(element => {
            if (element.parent == element.id) {
                let tmp = { id: "", siteName: "", url: "", frequently: "", connectionTimeout: "" };
                tmp.id = element.id;
                tmp.siteName = element.siteName;
                tmp.url = element.url;
                tmp.frequently = element.frequently;
                tmp.connectionTimeout = element.connectionTimeout;
                list.push(tmp);
            }
        });
        return list;
    }
    catch (e) {
        throw e;
    }
});
Other.prototype.getDomainsOfWebsite = (webId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let domains = yield domainsDAO.findByCondition(`webid=${webId} AND deleted IS NULL`);
        if (domains == null)
            return null;
        domains.forEach(e => {
            delete e.webId;
            delete e.deleted;
            delete e.modified;
        });
        return domains;
    }
    catch (e) {
        throw e;
    }
});
module.exports = Other;
//# sourceMappingURL=Other.js.map