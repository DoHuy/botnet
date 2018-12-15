// @ts-ignore
import*as LogDAO from '../../dao/LogDAO';
let logDAO = new LogDAO();

function ModifyingLogService(jsonData, credentialId) {
    this.jsonData = jsonData;
    this.credentialId = credentialId;
}

ModifyingLogService.prototype.logModifyingMonitoredWebsite = async ()=>{
    try{
        let rs: any = await logDAO.create({
            log: this.jsonData.log,
            created: this.jsonData.created,
            credentialId: this.credentialId
        });
    }catch (e) {
        throw e;
    }
};

ModifyingLogService.prototype.logDeletingDNS = async ()=>{
    try{
        let rs: any = await logDAO.create({
            log: this.jsonData.log,
            created: this.jsonData.created,
            credentialId: this.credentialId
        });
    }catch (e) {
        throw e;
    }
};


module.exports = ModifyingLogService;