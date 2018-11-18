// @ts-ignore
import*as Validator from '../../domains/Validator/Validator';
import*as CONFIG from '../../commons/Configs';
// @ts-ignore
let validator = new Validator();
let SettingMid: any = {};


SettingMid.beforeAddWebsite = async function (req, res, next) {
    let check = validator.validateUrl(req.body.url);
    if(check){
        req.input = req.body;
        req.input.frequently = CONFIG.FREQUENTLY_DEFAULT;
        req.input.connectionTimeout = CONFIG.DEFAULT_TIMEOUT;
        next();
    }
    else {
        return res.status(400).send({flag: false, message: "url is wrong"});
    }
};


SettingMid.beforeAddAdvanceConfig = async function (req, res, next) {
    let subList = req.body.subList;
    //
    subList.forEach((e)=>{
     let check = validator.validateUrl(e.url);
     if(!check) return res.status(400).send({flag: false, message: "urlList is wrong"});
    });


    req.config=req.body;
    next();
};


SettingMid.beforeChangeConfig = async function (req, res, next) {
    let id = req.params.id;
    let check = await validator.validateChangeConfig(req.body, req.params.id);
    if(check){
        req.input = req.body;
        req.input.webId = req.params.id;
        next();
    }
    else return res.status(400).send({flag: false, message: "frequently or connectionTimeOut is wrong"});

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