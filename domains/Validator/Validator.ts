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
        return {flag: false, message: "credentialname is not empty"};
    }
    if(rawData.password == undefined){
        return {flag: false, message: "password is not empty"};
    }

    return {flag: true, message: "OK"};
}

Validator.prototype.validateSignUp = function (rawData){
    if(rawData.credentialname == undefined){
         return {flag: false, message: "credentialname is not empty"};
    }
    if(rawData.password == undefined){
        return {flag: false, message: "password is not empty"};
    }
    if(rawData.email == undefined){
        return {flag: false, message: "email is not empty"};
    }
    if(rawData.phone == undefined){
        return {flag: false, message: "phone is not empty"};
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
    if(rawData.countries == undefined){
        return {flag: false, message: " countries are not empty"};
    }
    return {flag: true, message: "OK"};
};

Validator.prototype.validateRemoveWebsite = async (webId)=>{

    try{
        let webParent: any = await monitoredWebsiteDAO.findById(webId);
        if(webParent.id == webParent.parent && webParent.deleted == null) {
            return {flag: true, message: "OK"};
        }
        else{
            return {flag: false, message: "webId invalid"};
        }
    }catch (e) {
        throw e;
    }
};

Validator.prototype.validateAddAdvanceConfig = async (rawData)=>{
    let isOne=0;
    if(rawData.parent == undefined) {
        return {flag: false, message: "parent is not empty"};
    }
    else{ // neu co parent kiem tra xem neu api nay da duoc goi thi ko cho goi cac lan khac
       let site: any = await monitoredWebsiteDAO.findByCondition(`parent=${rawData.parent} AND deleted IS NULL`);

       if (site != null && site.length == 1){
           isOne=1;
       }
       else if(site == null){
           isOne=2;
       }
       else if(site.length > 1){
           isOne=3;
       }
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
    if(isOne==1)return {flag: true, message: "OK"};
    else if(isOne == 3){
        return {flag: false, message: "this api only be use once"};
    }
    else if(isOne==2){
        return {flag: false, message: "not existed this site"};
    }

};

Validator.prototype.validateGetNormalUpDownInfo = async (webId, credentialId)=>{

    try{
        let web: any = await monitoredWebsiteDAO.findById(webId);

        // check existed
        if(web == null){
            return {flag: false, message: `not found website has id is ${webId}`};
        }
        // check existed
        if(web.deleted != null){
            return {flag: false, message: `not found website has id is ${webId}`};
        }

        //check permission
        if(web.credentialId != credentialId){
            return {flag: false, message: "permisson denied"};
        }
        return {flag: true, message: "OK"};
    }catch (e) {
        throw e;
    }

};

Validator.prototype.validateGetCountriesInfo = async (webId, credentialId)=>{
    try{
        let web: any = await monitoredWebsiteDAO.findById(webId);

        // check existed
        if(web == null){
            return {flag: false, message: `not found website has id is ${webId}`};
        }
        // check existed
        if(web.deleted != null){
            return {flag: false, message: `not found website has id is ${webId}`};
        }

        //check permission
        if(web.credentialId != credentialId){
            return {flag: false, message: "permisson denied"};
        }
        return {flag: true, message: "OK"};
    }catch (e) {
        throw e;
    }
};

Validator.prototype.validateGetIspsInfo = async (webId, credentialId)=>{
    try{
        let web: any = await monitoredWebsiteDAO.findById(webId);

        // check existed
        if(web == null){
            return {flag: false, message: `not found website has id is ${webId}`};
        }
        // check existed
        if(web.deleted != null){
            return {flag: false, message: `not found website has id is ${webId}`};
        }

        //check permission
        if(web.credentialId != credentialId){
            return {flag: false, message: "permisson denied"};
        }
        return {flag: true, message: "OK"};
    }catch (e) {
        throw e;
    }
};

// query la object
Validator.prototype.validateSearchByDate = async (webId, credentialId, query)=>{
    // check exist
    let web: any = await monitoredWebsiteDAO.findById(webId);
    if(web == null || web.deleted != null){
        return {flag: false, message: `not found website has id is ${webId}`, statusCode: 404};
    }
    // check permission
    let checkPermission = await auth.authorize(credentialId, webId);
    if(checkPermission.flag == false){
        return {flag: false, message: "permission denied", statusCode: 403};
    }

    // validate
    if(query.start == null || query.end == null){
        return {flag: false, message: "query wrong", statusCode: 400}
    }

    return {flag: true, message:"OK"};
};

module.exports = Validator;

// let validator = new Validator();
// console.log(validator.validateUrl("asdadasdad"));