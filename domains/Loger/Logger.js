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
const CONSTANT = require("../../commons/Constants");
const CredentialDAO = require("../../dao/CredentialDAO");
const CreatingLogService = require("./CreatingLogService");
const DeletingLogService = require("./DeletingLogService");
const ModifyingLogService = require("./ModifyingLogService");
const ThirdPartyFactory = require("../../domains/ThirdPartyService/ThirdPartyFactory");
const CONFIG = require("../../commons/Configs");
let factory = new ThirdPartyFactory();
let credentialDAO = new CredentialDAO();
function Logger() { }
Logger.prototype.createLog = (feature, jsonData, credentialId) => __awaiter(this, void 0, void 0, function* () {
    let logToMail;
    try {
        switch (feature) {
            case CONSTANT.LOG_FEATURES.addMonitoredWebsite:
                let creatingLogServiceM = new CreatingLogService(jsonData, credentialId);
                logToMail = yield creatingLogServiceM.logCreatingMonitoredWebsite();
                break;
            case CONSTANT.LOG_FEATURES.addAdvanceConfigMonitoredWebsite:
                let creatingLogServiceT = new CreatingLogService(jsonData, credentialId);
                logToMail = yield creatingLogServiceT.logCreatingMonitoredWebsite();
                break;
            case CONSTANT.LOG_FEATURES.modifyMonitoredWebsite:
                let modifyingLogService = new ModifyingLogService(jsonData, credentialId);
                logToMail = yield modifyingLogService.logModifyingMonitoredWebsite();
                break;
            case CONSTANT.LOG_FEATURES.removeMonitoredWebsite:
                let deletingLogServiceM = new DeletingLogService(jsonData, credentialId);
                logToMail = yield deletingLogServiceM.logDeletingMonitoredWebsite();
                break;
            case CONSTANT.LOG_FEATURES.createDNS:
                let creatingLogServiceD = new CreatingLogService(jsonData, credentialId);
                console.log(creatingLogServiceD);
                logToMail = yield creatingLogServiceD.logCreatingDNS();
                break;
            case CONSTANT.LOG_FEATURES.removeDNS:
                let deletingLogServiceD = new DeletingLogService(jsonData, credentialId);
                logToMail = yield deletingLogServiceD.logDeletingDNS();
        }
        let form = `<h2>Chức năng:  ${feature}</h2>
                    <h4><i>Đã được tài khoản của bạn thực hiện lúc:  ${new Date(logToMail.created)}</i></h4> <br>`;
        let credential = yield credentialDAO.findById(credentialId);
        factory.getThirdPartyService(CONSTANT.SERVICE['MAIL']).sendMail('Outlook', { user: CONFIG.MAIL_SERVER.user, pass: CONFIG.MAIL_SERVER.pass }, { from: CONFIG.MAIL_SERVER.user, to: credential.email,
            subject: "THÔNG BÁO CỦA DỊCH VỤ WEBCHECKER", html: form });
    }
    catch (e) {
        throw e;
    }
});
module.exports = Logger;
//# sourceMappingURL=Logger.js.map