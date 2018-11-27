import*as Configor from '../../domains/MonitorServices/ServiceSettingManager';
// @ts-ignore
const configor = new Configor();
let SettingCon: any = {};


SettingCon.addWebSite = async function (req, res) {
    let site;
    try{
        site = await configor.createWebsite(req.input, req.credentialId);
        let a = site;
        return res.status(200).send({
            flag: true,
            webId: site.id,
            frequently: site.frequently
        });
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};

SettingCon.changeConfig = async function (req, res, next) {
    let updatedList;
    try{
        updatedList = await configor.modifyConfigWebsite(req.input, req.credentialId);
        req.updatedList = updatedList;
        next();
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
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

SettingCon.removeWebsite = async function (req, res){
    let check;
    try{
        check = await configor.removeWebsite(req.params.id);
        if(check)return res.status(200).send({flag: true, message:"remove successfully"});
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
}

module.exports = SettingCon;