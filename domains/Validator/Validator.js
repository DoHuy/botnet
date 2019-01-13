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
const Auth = require("../Auth/Auth");
const CONFIG = require("../../commons/Configs");
const path = require("path");
const fs = require("fs");
const CredentialDAO = require("../../dao/CredentialDAO");
let auth = new Auth();
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let domainsDAO = new DomainsDAO();
let credentialDAO = new CredentialDAO();
function Validator() { }
Validator.prototype.validateLogin = function (rawData) {
    if (rawData.credentialname == undefined) {
        return { flag: false, message: "credentialname is not empty" };
    }
    if (rawData.password == undefined) {
        return { flag: false, message: "password is not empty" };
    }
    return { flag: true, message: "OK" };
};
Validator.prototype.validateSignUp = function (rawData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (rawData.credentialname == undefined) {
            return { flag: false, message: "credentialname is not empty" };
        }
        else {
            let credential = yield credentialDAO.findByCondition(`credentialname='${rawData.credentialname}'`);
            if (credential != null) {
                return { flag: false, message: "account existed" };
            }
        }
        if (rawData.password == undefined) {
            return { flag: false, message: "password is not empty" };
        }
        if (rawData.email == undefined) {
            return { flag: false, message: "email is not empty" };
        }
        else {
            let credential = yield credentialDAO.findByCondition(`email='${rawData.email}'`);
            if (credential != null) {
                return { flag: false, message: "This email is used" };
            }
        }
        if (rawData.phone == undefined) {
            return { flag: false, message: "phone is not empty" };
        }
        return { flag: true, message: "OK" };
    });
};
Validator.prototype.validateUrl = (url) => {
    let reg = /((http|https):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (reg.test(url) == true)
        return true;
    return false;
};
Validator.prototype.validateAddWebsite = (data) => {
    if (data.siteName == undefined)
        return false;
    if (data.url == undefined)
        return false;
    return true;
};
Validator.prototype.validateChangeConfig = (rawData) => __awaiter(this, void 0, void 0, function* () {
    if (rawData.countries == undefined) {
        return { flag: false, message: " countries are not empty" };
    }
    return { flag: true, message: "OK" };
});
Validator.prototype.validateRemoveWebsite = (webId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let webParent = yield monitoredWebsiteDAO.findById(webId);
        if (webParent == null)
            return { flag: false, message: "webId invalid" };
        if (webParent.id == webParent.parent && webParent.deleted == null) {
            return { flag: true, message: "OK" };
        }
        else {
            return { flag: false, message: "webId invalid" };
        }
    }
    catch (e) {
        throw e;
    }
});
Validator.prototype.validateAddAdvanceConfig = (rawData) => __awaiter(this, void 0, void 0, function* () {
    let isOne = 0;
    if (rawData.parent == undefined) {
        return { flag: false, message: "parent is not empty" };
    }
    else {
        let site = yield monitoredWebsiteDAO.findByCondition(`parent=${rawData.parent} AND deleted IS NULL`);
        if (site != null && site.length == 1) {
            isOne = 1;
        }
        else if (site == null) {
            isOne = 2;
        }
        else if (site.length > 1) {
            isOne = 3;
        }
    }
    if (rawData.frequently == undefined) {
        return { flag: false, message: "frequently is not empty" };
    }
    else {
        if (rawData.frequently < CONFIG.MIN_FREQUENTLY || rawData.frequently > CONFIG.MAX_FREQUENTLY) {
            return { flag: false, message: `frequently must in range ${CONFIG.MIN_FREQUENTLY} to ${CONFIG.MAX_FREQUENTLY}` };
        }
    }
    if (rawData.connectionTimeout == undefined) {
        return { flag: false, message: "connectionTimeout is not empty" };
    }
    else {
        if (rawData.connectionTimeout < CONFIG.MIN_CONNECTION_TIMEOUT || rawData.connectionTimeout > CONFIG.MAX_CONNECTION_TIMEOUT) {
            return { flag: false, message: `connectionTimeout must in range ${CONFIG.MIN_CONNECTION_TIMEOUT} to ${CONFIG.MAX_CONNECTION_TIMEOUT}` };
        }
    }
    if (rawData.countries == undefined || !Array.isArray(rawData.countries)) {
        return { flag: false, message: "countries invalid" };
    }
    else if (rawData.countries.length !== 4) {
        return { flag: false, message: "number of country must be 4" };
    }
    if (rawData.subList == undefined || !Array.isArray(rawData.subList)) {
        return { flag: false, message: "subList invalid" };
    }
    if (isOne == 1)
        return { flag: true, message: "OK" };
    else if (isOne == 3) {
        return { flag: false, message: "this api only be use once" };
    }
    else if (isOne == 2) {
        return { flag: false, message: "not existed this site" };
    }
});
Validator.prototype.validateGetNormalUpDownInfo = (webId, credentialId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let web = yield monitoredWebsiteDAO.findById(webId);
        if (web == null) {
            return { flag: false, message: `not found website has id is ${webId}` };
        }
        if (web.deleted != null) {
            return { flag: false, message: `not found website has id is ${webId}` };
        }
        if (web.credentialId != credentialId) {
            return { flag: false, message: "permisson denied" };
        }
        return { flag: true, message: "OK" };
    }
    catch (e) {
        throw e;
    }
});
Validator.prototype.validateGetCountriesInfo = (webId, credentialId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let web = yield monitoredWebsiteDAO.findById(webId);
        if (web == null) {
            return { flag: false, message: `not found website has id is ${webId}` };
        }
        if (web.deleted != null) {
            return { flag: false, message: `not found website has id is ${webId}` };
        }
        if (web.credentialId != credentialId) {
            return { flag: false, message: "permisson denied" };
        }
        return { flag: true, message: "OK" };
    }
    catch (e) {
        throw e;
    }
});
Validator.prototype.validateGetIspsInfo = (webId, credentialId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let web = yield monitoredWebsiteDAO.findById(webId);
        if (web == null) {
            return { flag: false, message: `not found website has id is ${webId}` };
        }
        if (web.deleted != null) {
            return { flag: false, message: `not found website has id is ${webId}` };
        }
        if (web.credentialId != credentialId) {
            return { flag: false, message: "permisson denied" };
        }
        return { flag: true, message: "OK" };
    }
    catch (e) {
        throw e;
    }
});
Validator.prototype.validateSearchByDate = (webId, credentialId, query) => __awaiter(this, void 0, void 0, function* () {
    let web = yield monitoredWebsiteDAO.findById(webId);
    if (web == null || web.deleted != null) {
        return { flag: false, message: `not found website has id is ${webId}`, statusCode: 404 };
    }
    let checkPermission = yield auth.authorize(credentialId, webId);
    if (checkPermission.flag == false) {
        return { flag: false, message: "permission denied", statusCode: 403 };
    }
    if (query.start != null && query.end != null) {
        return { flag: true, message: "OK" };
    }
    if (!(query.start == null && query.end == null)) {
        return { flag: false, message: "query wrong", statusCode: 400 };
    }
    return { flag: true, message: "OK" };
});
Validator.prototype.validateAddConfigDNS = (rawData, webId, credentialId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let web = yield monitoredWebsiteDAO.findById(webId);
        if (web == null || web.deleted != null) {
            return { flag: false, message: `not found website has id is ${webId}`, statusCode: 404 };
        }
        if (credentialId != web.credentialId) {
            return { flag: false, message: "permission denied", statusCode: 403 };
        }
        let pathProc = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${webId}.json`);
        let checkPath = fs.existsSync(pathProc);
        if (checkPath == true) {
            return { flag: false, message: "add config DNS fail, please add again", statusCode: 500 };
        }
        let domains = yield domainsDAO.findByCondition(`webid=${webId}`);
        if (domains !== null) {
            for (let i = 0; i < domains.length; i++) {
                if (domains[i].deleted == null) {
                    return { flag: false, message: "you only can addConfigDNS unique once", statusCode: 400 };
                }
            }
        }
        console.log("fuck");
        if (rawData.domains !== undefined && !Array.isArray(rawData.domains)) {
            return { flag: false, message: "domains must be array", statusCode: 400 };
        }
        if (rawData.ip == undefined) {
            return { flag: false, message: "ip not empty", statusCode: 400 };
        }
        if (rawData.ip != undefined && !Array.isArray(rawData.ip)) {
            return { flag: false, message: "ip must be array", statusCode: 400 };
        }
        if (rawData.expiredOfMainDNS == undefined) {
            return { flag: false, message: "expiredOfMainDNS not empty", statusCode: 400 };
        }
        return { flag: true, message: "OK" };
    }
    catch (e) {
        throw e;
    }
});
Validator.prototype.validateCheckDNS = (webId, credentialId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let web = yield monitoredWebsiteDAO.findById(webId);
        if (web == null || web.deleted != null) {
            return { flag: false, message: `not found website has id is ${webId}`, statusCode: 404 };
        }
        if (credentialId != web.credentialId) {
            return { flag: false, message: "permission denied", statusCode: 403 };
        }
        let domains = yield domainsDAO.findByCondition(`webid=${webId} order by id desc`);
        if (domains == null || domains[0].deleted !== null) {
            return { flag: false, message: "you deleted this feature or this website  is not registered", statusCode: 404 };
        }
        return { flag: true, message: "OK" };
    }
    catch (e) {
        throw e;
    }
});
Validator.prototype.validateDelete = (webId, credentialId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let web = yield monitoredWebsiteDAO.findById(webId);
        if (web == null || web.deleted != null) {
            return { flag: false, message: `not found website has id is ${webId}`, statusCode: 404 };
        }
        if (credentialId != web.credentialId) {
            return { flag: false, message: "permission denied", statusCode: 403 };
        }
        return { flag: true, message: "OK" };
    }
    catch (e) {
        throw e;
    }
});
Validator.prototype.validateSearchComparison = (webId, credentialId, query) => __awaiter(this, void 0, void 0, function* () {
    let web = yield monitoredWebsiteDAO.findById(webId);
    if (web == null || web.deleted != null) {
        return { flag: false, message: `not found website has id is ${webId}`, statusCode: 404 };
    }
    if (web.parent != web.id) {
        return { flag: false, message: `This site must be parent site`, statusCode: 403 };
    }
    let checkPermission = yield auth.authorize(credentialId, webId);
    if (checkPermission.flag == false) {
        return { flag: false, message: "permission denied", statusCode: 403 };
    }
    if (query.start == null && query.end != null || query.start != null && query.end == null) {
        return { flag: false, message: "query wrong", statusCode: 400 };
    }
    return { flag: true, message: "OK" };
});
Validator.prototype.validateGetMonitoredWebSite = (webId, credentialId) => __awaiter(this, void 0, void 0, function* () {
    let web = yield monitoredWebsiteDAO.findById(webId);
    if (web == null || web.deleted != null) {
        return { flag: false, message: `not found website has id is ${webId}`, statusCode: 404 };
    }
    if (web.parent != webId) {
        return { flag: false, message: `This website is not parent`, statusCode: 400 };
    }
    let checkPermission = yield auth.authorize(credentialId, webId);
    if (checkPermission.flag == false) {
        return { flag: false, message: "permission denied", statusCode: 403 };
    }
    return { flag: true, message: "ok" };
});
Validator.prototype.validateGetAllParentMonitoredWebSite = (credentialId) => {
    return { flag: true, message: "OK" };
};
Validator.prototype.validateGetDomainsOfWebsite = (webId, credentialId) => __awaiter(this, void 0, void 0, function* () {
    let web = yield monitoredWebsiteDAO.findById(webId);
    if (web == null || web.deleted != null) {
        return { flag: false, message: `not found website has id is ${webId}`, statusCode: 404 };
    }
    if (web.parent != webId) {
        return { flag: false, message: `This website is not parent`, statusCode: 400 };
    }
    let checkPermission = yield auth.authorize(credentialId, webId);
    if (checkPermission.flag == false) {
        return { flag: false, message: "permission denied", statusCode: 403 };
    }
    return { flag: true, message: "ok" };
});
Validator.prototype.validateResetPassword = (rawData) => {
    let regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;
    if (rawData.credentialname == undefined) {
        return { flag: false, message: "credentialname not empty" };
    }
    if (regex.test(rawData.email) == true) {
        return { flag: true, message: "ok" };
    }
    else {
        return { flag: false, message: "email invalid" };
    }
};
Validator.prototype.validateChangePassword = (rawData) => {
    if (rawData.newPassword == undefined || rawData.againPassword == undefined) {
        return { flag: false, message: "not empty" };
    }
    if (rawData.newPassword != rawData.againPassword) {
        return { flag: false, message: "not match" };
    }
    return { flag: true, message: "ok" };
};
Validator.prototype.validateRegisterCoinMinerDetecting = (webId, credentialId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let web = yield monitoredWebsiteDAO.findById(webId);
        if (web == null || web.deleted != null) {
            return { flag: false, message: `not found website has id is ${webId}`, statusCode: 404 };
        }
        let checkPermission = yield auth.authorize(credentialId, webId);
        if (checkPermission.flag == false) {
            return { flag: false, message: "permission denied", statusCode: 403 };
        }
        if (web.id == web.parent) {
            let domains = yield domainsDAO.findByCondition(`webid=${webId} AND deleted IS NULL`);
            if (domains == null) {
                return { flag: false, message: "CONDITION: you must register detect DNS before", statusCode: 400 };
            }
        }
        else {
            let domains = yield domainsDAO.findByCondition(`webid=${web.parent} AND deleted IS NULL`);
            if (domains == null) {
                return { flag: false, message: "CONDITION: you must register detect DNS before", statusCode: 400 };
            }
        }
        let pathChecked = path.join(__dirname, '..', '..', 'tmp', 'coinMinerTmp', `${webId}.txt`);
        let bool = fs.existsSync(pathChecked);
        if (bool == true) {
            return { flag: false, message: "this api only use once", statusCode: 400 };
        }
        return { flage: true, message: "OK" };
    }
    catch (e) {
        throw e;
    }
});
Validator.prototype.validateDetectCoinMiner = (webId, credentialId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let web = yield monitoredWebsiteDAO.findById(webId);
        if (web == null || web.deleted != null) {
            return { flag: false, message: `not found website has id is ${webId}`, statusCode: 404 };
        }
        let checkPermission = yield auth.authorize(credentialId, webId);
        if (checkPermission.flag == false) {
            return { flag: false, message: "permission denied", statusCode: 403 };
        }
        let pathCheck = path.join(__dirname, '..', '..', 'data', 'store', 'filesDb');
        let contentOfDir = fs.readdirSync(pathCheck);
        let flag = false;
        contentOfDir.forEach(e => {
            if (e == `coinminer_${webId}.json`) {
                flag = true;
            }
        });
        if (flag == false) {
            return { flag: false, message: "not found", statusCode: 404 };
        }
        return { flag: true, message: "Ok" };
    }
    catch (e) {
        throw e;
    }
});
Validator.prototype.validateDeleteCoinMinerDetecting = (webId, credentialId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let web = yield monitoredWebsiteDAO.findById(webId);
        if (web == null || web.deleted != null) {
            return { flag: false, message: `not found website has id is ${webId}`, statusCode: 404 };
        }
        let checkPermission = yield auth.authorize(credentialId, webId);
        if (checkPermission.flag == false) {
            return { flag: false, message: "permission denied", statusCode: 403 };
        }
        return { flag: true, message: "Ok" };
    }
    catch (e) {
        throw e;
    }
});
module.exports = Validator;
//# sourceMappingURL=Validator.js.map