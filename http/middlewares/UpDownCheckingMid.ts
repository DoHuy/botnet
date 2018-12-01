// @ts-ignore
import *as Validator from '../../domains/Validator/Validator';
import*as Lib from '../../commons/Libs';
// @ts-ignore
let validator = new Validator();
let UpDownCheckingMid: any={};

UpDownCheckingMid.beforeGetNormalUpDownInfo = async (req, res, next)=>{
    try{
        let check: any = await validator.validateGetNormalUpDownInfo(req.params.id, req.credentialId);
        if(check.flag == true){
            // @ts-ignore
            let query = Lib.getQueryUrl(req.url, 'start', 'end');
            req.jsonData = {
                webId: req.params.id,
                start: query.start,
                end: query.end
            };
            next();
        }
        else{
            return res.status(400).send({flag: false, message: check.message});
        }
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};

UpDownCheckingMid.beforeGetCountriesInfo = async (req, res, next)=>{
    try{
        let check: any = await validator.validateGetCountriesInfo(req.params.id, req.credentialId);
        if(check.flag == true){
            // @ts-ignore
            let query = Lib.getQueryUrl(req.url, 'start', 'end');
            req.jsonData = {
                webId: req.params.id,
                start: query.start,
                end: query.end
            };
            next();
        }
        else{
            return res.status(400).send({flag: false, message: check.message});
        }
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
}

UpDownCheckingMid.beforeGetIspsInfo = async (req, res, next)=>{
    try{
        let check: any = await validator.validateGetIspsInfo(req.params.id, req.credentialId);
        if(check.flag == true){
            // @ts-ignore
            let query = Lib.getQueryUrl(req.url, 'start', 'end');
            req.jsonData = {
                webId: req.params.id,
                start: query.start,
                end: query.end
            };
            next();
        }
        else{
            return res.status(400).send({flag: false, message: check.message});
        }
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
}

module.exports = UpDownCheckingMid;
