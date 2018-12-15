// @ts-ignore
import*as LogDAO from '../../dao/LogDAO';
let logDAO = new LogDAO();

function CreatingLogService(jsonData, credentialId) {
    this.jsonData = jsonData;
    this.credentialId = credentialId;
}

CreatingLogService.prototype.logCreatingMonitoredWebsite = async ()=>{
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

CreatingLogService.prototype.logCreatingDNS = async ()=>{
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


module.exports = CreatingLogService;