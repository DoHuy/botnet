import*as Configor from '../../domains/MonitorServices/ServiceSettingManager';
import*as CONSTANT from '../../commons/Constants';
import*as Logger from '../../domains/Loger/Logger';
// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
// @ts-ignore
const configor = new Configor();
// @ts-ignore
const logger = new Logger();
// @ts-ignore
let SettingCon: any = {};

SettingCon.addWebSite = async function (req, res) {
    let site;
    try{
        site = await configor.createWebsite(req.input, req.credentialId);
        // ghi log
        let jsonLogData = {
            log: CONSTANT.LOG_FEATURES.addMonitoredWebsite,
            created: new Date().toISOString()
        };
        await logger.createLog(CONSTANT.LOG_FEATURES.addMonitoredWebsite, jsonLogData, req.credentialId);
        //
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

        // ghi log
        let jsonLogData = {
            log: CONSTANT.LOG_FEATURES.modifyMonitoredWebsite,
            created: new Date().toISOString()
        };
        await logger.createLog(CONSTANT.LOG_FEATURES.modifyMonitoredWebsite, jsonLogData, req.credentialId);
        //

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
        // ghi log
        let jsonLogData = {
            log: CONSTANT.LOG_FEATURES.addAdvanceConfigMonitoredWebsite,
            created: new Date().toISOString()
        };
        await logger.createLog(CONSTANT.LOG_FEATURES.addAdvanceConfigMonitoredWebsite, jsonLogData, req.credentialId);
        //
        req.subSiteList = list;
        next();
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};

SettingCon.removeWebsite = async function (req, res){
    let check;
    let check2;
    try{
        let web: any = await monitoredWebsiteDAO.findByCondition(`parent=${req.params.id}`);
        check = await configor.removeWebsite(req.params.id);
        // remove coinMiner
        web.forEach(async e=>{
            await configor.destroyHackedDNSDetecting(e.id);
            await configor.destroyCoinminerDetecting(e.id);
        });
        //
        // ghi log
        let jsonLogData = {
            log: CONSTANT.LOG_FEATURES.removeMonitoredWebsite,
            created: new Date().toISOString()
        };
        await logger.createLog(CONSTANT.LOG_FEATURES.removeMonitoredWebsite, jsonLogData, req.credentialId);
        //
       return res.status(200).send({flag: true, message:"remove successfully"});
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
}

module.exports = SettingCon;