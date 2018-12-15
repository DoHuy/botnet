// @ts-ignore
import*as Monitor from '../../domains/MonitorServices/Monitor';
import*as HackedDNSDetectingService from '../../domains/MonitorServices/HackedDNSDetectingService';
import*as ServiceSettingManager from '../../domains/MonitorServices/ServiceSettingManager';
import*as Logger from '../../domains/Loger/Logger';
import*as CONSTANT from '../../commons/Constants';
// @ts-ignore
let monitor = new Monitor(new HackedDNSDetectingService());
// @ts-ignore
let manager = new ServiceSettingManager();
// @ts-ignore
let logger = new Logger();

let HackedDNSDetectingCon: any = {};

HackedDNSDetectingCon.addConfigDNS = async (req, res)=>{
  try{
     let done: any =  await manager.turnOnHackedDNSDetecting(req.input, req.params.id);

     // ghi log
      let jsonLogData = {
        log: CONSTANT.LOG_FEATURES.createDNS,
        created: new Date().toISOString()
      };
     await logger.createLog(CONSTANT.LOG_FEATURES.createDNS, jsonLogData, req.credentialId);
      //
     return res.status(200).send({flag: true, message: "successfully"});
  }catch (e) {
      return res.status(500).send({flag: false, message: e.message});
  }
};

HackedDNSDetectingCon.checkDNS = async (req, res)=>{
    try{
        let rs: any = await monitor.executeDetectingService(req.jsonData);
        return res.status(200).send({flag: true, result: rs});
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};

HackedDNSDetectingCon.delete = async (req, res)=>{
  try{
      let done: any = await manager.destroyHackedDNSDetecting(req.params.id);

      // ghi log
      let jsonLogData = {
          log: CONSTANT.LOG_FEATURES.removeDNS,
          created: new Date().toISOString()
      };
      await logger.createLog(CONSTANT.LOG_FEATURES.removeDNS, jsonLogData, req.credentialId);
      //
      return res.status(200).send({flag: true, message: "successfully"});
  }  catch (e) {
      return res.status(500).send({flag: false, message: e.message});
  }
};


module.exports = HackedDNSDetectingCon;