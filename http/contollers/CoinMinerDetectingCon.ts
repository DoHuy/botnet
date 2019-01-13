// @ts-ignore
import*as Monitor from '../../domains/MonitorServices/Monitor';
import*as CoinMinerDetecting from '../../domains/MonitorServices/CoinMinerDetectingService';
import*as ServiceSettingManager from '../../domains/MonitorServices/ServiceSettingManager';
import * as CONSTANT from "../../commons/Constants";
import * as Loger from "../../domains/Loger/Logger";
// @ts-ignore
let coinMinerDetecting = new Monitor(new CoinMinerDetecting());
// @ts-ignore
let serviceSettingManager: any = new ServiceSettingManager();
// @ts-ignore
let logger = new Loger();
let CoinMinerDetectingCon: any = {};

CoinMinerDetectingCon.detect = async (req, res)=>{
    req.jsonData={};
    req.jsonData.webId = req.params.id;
    try{
        let rs: any = await coinMinerDetecting.executeDetectingService(req.jsonData);
        return res.status(200).send({flag: true, result: JSON.parse(rs)});
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};

CoinMinerDetectingCon.registerService = async (req, res)=>{
    try{
        await serviceSettingManager.initCoinminerDetecting(req.params.id);
        // ghi log
        let jsonLogData = {
            log: CONSTANT.LOG_FEATURES.registerDetectCoinMiner,
            created: new Date().toISOString()
        };
        await logger.createLog(CONSTANT.LOG_FEATURES.registerDetectCoinMiner, jsonLogData, req.credentialId);
        //
        return res.status(200).send({flag:true, message: "register successfully"});
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
}

CoinMinerDetectingCon.deleteService = async (req, res)=>{
    try{
        await serviceSettingManager.destroyCoinminerDetecting(req.params.id);
        // ghi log
        let jsonLogData = {
            log: CONSTANT.LOG_FEATURES.removeDetectCoinMiner,
            created: new Date().toISOString()
        };
        await logger.createLog(CONSTANT.LOG_FEATURES.removeDetectCoinMiner, jsonLogData, req.credentialId);
        //
        return res.status(200).send({flag:true, message: "destroy successfully"});
    }catch (e) {
        return res.status(500).send({flag: false, message: "This service is deleted before"});
    }
}


module.exports = CoinMinerDetectingCon;