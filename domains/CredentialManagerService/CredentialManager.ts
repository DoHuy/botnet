import* as Lib from "../../commons/Libs";
// @ts-ignore
import* as CredentialDAO from "../../dao/CredentialDAO";
import* as ThirdPartyFactory from '../ThirdPartyService/ThirdPartyFactory';
import {SERVICE} from "../../commons/Constants";
import * as CONFIG from "../../commons/Configs";
// @ts-ignore
const thirdPartyFactory = new ThirdPartyFactory();
const credentialDAO = new CredentialDAO();
function CredentialManager() {}


/**
 * ham nay tao mot password moi cho credential tuong ung sau do gui ve mail ma khach hang da dang ki su dung
 * @param credentialname
 * @param email
 */
CredentialManager.prototype.resetPassword = async (email, credentialname)=>{
    let credential;
    // @ts-ignore
    let newPassword = Lib.generateRandomString(9);
    try{
        credential = await credentialDAO.findByCondition(`email = '${email}' and credentialname = '${credentialname}'`);
        if(credential == null){
            return {flag: false, message: "account not match registered email"};
        }
        // base64 password
        // @ts-ignore
        let newPassBase64 = Lib.base64EncodeUrl(newPassword);
        //
        await credentialDAO.modifyById({key: 'password', value: newPassBase64}, credential[0].id);

        //send password to customer by email
        let form = `<h3>Kí danh: ${credential[0].credentialname}</h3>
                    <h3>Mật khẩu mới: ${newPassword}</h3>`;
        await thirdPartyFactory.getThirdPartyService(SERVICE["MAIL"]).sendMail(
            'Outlook', {user: CONFIG.MAIL_SERVER.user, pass: CONFIG.MAIL_SERVER.pass},
            {from: CONFIG.MAIL_SERVER.user, to: credential[0].email, subject: "DỊCH VỤ WEBCHECKER CẤP LẠI PASSWORD TÀI KHOẢN",
                html: form}
        );
        return {flag: true, message: "successfully"};
    }catch (e) {
        throw e;
    }

};


CredentialManager.prototype.changePassword = async (newPassword, credentialId) =>{
    // @ts-ignore
    newPassword = Lib.base64EncodeUrl(newPassword);
    try{
        await credentialDAO.modifyById({key: 'password', value: newPassword}, credentialId);
        return {flag: true, message: "successfully"};
    }catch (e) {
        throw e;
    }
};

module.exports = CredentialManager;