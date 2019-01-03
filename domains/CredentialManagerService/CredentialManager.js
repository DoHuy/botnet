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
const Lib = require("../../commons/Libs");
const CredentialDAO = require("../../dao/CredentialDAO");
const ThirdPartyFactory = require("../ThirdPartyService/ThirdPartyFactory");
const Constants_1 = require("../../commons/Constants");
const CONFIG = require("../../commons/Configs");
const thirdPartyFactory = new ThirdPartyFactory();
const credentialDAO = new CredentialDAO();
function CredentialManager() { }
CredentialManager.prototype.resetPassword = (email, credentialname) => __awaiter(this, void 0, void 0, function* () {
    let credential;
    let newPassword = Lib.generateRandomString(9);
    try {
        credential = yield credentialDAO.findByCondition(`email = '${email}' and credentialname = '${credentialname}'`);
        if (credential == null) {
            return { flag: false, message: "account not match registered email" };
        }
        let newPassBase64 = Lib.base64EncodeUrl(newPassword);
        yield credentialDAO.modifyById({ key: 'password', value: newPassBase64 }, credential[0].id);
        let form = `<h3>Kí danh: ${credential[0].credentialname}</h3>
                    <h3>Mật khẩu mới: ${newPassword}</h3>`;
        yield thirdPartyFactory.getThirdPartyService(Constants_1.SERVICE["MAIL"]).sendMail('Outlook', { user: CONFIG.MAIL_SERVER.user, pass: CONFIG.MAIL_SERVER.pass }, { from: CONFIG.MAIL_SERVER.user, to: credential[0].email, subject: "DỊCH VỤ WEBCHECKER CẤP LẠI PASSWORD TÀI KHOẢN",
            html: form });
        return { flag: true, message: "successfully" };
    }
    catch (e) {
        throw e;
    }
});
CredentialManager.prototype.changePassword = (newPassword, credentialId) => __awaiter(this, void 0, void 0, function* () {
    newPassword = Lib.base64EncodeUrl(newPassword);
    try {
        yield credentialDAO.modifyById({ key: 'password', value: newPassword }, credentialId);
        return { flag: true, message: "successfully" };
    }
    catch (e) {
        throw e;
    }
});
module.exports = CredentialManager;
//# sourceMappingURL=CredentialManager.js.map