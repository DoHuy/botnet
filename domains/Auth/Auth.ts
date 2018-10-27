// @ts-ignore
import*as CredentialDAO from '../../dao/CredentialDAO';
import*as crypto from 'crypto';
import*as CONFIG from '../../utils/Configs';
const Libs = require('../../commons/Libs');

function Auth(info=null) {
    this.info = info;
}

/**
 * done
 *  ham nay ma hoa thong tin truyen vao
 * @param params is content want be encode
 * @return 1 JWT
 */
function encode(valuesJSon){
    let header: any = {
        alg: 'sha256', // kieu ma hoa cua signature
        typ: 'JWT' // chi ra token nay la Json web token
    };
    header = Libs.base64EncodeUrl(JSON.stringify(header));
    let payload={};
    if(Object.keys(valuesJSon).length != CONFIG.PAY_LOAD_FIELD.length) {
        throw new Error(`${JSON.stringify(valuesJSon)} not yet enough information, you must enter in order configured`);
    }
    CONFIG.PAY_LOAD_FIELD.forEach((field)=>{
        payload[field]= valuesJSon[field];
    });

    payload = Libs.base64EncodeUrl(JSON.stringify(payload));
    let signature = `${header}.${payload}`;

    signature = crypto.createHmac('sha256', CONFIG.SECRET_KEY)
        .update(signature)
        .digest('base64');
    signature = Libs.base64EncodeUrl(signature);

    let token = `${header}.${payload}.${signature}`;
    return token;
}

/**
 *  done
 * ham giai ma json webtoken
 * @param token is Json web token
 * @return ve thong tin  can thiet
 */
function decode(token){
    token = token.split(`.`);
    return JSON.parse(Libs.base64DecodeUrl(token[token.length-2]));
}

/**
 * ham xac thuc danh tinh cua something su dung api
 * @return credential
 */
Auth.prototype.authenticate = async function () {
    let credentialDAO = new CredentialDAO();
    try{
        let credential =  await credentialDAO.findByUsernameAndPassword(this.info.username, this.info.password);
        return credential;
    } catch(e){
        throw e;
    }
}

/**
 * return 1 json web token
 * @param params danh sach cac tham so muon ma hoa bang JWT
 */
Auth.prototype.createToken = function(value){

}


Auth.prototype.renewToken = function () {


}

Auth.prototype.signUp = async function () {

}


module.exports = Auth;

// let auth  = new Auth();
// let token = auth.encode({
//     id: '1',
//     credentialname: 'huy',
//     expired: 'asdasdasdad',
//     role: 'admin'
//
// });
//
// console.log(token);
//
// // console.log(crypto.getCiphers());