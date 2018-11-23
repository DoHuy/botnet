// @ts-ignore
import*as CredentialDAO from '../../dao/CredentialDAO';
// @ts-ignore
import*as DAO from "../../dao/DAO";
// @ts-ignore
import*as TokenDAO from "../../dao/TokenDAO";
import*as crypto from 'crypto';
import*as CONFIG from '../../commons/Configs';
import*as ThirdPartyFactory from '../../domains/ThirdPartyService/ThirdPartyFactory';
import {SERVICE_MAIL} from "../../commons/Constants";
// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
import {EXPIRED_TOKEN} from "../../commons/Configs";

const Libs = require('../../commons/Libs');
// @ts-ignore
let thirdFact = new ThirdPartyFactory();
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();

function Auth() {}

/**
 * done
 * @valuesJson ={id, credentialname, created}
 *  ham nay ma hoa thong tin truyen vao
 * @return 1 JWT
 * @param valuesJSon
 */
Auth.prototype.encode = (valuesJSon: any)=>{
    let header: any = {
        alg: 'sha256', // kieu ma hoa cua signature
        typ: 'JWT' // chi ra token nay la Json web token
    };
    header = Libs.base64EncodeUrl(JSON.stringify(header));
    let payload={};
    // // fix valueJson
    // valuesJSon.created = valuesJSon.created.toISOString();
    // //
    if(Object.keys(valuesJSon).length != CONFIG.PAY_LOAD_FIELD.length) {
        throw new Error(`${JSON.stringify(valuesJSon)} not yet enough information, you must enter in order configured`);
    }
    CONFIG.PAY_LOAD_FIELD.forEach((field)=>{
        payload[field]= valuesJSon[field];
    });

    payload = Libs.base64EncodeUrl(JSON.stringify(payload));
    let signature = `${header}.${payload}`;

    signature = crypto.createHmac('sha256', CONFIG.SECRET_KEY).update(signature).digest('base64')
    signature = Libs.base64EncodeUrl(signature);

    let token = `${header}.${payload}.${signature}`;
    return token;
};

/**
 *  done
 * ham giai ma json webtoken
 * @param token is Json web token
 * @return ve thong tin  can thiet
 */
Auth.prototype.decode = (token)=>{
    token = token.split(`.`);
    return JSON.parse(Libs.base64DecodeUrl(token[token.length-2]));
};

/**
 * done
 * ham xac thuc danh tinh cua something su dung api
 * @return credential or null neu khong tim thay
 */
Auth.prototype.authenticate = async function (account) {
    let credentialDAO = new CredentialDAO();
    try{
        let credential =  await credentialDAO.findForLogin(account.credentialname, account.password);
        if(credential != null && credential.status == 'active') return {flag: true, credential: credential};
        else if (credential != null && credential.status == 'inactive'){
            return {flag: false, message: "Account need be verify"};
        }
        else {
            return {flag: false, message: "username or password invalid"};
        }
    } catch(e){
        throw e;
    }
};

/**
 *  kiem tra xem nguoi nay co quyen thao tac tren website nay hay ko
 * @param credentialId
 * @param webId
 */
Auth.prototype.authorize = async (credentialId, webId)=>{
    let web: any = monitoredWebsiteDAO.findByCondition(`credentialid = ${credentialId} AND id=${webId}`);
    if(web == null){
        return {flag: false, message: "permission denied"};
    }
    else{
        return {flag: true, message: "OK"};
    }
};

/**
 * ham nay check token xem qua han hay chua
 * neu qua han renew token moi
 * nguoc lai tra ve true
 * return true false
 * @param token
 */
Auth.prototype.verifyToken = async function(token){
    let currentDate: any = new Date();
    let tokenDAO = new TokenDAO();
    try{
    let rs = await tokenDAO.findById(token);
    if(rs == null){
        return {flag: false, message: "invalid token"};
    }
    else{
        let tokenDate: any = new Date(rs.created);

        // qua han thi renewtoken
        if(currentDate-tokenDate >= Number.parseInt(rs.expired)){
            await this.renewToken(token);
            return {flag: false, message: "token expired"};
        }
        else{
            return {flag: true, message: "corrected"};
        }
    }
    }catch (e) {
        throw e;
    }
};


/**
 * done
 * @return 1 newtoken
 * @param oldtoken
 */
Auth.prototype.renewToken = async function (oldToken) {
    let infoCredential   = this.decode(oldToken);
    infoCredential.created = new Date();
    let newToken      = {token: this.encode(infoCredential), created: infoCredential.created};
    let credentialDAO = new CredentialDAO();
    let tokenDAO      = new TokenDAO();
    try{
        await tokenDAO.transactionBegin();
        await tokenDAO.deleteById(oldToken);
        await tokenDAO.create(newToken);
        let credential = await credentialDAO.modifyById({key: 'token', value: newToken.token}, infoCredential.id);
        await tokenDAO.transactionCommit();
        return credential;
    }catch (e) {
        await tokenDAO.transactionRollback();
        throw e;
    }

};

/**
 * done
 * tao thong tin xac thuc cua nguoi su dung, khi nguoi su dung dang ki
 * @return true ne thanh cong
 */
Auth.prototype.createCredential = async function (newCredential) {
    // @ts-ignore
    let credentialDAO = new CredentialDAO();
    try{
       let credential = await credentialDAO.create(newCredential);
       let link = `http://${CONFIG.SERVER.HOST_SERVER}:${CONFIG.SERVER.SERVER_PORT}/verifyAccount/${credential.id}/${credential.credentialname}`;
       let form = `
            <h1>Link verify account:</h1> <br>
            <a id="verify" href="${link}"><strong>${Libs.base64EncodeUrl(link)}</strong></a>            
       `;
        // console.log(form);
        let info =  await thirdFact.getThirdPartyService(SERVICE_MAIL["VERIFY_MAIL"]).sendMail(
            'Outlook', {user: 'huy.dv146328@sis.hust.edu.vn', pass: 'anhhuy12'},
            {from: 'huy.dv146328@sis.hust.edu.vn', to: credential.email, subject: "XÁC THỰC LẠI TÀI KHOẢN ĐĂNG KÍ CỦA DỊCH VỤ WEBCHECKER", html: form}
        );
        return true;
    }catch (e) {
        throw e;
    }
};

/**
 * done
 * @param id cua credential da dang ki su dung api
 * @return false neu khong ton tai hoac da ton tai token, tra ve true, neu ton tai thi tao new token update status la active
 */
Auth.prototype.verifyCredential = async function(credential){
    let credentialDAO = new CredentialDAO();
    let tokenDAO = new TokenDAO();
    let infoCredential = {id: credential.id, credentialname: credential.credentialname, created: new Date()};
    let account = await credentialDAO.findById(credential.id);
    if(account.token == null){
        // @ts-ignore
        let token = this.encode(infoCredential);
        let newToken = {token: token, created: infoCredential.created};
        try{
            await tokenDAO.transactionBegin();
            let token = await tokenDAO.create(newToken);
            await credentialDAO.modifyById({key: 'token', value: token.token}, credential.id);
            await credentialDAO.modifyById({key: 'status', value: 'active'}, credential.id);
            await tokenDAO.transactionCommit();
            return true;
        } catch(e){
            await tokenDAO.transactionRollback();
            throw e;
        }

    }
    else{
        return false;
    }

};

module.exports = Auth;