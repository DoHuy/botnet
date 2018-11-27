// @ts-ignore
import*as Validator from '../../domains/Validator/Validator';
import*as CONFIG from '../../commons/Configs';
import*as Auth from '../../domains/Auth/Auth';
// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
// @ts-ignore
let validator = new Validator();
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
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
        return res.status(400).send({flag: false, message: "siteName field or url field is not empty"});
    }
};


SettingMid.beforeAddAdvanceConfig = async function (req, res, next) {
    let subList = req.body.subList;
    req.body.parent = req.params.id;
    // check exist website

    let web: any = await monitoredWebsiteDAO.findById(req.params.id);
    if(web != null && web.deleted != null){
        return res.status(404).send({flag:false, message: `not found id ${req.params.id}`});
    }
    let checkConfig = await validator.validateAddAdvanceConfig(req.body);
    if(checkConfig.flag == true){

        subList.forEach((e)=>{
            let check = validator.validateUrl(e.url);
            if(!check) return res.status(400).send({flag: false, message: `${e} invalid`});
        });

        //check permission
        let checkPer: any = await auth.authorize(req.credentialId, req.params.id);
        if(checkPer.flag == false){
            return res.status(403).send({flag: false, message: "Permission denied"});
        }
        else{
            //
            req.config=req.body;
            next();
        }

    }
    if(checkConfig.flag == false){
        return res.status(400).send({flag: false, message: checkConfig.message});
    }
};


SettingMid.beforeChangeConfig = async function (req, res, next) {
    let id = req.params.id;
    req.input = {};
    let fields = [{key: 'siteName', flag: false}, {key: 'frequently', flag: false},
                 {key: 'connectionTimeout', flag: false}, {key: 'countries', flag: false}];
    // check exist website

    let web: any = await monitoredWebsiteDAO.findById(id);
    if(web.deleted != null){
        return res.status(404).send({flag:false, message: `not found id ${id}`});
    }
    //check permission
    let checkPer: any = await auth.authorize(req.credentialId, id);
    //

    if(checkPer.flag == false){
        return res.status(403).send({flag: false, message: "Permission denied"});
    }
    else{
        let fieldsInBody = Object.keys(req.body);
        let check = await validator.validateChangeConfig(req.body);
        if(check.flag == true){
            fields.forEach(e=>{
                fieldsInBody.forEach(i=>{
                   if(e.key == i){
                       e.flag = true;
                   }
                });
            });
            fields.forEach(e=>{
                if(e.flag == true){
                    req.input[e.key] = req.body[e.key];
                }
            });
            req.input.parent = id;
            next();
        }
        else{
            return res.status(400).send({flag: false, message: check.message});
        }
    }

};

SettingMid.afterChangeConfig = (req, res)=>{
    let updatedList: any = req.updatedList;
    let rs: any=[];
    let parent: any = {};
    updatedList.forEach(e=>{
        if(e.id != e.parent){
            rs.push({siteName: e.siteName, id: e.id, frequently: e.frequently});
        }
        else{
            parent.siteName = e.siteName;
            parent.id = e.id;
            parent.frequently = e.frequently;
        }
    });

    return res.status(200).send({flag: true, parent: parent, subList: rs});
};

SettingMid.beforeRemoveWebsite = async function (req, res, next){
    let check: any = await validator.validateRemoveWebsite(req.params.id);

    if(check.flag == true){
        //check permission
        let checkPer: any = await auth.authorize(req.credentialId, req.params.id);
        //
        if(checkPer.flag == false){
            return res.status(403).send({flag: false, message: "Permission denied"});
        }
        else next();
    }
    else{
        return res.status(400).send({flag: false, message: check.message});
    }

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