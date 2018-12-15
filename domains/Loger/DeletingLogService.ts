// @ts-ignore
import*as LogDAO from '../../dao/LogDAO';

let logDAO = new LogDAO();

function DeletingLogService(jsonData, credentialId) {
    this.jsonData = jsonData;
    this.credentialId = credentialId;
}

DeletingLogService.prototype.logDeletingMonitoredWebsite = async ()=>{
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

DeletingLogService.prototype.logDeletingDNS = async ()=>{
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


module.exports = DeletingLogService;