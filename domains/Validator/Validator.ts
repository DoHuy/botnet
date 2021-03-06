// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
// @ts-ignore
import*as DomainsDAO from '../../dao/DomainsDAO';
import*as Auth from '../Auth/Auth';
import*as CONFIG from '../../commons/Configs';
import*as path from 'path';
import*as fs from 'fs';
// @ts-ignore
import*as CredentialDAO from '../../dao/CredentialDAO';
// import*as path from 'path';
// @ts-ignore
let auth = new Auth();
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let domainsDAO = new DomainsDAO();
let credentialDAO = new CredentialDAO();
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

Validator.prototype.validateSignUp = async function (rawData){

    // check chi ton tai 1 account
    //
    if(rawData.credentialname == undefined){
         return {flag: false, message: "credentialname is not empty"};
    }
    else{
        let credential = await credentialDAO.findByCondition(`credentialname='${rawData.credentialname}'`);
        if(credential != null){
            return {flag: false, message: "account existed"};
        }
    }
    if(rawData.password == undefined){
        return {flag: false, message: "password is not empty"};
    }
    if(rawData.email == undefined){

        return {flag: false, message: "email is not empty"};
    }
    else{
        //check email only unique
        let credential = await credentialDAO.findByCondition(`email='${rawData.email}'`);
        if(credential != null){
            return {flag: false, message: "This email is used"};
        }
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
        if(webParent == null) return {flag: false, message: "webId invalid"};
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
    // console.log(query);
    if(query.start != null && query.end != null){
        return {flag: true, message:"OK"};
    }
    if(!(query.start == null && query.end == null)){
        return {flag: false, message: "query wrong", statusCode: 400}
    }

    return {flag: true, message:"OK"};
};

Validator.prototype.validateAddConfigDNS = async (rawData, webId, credentialId)=>{
    //check exist
    try{
        let web: any = await monitoredWebsiteDAO.findById(webId);
        if(web == null || web.deleted !=null){
            return {flag: false, message: `not found website has id is ${webId}`, statusCode: 404};
        }
        //check permission
        if(credentialId != web.credentialId){
            return {flag: false, message:"permission denied", statusCode: 403};
        }

        // check tricks
        let pathProc = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${webId}.json`);
        let checkPath = fs.existsSync(pathProc);
        if(checkPath == true){
            return {flag: false, message: "add config DNS fail, please add again", statusCode: 500};
        }

        // check only use once
        let domains: any = await domainsDAO.findByCondition(`webid=${webId}`);

        if(domains !== null){
            for(let i=0 ; i<domains.length ; i++){
                if(domains[i].deleted == null){
                    return {flag: false, message: "you only can addConfigDNS unique once", statusCode: 400};
                }
            }
        }
        //
        console.log("fuck");
        //check logic domains
        if(rawData.domains !== undefined && !Array.isArray(rawData.domains)){
            return {flag: false, message:"domains must be array", statusCode: 400};
        }
        if(rawData.ip == undefined){
            return {flag: false, message:"ip not empty", statusCode: 400};
        }

        if(rawData.ip != undefined && !Array.isArray(rawData.ip)){
            return {flag: false, message:"ip must be array", statusCode: 400};
        }
        if(rawData.expiredOfMainDNS == undefined){
            return {flag: false, message: "expiredOfMainDNS not empty", statusCode: 400}
        }

        return {flag: true, message: "OK"};
    }catch (e) {
        throw e;
    }
};

Validator.prototype.validateCheckDNS = async (webId, credentialId)=>{
  try{
      let web: any = await monitoredWebsiteDAO.findById(webId);
      if(web == null || web.deleted !=null){
          return {flag: false, message: `not found website has id is ${webId}`, statusCode: 404};
      }
      //check permission
      if(credentialId != web.credentialId){
          return {flag: false, message:"permission denied", statusCode: 403};
      }

      // check exist domains
      let domains: any = await domainsDAO.findByCondition(`webid=${webId} order by id desc`);
      // console.log(domains[0]);
      if(domains == null || domains[0].deleted !== null){
          return {flag: false, message: "you deleted this feature or this website  is not registered", statusCode: 404};
      }
      //

      return {flag:  true, message: "OK"};

  }  catch (e) {
      throw e;
  }
};

Validator.prototype.validateDelete = async (webId, credentialId)=>{
    try{
        let web: any = await monitoredWebsiteDAO.findById(webId);
        if(web == null || web.deleted !=null){
            return {flag: false, message: `not found website has id is ${webId}`, statusCode: 404};
        }
        //check permission
        if(credentialId != web.credentialId){
            return {flag: false, message:"permission denied", statusCode: 403};
        }

        return {flag:  true, message: "OK"};

    }  catch (e) {
        throw e;
    }
};


// query la object
Validator.prototype.validateSearchComparison = async (webId, credentialId, query)=>{
    // check exist
    let web: any = await monitoredWebsiteDAO.findById(webId);
    if(web == null || web.deleted != null){
        return {flag: false, message: `not found website has id is ${webId}`, statusCode: 404};
    }
    // check permission
    if(web.parent != web.id){
        return {flag: false, message: `This site must be parent site`, statusCode: 403};
    }
    let checkPermission = await auth.authorize(credentialId, webId);
    if(checkPermission.flag == false){
        return {flag: false, message: "permission denied", statusCode: 403};
    }

    // validate
    if(query.start == null && query.end != null || query.start != null && query.end == null){
        return {flag: false, message: "query wrong", statusCode: 400}
    }

    return {flag: true, message:"OK"};
};

Validator.prototype.validateGetMonitoredWebSite = async (webId, credentialId)=>{
    // check exist
    let web: any = await monitoredWebsiteDAO.findById(webId);
    if(web == null || web.deleted != null){
        return {flag: false, message: `not found website has id is ${webId}`, statusCode: 404};
    }
    // check parent
    if(web.parent != webId){
        return {flag: false, message: `This website is not parent`, statusCode: 400};
    }
    // check permission
    let checkPermission = await auth.authorize(credentialId, webId);
    if(checkPermission.flag == false){
        return {flag: false, message: "permission denied", statusCode: 403};
    }

    return {flag: true, message: "ok"};
};

Validator.prototype.validateGetAllParentMonitoredWebSite = (credentialId)=>{
    return {flag: true, message: "OK"};
};

Validator.prototype.validateGetDomainsOfWebsite = async (webId, credentialId)=>{
    // check exist
    let web: any = await monitoredWebsiteDAO.findById(webId);
    if(web == null || web.deleted != null){
        return {flag: false, message: `not found website has id is ${webId}`, statusCode: 404};
    }
    // check parent
    if(web.parent != webId){
        return {flag: false, message: `This website is not parent`, statusCode: 400};
    }
    // check permission
    let checkPermission = await auth.authorize(credentialId, webId);
    if(checkPermission.flag == false){
        return {flag: false, message: "permission denied", statusCode: 403};
    }

    return {flag: true, message: "ok"};
};

Validator.prototype.validateResetPassword = (rawData)=>{
    let regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;

    if(rawData.credentialname == undefined){
        return {flag: false, message: "credentialname not empty"};
    }
    if(regex.test(rawData.email) == true){
        return {flag: true, message: "ok"};
    }
    else{
        return {flag: false, message: "email invalid"};
    }
}

Validator.prototype.validateChangePassword = (rawData)=>{
    if(rawData.newPassword == undefined || rawData.againPassword == undefined){
        return {flag: false, message: "not empty"};
    }
    if(rawData.newPassword != rawData.againPassword){
        return {flag: false, message: "not match"};
    }
    return {flag: true, message: "ok"};
}

Validator.prototype.validateRegisterCoinMinerDetecting = async (webId, credentialId)=>{
    try{
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
        if(web.id == web.parent){
            let domains = await domainsDAO.findByCondition(`webid=${webId} AND deleted IS NULL`);
            if(domains == null){
                return {flag: false, message: "CONDITION: you must register detect DNS before", statusCode: 400};
            }
        }
        else{
            let domains = await domainsDAO.findByCondition(`webid=${web.parent} AND deleted IS NULL`);
            if(domains == null){
                return {flag: false, message: "CONDITION: you must register detect DNS before", statusCode: 400};
            }
        }
        // chi duoc call 1 lan
        // @ts-ignore
        let pathChecked = path.join(__dirname, '..', '..', 'tmp', 'coinMinerTmp', `${webId}.txt`);
        let bool = fs.existsSync(pathChecked);
        if(bool == true){
            return {flag: false, message: "this api only use once", statusCode: 400};
        }
        //
        return {flage: true, message: "OK"};
    }catch (e) {
        throw e;
    }
}

Validator.prototype.validateDetectCoinMiner = async (webId, credentialId)=>{
    try{
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
        // ko cho getDetect Coinminer khi chua dang ky
        let pathCheck = path.join(__dirname, '..', '..', 'data', 'store', 'filesDb');
        let contentOfDir = fs.readdirSync(pathCheck);
        let flag=false;
        contentOfDir.forEach(e=>{
            if(e == `coinminer_${webId}.json`){
                flag = true;
            }
        })
        //
        if(flag == false){
            return {flag: false, message: "not found", statusCode: 404};
        }
        return {flag: true, message: "Ok"};
    }catch (e) {
        throw e;
    }
}

Validator.prototype.validateDeleteCoinMinerDetecting = async (webId, credentialId)=>{
    try{
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
        return {flag: true, message: "Ok"};
    }catch (e) {
        throw e;
    }
}

module.exports = Validator;

// let validator = new Validator();
// console.log(validator.validateUrl("asdadasdad"));