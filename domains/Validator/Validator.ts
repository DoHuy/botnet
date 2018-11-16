// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
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
    if(reg.test(url)) return true;
    return false;
}

Validator.prototype.validateChangeConfig = async (config, webId)=>{
    if(Object.keys(config).length != 0 && Object.keys(config).length<=2) {
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
module.exports = Validator;