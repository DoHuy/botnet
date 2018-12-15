import*as CONSTANT from '../../commons/Constants';
// @ts-ignore
import*as CredentialDAO from '../../dao/CredentialDAO';
// @ts-ignore
import*as CreatingLogService from './CreatingLogService';
// @ts-ignore
import*as DeletingLogService from './DeletingLogService';
// @ts-ignore
import*as ModifyingLogService from './ModifyingLogService';
import*as ThirdPartyFactory from '../../domains/ThirdPartyService/ThirdPartyFactory';
import * as CONFIG from "../../commons/Configs";
// @ts-ignore
let factory = new ThirdPartyFactory();
let credentialDAO = new CredentialDAO();

function Logger() {}
/**
 * ham nay tao log xong roi gui mail toi credential vua thuc hien hanh vi
 */
Logger.prototype.createLog = async (feature, jsonData, credentialId)=>{
    let logToMail;
    try{
        switch (feature) {
            case CONSTANT.LOG_FEATURES.addMonitoredWebsite:
                // @ts-ignore
                let creatingLogServiceM = new CreatingLogService(jsonData, credentialId);
                logToMail = await creatingLogServiceM.logCreatingMonitoredWebsite();
                break;
            case CONSTANT.LOG_FEATURES.modifyMonitoredWebsite:
                // @ts-ignore
                let modifyingLogService = new ModifyingLogService(jsonData, credentialId);
                logToMail = await modifyingLogService.logModifyingMonitoredWebsite();
                break;
            case CONSTANT.LOG_FEATURES.removeMonitoredWebsite:
                // @ts-ignore
                let deletingLogServiceM = new DeletingLogService(jsonData, credentialId);
                logToMail = await deletingLogServiceM.logDeletingMonitoredWebsite();
                break;
            case CONSTANT.LOG_FEATURES.createDNS:
                // @ts-ignore
                let creatingLogServiceD = new CreatingLogService(jsonData, credentialId);
                logToMail = await creatingLogServiceD.logCreatingDNS();
                break;
            case CONSTANT.LOG_FEATURES.removeDNS:
                // @ts-ignore
                let deletingLogServiceD = new DeletingLogService(jsonData, credentialId);
                logToMail = await deletingLogServiceD.logDeletingDNS();
        }

        // send to mail credential
        let form = `<h1>Tính năng:  ${feature}</h1> <br>
                    <h2>Thời gian thực hiện:  ${new Date(logToMail.created).toDateString()}</h2> <br>`;

        let credential: any = await credentialDAO.findById(credentialId);
        factory.getThirdPartyService(CONSTANT.SERVICE['MAIL']).sendMail(
            'Outlook', {user: CONFIG.MAIL_SERVER.user, pass: CONFIG.MAIL_SERVER.pass},
            {from: CONFIG.MAIL_SERVER.user, to: credential.email,
             subject: "THÔNG BÁO CỦA DỊCH VỤ WEBCHECKER", html: form}
        );
        //
    }catch (e) {
        throw e;
    }
};

module.exports = Logger;