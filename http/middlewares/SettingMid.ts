// @ts-ignore
import*as Validator from '../../domains/Validator/Validator';
import*as CONFIG from '../../commons/Configs';
import*as Auth from '../../domains/Auth/Auth';
// @ts-ignore
let validator = new Validator();
// @ts-ignore
let auth = new Auth();
let SettingMid: any = {};


SettingMid.beforeAddWebsite = async function (req, res, next) {
    let checkWebsite = validator.validateAddWebsite(req.body);

    if(checkWebsite){
        let checkUrl = validator.validateUrl(req.body.url);
        if(checkUrl){
            req.input = req.body;
            req.input.frequently = CONFIG.FREQUENTLY_DEFAULT;
            req.input.connectionTimeout = CONFIG.DEFAULT_TIMEOUT;
            next();
        }
        else{
            return res.status(400).send({flag: false, message: `${req.body.url} invalid`});
        }
    }
    else {
        return res.status(400).send({flag: false, message: "missing siteName field or url field"});
    }
};


SettingMid.beforeAddAdvanceConfig = async function (req, res, next) {
    let subList = req.body.subList;
    req.body.parent = req.params.id;
    //
    subList.forEach((e)=>{
     let check = validator.validateUrl(e.url);
     if(!check) return res.status(400).send({flag: false, message: `${e} invalid`});
    });
    let checkConfig = validator.validateAddAdvanceConfig(req.body);
    if(checkConfig.flag == true){
        req.config=req.body;
        next();
    }
    if(checkConfig.flag == false){
        return res.status(400).send({flag: false, message: checkConfig.message});
    }
};


SettingMid.beforeChangeConfig = async function (req, res, next) {
    let id = req.parent;
    let fields = ['parent', 'frequently', 'connectionTimeout', 'subList', 'countries'];
    //check permission
    let checkPer: any = await auth.authorize(req.credentialId, id);
    if(checkPer.flag == false){
        return res.status(403).send({flag: false, message: "Permission denied"});
    }
    else{
        let check = await validator.validateChangeConfig(req.body);
        if(check.flag == true){

        }
        else{
            return res.status(400).send({flag: false, message: check.message});
        }
    }
    //


    // if(check){
    //     req.input = req.body;
    //     req.input.webId = req.params.id;
    //     next();
    // }
    // else return res.status(400).send({flag: false, message: "frequently or connectionTimeOut is wrong"});

};

SettingMid.beforeRemoveWebsite = async function (req, res, next){
    let check = await validator.validateRemoveWebsite(req.params.id);
    if(check) next();

};

SettingMid.afterAddAdvanceConfig = async function (req, res){
    let subSiteList: any = req.subSiteList;
    let rs=[];
    subSiteList.forEach((e)=>{
        rs.push({siteName: e.siteName, id: e.id, frequently: e.frequently});
    });

    return res.status(200).send({flag: true, subSiteIdList: rs});

};

module.exports = SettingMid;