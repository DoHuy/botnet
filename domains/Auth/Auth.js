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
const CredentialDAO = require("../../dao/CredentialDAO");
const DAO = require("../../dao/DAO");
const TokenDAO = require("../../dao/TokenDAO");
const crypto = require("crypto");
const CONFIG = require("../../commons/Configs");
const ThirdPartyFactory = require("../../domains/ThirdPartyService/ThirdPartyFactory");
const Constants_1 = require("../../commons/Constants");
const MonitoredWebsiteDAO = require("../../dao/MonitoredWebsiteDAO");
const Connection = require("../../commons/Connection");
const Libs = require('../../commons/Libs');
let thirdFact = new ThirdPartyFactory();
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let credentialDAO = new CredentialDAO();
let tokenDAO = new TokenDAO();
let dao = new DAO();
const redis = Connection.connectRedis();
function Auth() { }
Auth.prototype.encode = (valuesJSon) => {
    let header = {
        alg: 'sha256',
        typ: 'JWT'
    };
    header = Libs.base64EncodeUrl(JSON.stringify(header));
    let payload = {};
    if (Object.keys(valuesJSon).length != CONFIG.PAY_LOAD_FIELD.length) {
        throw new Error(`${JSON.stringify(valuesJSon)} not yet enough information, you must enter in order configured`);
    }
    CONFIG.PAY_LOAD_FIELD.forEach((field) => {
        payload[field] = valuesJSon[field];
    });
    payload = Libs.base64EncodeUrl(JSON.stringify(payload));
    let signature = `${header}.${payload}`;
    signature = crypto.createHmac('sha256', CONFIG.SECRET_KEY).update(signature).digest('base64');
    signature = Libs.base64EncodeUrl(signature);
    let token = `${header}.${payload}.${signature}`;
    return token;
};
Auth.prototype.decode = (token) => {
    token = token.split(`.`);
    return JSON.parse(Libs.base64DecodeUrl(token[token.length - 2]));
};
Auth.prototype.authenticate = function (account) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            account.password = Libs.base64EncodeUrl(account.password);
            console.log(account.password);
            let credential = yield credentialDAO.findForLogin(account.credentialname, account.password);
            if (credential != null && credential.status == 'active')
                return { flag: true, credential: credential };
            else if (credential != null && credential.status == 'inactive') {
                return { flag: false, message: "Account need be verify" };
            }
            else {
                return { flag: false, message: "Account invalid" };
            }
        }
        catch (e) {
            throw e;
        }
    });
};
Auth.prototype.authorize = (credentialId, webId) => __awaiter(this, void 0, void 0, function* () {
    let web = yield monitoredWebsiteDAO.findByCondition(`credentialid = ${credentialId} AND id=${webId}`);
    if (web == null) {
        return { flag: false, message: "permission denied" };
    }
    else {
        return { flag: true, message: "OK" };
    }
});
Auth.prototype.verifyToken = function (token) {
    return __awaiter(this, void 0, void 0, function* () {
        let currentDate = new Date();
        try {
            let rs = yield new Promise((resolve, reject) => {
                redis.get(token, (err, data) => {
                    if (err)
                        reject(err);
                    if (!data) {
                        resolve(null);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
            rs = rs == null ? null : JSON.parse(rs);
            if (rs == null) {
                return { flag: false, message: "invalid token" };
            }
            else {
                let tokenDate = new Date(rs.created);
                if (currentDate - tokenDate >= Number.parseInt(rs.expired)) {
                    yield this.renewToken(token);
                    return { flag: false, message: "token expired" };
                }
                else {
                    return { flag: true, message: "corrected" };
                }
            }
        }
        catch (e) {
            throw e;
        }
    });
};
Auth.prototype.renewToken = function (oldToken) {
    return __awaiter(this, void 0, void 0, function* () {
        let infoCredential = this.decode(oldToken);
        infoCredential.created = new Date();
        let newToken = { token: this.encode(infoCredential), created: infoCredential.created };
        try {
            yield tokenDAO.deleteById(oldToken);
            yield tokenDAO.create(newToken);
            let credential = yield credentialDAO.modifyById({ key: 'token', value: newToken.token }, infoCredential.id);
            redis.del(oldToken);
            redis.set(newToken.token, JSON.stringify({ created: newToken.created, expired: 259200000 }));
            return credential;
        }
        catch (e) {
            throw e;
        }
    });
};
Auth.prototype.createCredential = function (newCredential) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            newCredential.password = Libs.base64EncodeUrl(newCredential.password);
            let credential = yield credentialDAO.create(newCredential);
            let link = `${CONFIG.DEPLOY}/api/v1/verifyAccount/${credential.id}/${credential.credentialname}`;
            let form = `
            <h3>Link verify account:</h3>
            <a id="verify" href="${link}"><strong>${Libs.base64EncodeUrl(link)}</strong></a>         
       `;
            let info = yield thirdFact.getThirdPartyService(Constants_1.SERVICE["MAIL"]).sendMail('Outlook', { user: CONFIG.MAIL_SERVER.user, pass: CONFIG.MAIL_SERVER.pass }, { from: CONFIG.MAIL_SERVER.user, to: credential.email, subject: "XÁC THỰC LẠI TÀI KHOẢN ĐĂNG KÍ CỦA DỊCH VỤ WEBCHECKER", html: form });
            return true;
        }
        catch (e) {
            throw e;
        }
    });
};
Auth.prototype.verifyCredential = function (credential) {
    return __awaiter(this, void 0, void 0, function* () {
        let infoCredential = { id: credential.id, credentialname: credential.credentialname, created: new Date() };
        let account = yield credentialDAO.findById(credential.id);
        if (account.token == null) {
            let token = this.encode(infoCredential);
            let newToken = { token: token, created: infoCredential.created };
            try {
                let token = yield tokenDAO.create(newToken);
                yield credentialDAO.modifyById({ key: 'token', value: token.token }, credential.id);
                yield credentialDAO.modifyById({ key: 'status', value: 'active' }, credential.id);
                redis.set(newToken.token, JSON.stringify({ created: newToken.created, expired: 259200000 }));
                return true;
            }
            catch (e) {
                throw e;
            }
        }
        else {
            return false;
        }
    });
};
module.exports = Auth;
//# sourceMappingURL=Auth.js.map