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
const ServiceSettingManagerInterface = require("./ServiceSettingManagerInterface");
const util = require("util");
const SubProcManager = require("../../bin/BackgroundDomainsProcesses/SubProcManager");
const MonitoredWebsiteDAO = require("../../dao/MonitoredWebsiteDAO");
const DomainsDAO = require("../../dao/DomainsDAO");
const path = require('path');
const fs = require('fs');
const writeFile = util.promisify(fs.writeFile);
const CMD = ["normal", "advance", "dns", "deface"];
let monitoredWebSiteDAO = new MonitoredWebsiteDAO();
let domainsDAO = new DomainsDAO();
function ServiceSettingManager() {
    ServiceSettingManagerInterface.call(this);
}
util.inherits(ServiceSettingManager, ServiceSettingManagerInterface);
ServiceSettingManager.prototype.createWebsite = function (input, credentialId) {
    return __awaiter(this, void 0, void 0, function* () {
        input.credentialId = credentialId;
        input.created = new Date();
        try {
            let rs = yield monitoredWebSiteDAO.create(input);
            let rsUpdate = yield monitoredWebSiteDAO.modifyById(rs.id, ['parent', 'modified'], [rs.id, rs.created]);
            let data = {
                cmd: CMD[0],
                data: {
                    frequently: rs.frequently,
                    connectionTimeout: rs.connectionTimeout,
                    webId: rs.id,
                    url: rs.url,
                    parentId: rs.id
                }
            };
            data = JSON.stringify(data);
            let pathProc = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${rs.id}.json`);
            fs.writeFileSync(pathProc, data, 'utf8');
            return rs;
        }
        catch (e) {
            throw e;
        }
    });
};
ServiceSettingManager.prototype.addAdvanceConfigWebsite = function (config, credentialId) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = [];
        let keys = ['frequently', 'connectiontimeout', 'modified'];
        let values = [config.frequently, config.connectionTimeout, new Date().toISOString()];
        try {
            let rs = yield monitoredWebSiteDAO.modifyById(config.parent, keys, values);
            for (let i = 0; i < config.subList.length; i++) {
                let sub = config.subList[i];
                try {
                    let tmp = yield monitoredWebSiteDAO.create({
                        siteName: sub.siteName,
                        url: sub.url,
                        connectionTimeout: config.connectionTimeout,
                        frequently: config.frequently,
                        parent: config.parent,
                        created: new Date(),
                        credentialId: credentialId
                    });
                    result.push(tmp);
                    SubProcManager.killAllNormalProc(config.parent);
                    let pathParentProc = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${rs.id}.json`);
                    let parentData = {
                        cmd: CMD[1],
                        data: {
                            frequently: rs.frequently,
                            connectionTimeout: rs.connectionTimeout,
                            webId: rs.id,
                            url: rs.url,
                            countries: config.countries,
                            parentId: rs.id
                        }
                    };
                    parentData = JSON.stringify(parentData);
                    fs.writeFileSync(pathParentProc, parentData, 'utf8');
                    result.forEach((e) => __awaiter(this, void 0, void 0, function* () {
                        let subPath = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${e.id}.json`);
                        let subData = {
                            cmd: CMD[1],
                            data: {
                                frequently: e.frequently,
                                connectionTimeout: e.connectionTimeout,
                                webId: e.id,
                                url: e.url,
                                countries: config.countries,
                                parentId: rs.id
                            }
                        };
                        subData = JSON.stringify(subData);
                        fs.writeFileSync(subPath, subData, 'utf8');
                    }));
                }
                catch (e) {
                    console.log("huy test: ", e);
                    throw e;
                }
            }
            return result;
        }
        catch (e) {
            throw e;
        }
    });
};
ServiceSettingManager.prototype.modifyConfigWebsite = function (input, credentialId) {
    return __awaiter(this, void 0, void 0, function* () {
        let countries = input.countries;
        delete input.countries;
        let modifiedKeys = Object.keys(input);
        try {
            let list = yield monitoredWebSiteDAO.findByCondition(`parent=${input.parent} AND credentialid = ${credentialId}`);
            if (modifiedKeys.length == 0) {
                SubProcManager.killAllAdvanceProc(input.parent);
                for (let i = 0; i < list.length; i++) {
                    let procPath = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${list[i].id}.json`);
                    let data = {
                        cmd: CMD[1],
                        data: {
                            frequently: list[i].frequently,
                            connectionTimeout: list[i].connectionTimeout,
                            webId: list[i].id,
                            url: list[i].url,
                            countries: countries,
                            parentId: list[i].parent
                        }
                    };
                    data = JSON.stringify(data);
                    fs.writeFileSync(procPath, data, 'utf8');
                }
                return list;
            }
            else {
                let updatedList = [];
                let modifiedValues = [];
                modifiedKeys.forEach(e => {
                    modifiedValues.push(input[e]);
                });
                modifiedKeys = modifiedKeys.map(e => e.toLowerCase());
                for (let i = 0; i < list.length; i++) {
                    let tmp = yield monitoredWebSiteDAO.modifyById(list[i].id, modifiedKeys, modifiedValues);
                    updatedList.push(tmp);
                    modifiedValues.pop();
                }
                SubProcManager.killAllAdvanceProc(input.parent);
                for (let i = 0; i < updatedList.length; i++) {
                    let procPath = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${updatedList[i].id}.json`);
                    let data = {
                        cmd: CMD[1],
                        data: {
                            frequently: updatedList[i].frequently,
                            connectionTimeout: updatedList[i].connectionTimeout,
                            webId: updatedList[i].id,
                            url: updatedList[i].url,
                            countries: countries,
                            parentId: updatedList[i].parent
                        }
                    };
                    data = JSON.stringify(data);
                    fs.writeFileSync(procPath, data, 'utf8');
                }
                return updatedList;
            }
        }
        catch (e) {
            throw e;
        }
    });
};
ServiceSettingManager.prototype.removeWebsite = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            yield monitoredWebSiteDAO.deleteById(id);
            let sub = yield monitoredWebSiteDAO.findByCondition(` parent = ${id}`);
            for (let i = 0; i < sub.length; i++) {
                yield monitoredWebSiteDAO.deleteById(sub[i].id);
            }
            SubProcManager.killAllProc(id);
            return true;
        }
        catch (e) {
            throw e;
        }
    });
};
ServiceSettingManager.prototype.turnOnHackedDNSDetecting = (input, webId) => __awaiter(this, void 0, void 0, function* () {
    let domains;
    try {
        domains = yield domainsDAO.create({ domains: input.domains, ip: input.ip, created: new Date().toISOString(), webId: webId });
        let content = {
            cmd: CMD[2],
            data: {
                frequently: input.frequently,
                domainsList: JSON.stringify(input.domains),
                ip: JSON.stringify(input.ip),
                domainsId: domains.id
            }
        };
        let procPath = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${webId}.json`);
        yield writeFile(procPath, JSON.stringify(content), 'utf8');
        return domains;
    }
    catch (e) {
        throw e;
    }
});
ServiceSettingManager.prototype.destroyHackedDNSDetecting = (webId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let domains = yield domainsDAO.findByCondition(`webid=${webId} AND deleted IS NULL order by id desc`);
        if (domains != null) {
            let rs = yield domainsDAO.deleteById(domains[0].id);
            SubProcManager.destroyHackedDNSDetectingProcess(domains[0].id);
        }
        return true;
    }
    catch (e) {
        throw e;
    }
});
module.exports = ServiceSettingManager;
//# sourceMappingURL=ServiceSettingManager.js.map