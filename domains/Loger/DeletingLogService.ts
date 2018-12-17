// @ts-ignore
import*as LogDAO from '../../dao/LogDAO';

let logDAO = new LogDAO();

class DeletingLogService{
    public jsonData;
    public credentialId;

    constructor(jsonData, credentialId){
        this.jsonData = jsonData;
        this.credentialId = credentialId;
    }

    async logDeletingMonitoredWebsite(){
        try{
            let rs: any = await logDAO.create({
                log: this.jsonData.log,
                created: this.jsonData.created,
                credentialId: this.credentialId
            });
            return rs;
        }catch (e) {
            throw e;
        }
    }

    async logDeletingDNS(){
        try{
            let rs: any = await logDAO.create({
                log: this.jsonData.log,
                created: this.jsonData.created,
                credentialId: this.credentialId
            });
            return rs;
        }catch (e) {
            throw e;
        }
    }

}


module.exports = DeletingLogService;