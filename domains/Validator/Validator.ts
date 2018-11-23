// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
import*as Auth from '../Auth/Auth';
import*as CONFIG from '../../commons/Configs';

// @ts-ignore
let auth = new Auth();
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
function Validator() {}

Validator.prototype.validateLogin = function (rawData){
    if(rawData.credentialname == undefined){
        return {flag: false, message: "thiếu credentialname"};
    }
    if(rawData.password == undefined){
        return {flag: false, message: "thiếu password"};
    }

    return {flag: true, message: "OK"};
}

Validator.prototype.validateSignUp = function (rawData){
    if(rawData.credentialname == undefined){
         return {flag: false, message: "thiếu credentialname"};
    }
    if(rawData.password == undefined){
        return {flag: false, message: "thiếu password"};
    }
    if(rawData.email == undefined){
        return {flag: false, message: "thiếu email"};
    }
    if(rawData.phone == undefined){
        return {flag: false, message: "thiếu phone"};
    }

    return {flag: true, message: "OK"};
}


Validator.prototype.validateUrl = (url)=>{
    let reg = /((http|https):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if(reg.test(url) == true) return true;
    return false;
};

Validator.prototype.validateAddWebsite = (data)=>{
    if(data.siteName == undefined) return false;
    if(data.url == undefined) return false;
    return true;
};

Validator.prototype.validateChangeConfig = async (rawData)=>{
    for(let key in rawData){
        if(key != 'parent' && rawData[key] != undefined){
            return {flag: true, message: "OK"};
        }
        else {
            return {flag: false, message: "please, enter something u want update"};
        }
    }
};

Validator.prototype.validateRemoveWebsite = async (webId)=>{
    if(1) {
        try{
            let web = await monitoredWebsiteDAO.findById(webId);
            if(web.id == web.parent && web.deleted == null) return true;
            else return false;
        }catch (e) {
            throw e;
        }

    }
    else return false;

};

Validator.prototype.validateAddAdvanceConfig = (rawData)=>{
    if(rawData.parent == undefined) {
        return {flag: false, message: "parent is not empty"};
    }
    if(rawData.frequently == undefined){
        return {flag: false, message: "frequently is not empty"};
    }
    else{
        if(rawData.frequently < CONFIG.MIN_FREQUENTLY || rawData.frequently > CONFIG.MAX_FREQUENTLY){
            return {flag: false, message: `frequently must in range ${CONFIG.MIN_FREQUENTLY} to ${CONFIG.MAX_FREQUENTLY}` };
        }
    }
    if(rawData.connectionTimeout == undefined){
        return {flag: false, message: "connectionTimeout is not empty"};
    }
    else{
        if(rawData.connectionTimeout < CONFIG.MIN_CONNECTION_TIMEOUT || rawData.connectionTimeout > CONFIG.MAX_CONNECTION_TIMEOUT){
            return {flag: false, message: `connectionTimeout must in range ${CONFIG.MIN_CONNECTION_TIMEOUT} to ${CONFIG.MAX_CONNECTION_TIMEOUT}`};
        }
    }

    if(rawData.countries == undefined || !Array.isArray(rawData.countries)){
        return {flag: false, message: "countries invalid"};
    }
    else if(rawData.countries.length !==4){
        return {flag: false, message: "number of country must be 4"};
    }
    if(rawData.subList == undefined || ! Array.isArray(rawData.subList)){
        return {flag: false, message: "subList invalid"};
    }
    return {flag: true, message: "OK"};

};

Validator.prototype.validateToken = async (token)=>{
   try{
       let checked = await auth.verifyToken(token);
       if(checked.flag == true) return true;
       else {
           return checked;
       }
   }catch (e) {
       throw e;
   }
};

module.exports = Validator;

// let validator = new Validator();
// console.log(validator.validateUrl("asdadasdad"));