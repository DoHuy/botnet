import*as Configor from '../../domains/MonitorServices/SettingService';
// @ts-ignore
const configor = new Configor();
let SettingCon: any = {};


SettingCon.addWebSite = async function (req, res) {
    let site;
    try{
        site = await configor.createWebsite(req.input, req.credentialId);
        return res.status(200).send({
            flag: true,
            webId: site.id
        });
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};

SettingCon.changeConfig = async function (req, res, next) {
    let list;
    try{
        list = await configor.modifyConfigWebsite(req.input);
        req.subSiteList = list;
        next();
    }catch (e) {
        return res.status(500).send({flage: false, message: e.message});
    }
};

SettingCon.addAdvanceConfig = async function (req, res, next) {
    let list;
    try{
        list = await configor.addAdvanceConfigWebsite(req.config, req.credentialId);
        req.subSiteList = list;
        next();
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};


module.exports = SettingCon;