// @ts-ignore
import*as Validator from '../../domains/Validator/Validator';
let validator = new Validator();
let SettingMid: any = {};


SettingMid.beforeAddWebsite = async function (req, res, next) {
    let check = validator.validateUrl(req.body.url);
    if(check){
        req.input = req.body;
        next();
    }
    else {
        return res.status(400).send({flag: false, message: "url wrong"});
    }
};


SettingMid.beforeAddAdvanceConfig = async function (req, res, next) {
    let subList = req.body.subList;
    //
    subList.forEach((e)=>{
     let check = validator.validateUrl(e.url);
     if(!check) return res.status(400).send({flag: false, message: "urlList wrong"});
    });
    //

    //

    //

    req.config=req.body;
    next();
};


SettingMid.beforeChangeConfig = async function (req, res, next) {
    next();
};

SettingMid.afterChangeConfig = async function (req, res){
    let subSite: any = req.subSite;
    let rs=[];
    subSite.forEach((e)=>{
       rs.push(e.id);
    });

    return res.status(200).send({flag: true, subSiteIdList: rs});

};

SettingMid.afterAddAdvanceConfig = async function (req, res){
    let subSite: any = req.subSite;
    let rs=[];
    subSite.forEach((e)=>{
        rs.push(e.id);
    });

    return res.status(200).send({flag: true, subSiteIdList: rs});

};



module.exports = SettingMid;