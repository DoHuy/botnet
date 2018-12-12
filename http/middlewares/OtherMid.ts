// @ts-ignore
import*as Validator from '../../domains/Validator/Validator';

// @ts-ignore
const validator = new Validator();
let OtherMid: any = {};

OtherMid.beforeGetMonitoredWebSite = async (req, res, next)=>{
    try{
        let check = await validator.validateGetMonitoredWebSite(req.params.id, req.credentialId);
        if(check.flag == false){
            return res.status(check.statusCode).send({flag: false, message: check.message});
        }
        else{
            next();
        }
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};

OtherMid.beforeGetAllParentMonitoredWebSite = async (req, res, next)=>{
    try{
        let check = await validator.validateGetAllParentMonitoredWebSite(req.credentialId);
        if(check.flag == false){
            return res.status(check.statusCode).send({flag: false, message: check.message});
        }
        else{
            next();
        }
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};

OtherMid.beforeGetDomainsOfWebsite = async (req, res, next)=>{
    try{
        let check = await validator.validateGetDomainsOfWebsite(req.params.id, req.credentialId);
        if(check.flag == false){
            return res.status(check.statusCode).send({flag: false, message: check.message});
        }
        else{
            next();
        }
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};
module.exports = OtherMid;