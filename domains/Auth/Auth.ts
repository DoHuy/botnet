// @ts-ignore
import*as CredentialDAO from '../../dao/CredentialDAO';
// @ts-ignore
import*as DAO from "../../dao/DAO";
// @ts-ignore
import*as TokenDAO from "../../dao/TokenDAO";
import*as crypto from 'crypto';
import*as CONFIG from '../../commons/Configs';
import*as ThirdPartyFactory from '../../domains/ThirdPartyService/ThirdPartyFactory';
import {SERVICE} from "../../commons/Constants";
// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
import {EXPIRED_TOKEN} from "../../commons/Configs";
import *as Connection from '../../commons/Connection';
import*as util from 'util';

const Libs = require('../../commons/Libs');
// @ts-ignore
let thirdFact = new ThirdPartyFactory();
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let credentialDAO = new CredentialDAO();
let tokenDAO = new TokenDAO();
// @ts-ignore
let dao = new DAO();
// @ts-ignore
const redis: any = Connection.connectRedis();

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
    try{
        //decode base64 password
        account.password = Libs.base64EncodeUrl(account.password);
        console.log(account.password);
        //
        let credential =  await credentialDAO.findForLogin(account.credentialname, account.password);
        if(credential != null && credential.status == 'active') return {flag: true, credential: credential};
        else if (credential != null && credential.status == 'inactive'){
            return {flag: false, message: "Account need be verify"};
        }
        else {
            return {flag: false, message: "Account invalid"};
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
    let web: any = await monitoredWebsiteDAO.findByCondition(`credentialid = ${credentialId} AND id=${webId}`);
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
    try{
    // kiem tra trong cache
    let rs:any = await new Promise((resolve, reject)=>{
        redis.get(token, (err, data)=>{
            if(err) reject(err);
            if(!data){
                resolve(null);
            }
            else{
                resolve(data);
            }
        });
    });
        // console.log(typeof rs);
        rs = rs==null?null:JSON.parse(rs);
        //
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
    try{
        // await tokenDAO.transactionBegin();
        await tokenDAO.deleteById(oldToken);
        await tokenDAO.create(newToken);
        let credential = await credentialDAO.modifyById({key: 'token', value: newToken.token}, infoCredential.id);
        // await tokenDAO.transactionCommit();
        // xoa token cu trong cache, add new token to  cache
        redis.del(oldToken);
        redis.set(newToken.token, JSON.stringify({created: newToken.created, expired:259200000}));
        //
        return credential;
    }catch (e) {
        // await tokenDAO.transactionRollback();
        throw e;
    }

};

/**
 * done
 * tao thong tin xac thuc cua nguoi su dung, khi nguoi su dung dang ki
 * @return true ne thanh cong
 */
Auth.prototype.createCredential = async function (newCredential) {
    try{
       // base64 password
       newCredential.password = Libs.base64EncodeUrl(newCredential.password);
       //
       let credential = await credentialDAO.create(newCredential);
       let link = `${CONFIG.DEPLOY}/api/v1/verifyAccount/${credential.id}/${credential.credentialname}`;
       let form = `
            <h3>Link verify account:</h3>
            <a id="verify" href="${link}"><strong>${Libs.base64EncodeUrl(link)}</strong></a>         
       `;
        // console.log(form);
        let info =  await thirdFact.getThirdPartyService(SERVICE["MAIL"]).sendMail(
            'Outlook', {user: CONFIG.MAIL_SERVER.user, pass: CONFIG.MAIL_SERVER.pass},
            {from: CONFIG.MAIL_SERVER.user, to: credential.email, subject: "XÁC THỰC LẠI TÀI KHOẢN ĐĂNG KÍ CỦA DỊCH VỤ WEBCHECKER", html: form}
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
    let infoCredential = {id: credential.id, credentialname: credential.credentialname, created: new Date()};
    let account = await credentialDAO.findById(credential.id);
    if(account.token == null){
        // @ts-ignore
        let token = this.encode(infoCredential);
        let newToken = {token: token, created: infoCredential.created};
        try{
            // await tokenDAO.transactionBegin();
            let token = await tokenDAO.create(newToken);
            await credentialDAO.modifyById({key: 'token', value: token.token}, credential.id);
            await credentialDAO.modifyById({key: 'status', value: 'active'}, credential.id);
            // await tokenDAO.transactionCommit();
            // save createdToken to cache
            redis.set(newToken.token, JSON.stringify({created: newToken.created, expired:259200000}));
            //
            return true;
        } catch(e){
            // await tokenDAO.transactionRollback();
            throw e;
        }

    }
    else{
        return false;
    }

};

module.exports = Auth;