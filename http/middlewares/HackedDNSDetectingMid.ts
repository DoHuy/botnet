// @ts-ignore
import*as Validator from '../../domains/Validator/Validator';
import*as CONFIG from '../../commons/Configs';
import*as Auth from '../../domains/Auth/Auth';
import*as Lib from '../../commons/Libs';
// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
import*as ServiceSettingManager from '../../domains/MonitorServices/ServiceSettingManager';
// @ts-ignore
import*as DomainsDAO from '../../dao/DomainsDAO';
// @ts-ignore
let validator = new Validator();
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let domainsDAO = new DomainsDAO();
// @ts-ignore
let auth = new Auth();
let HackedDNSDetectingMid: any = {};
const FREQUENTLY = 3*60*1000;

HackedDNSDetectingMid.beforeAddConfigDNS = async function (req, res, next) {
    req.input = {domains:[], ip:null, frequently:null};

    try{
        let ok: any = await validator.validateAddConfigDNS(req.body, req.params.id, req.credentialId);
        if(ok.flag == false){
            return res.status(ok.statusCode).send({flag: false, message:ok.message});
        }
        else{
            // get first_domain
            let web: any = await monitoredWebsiteDAO.findById(req.params.id);
            let defaultDomain = web.url.match(/^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/igm)[0];
            defaultDomain = defaultDomain.split('/')[defaultDomain.split('/').length -1];
            req.input.domains.push(defaultDomain);
            //
            if(req.body.domains != undefined){
                for(let i=0 ; i<req.body.domains.length ; i++){
                    req.input.domains.push(req.body.domains[i]);
                }
            }
            //
            req.input.ip = req.body.ip;
            req.input.frequently = FREQUENTLY;

            next();
        }
    }  catch (e) {
        return res.status(500).send({flag: false, message:e.message});
    }
};

HackedDNSDetectingMid.beforeCheckDNS = async function (req, res, next){
    try{
        let done: any = await validator.validateCheckDNS(req.params.id, req.credentialId);
        if(done.flag == false){
            return res.status(done.statusCode).send({flag: true, message: done.message});
        }
        else{

            // @ts-ignore
            let query = Lib.getQueryUrl(req.url, 'limit');
            req.jsonData = {
                webId: req.params.id,
                limit: query.limit
            }
            next();
        }
    }catch (e) {
        return res.status(500).send({flag: true, message: e.message});
    }
};

HackedDNSDetectingMid.beforeDelete = async (req, res, next)=>{
    try{
        let done: any = await validator.validateDelete(req.params.id, req.credentialId);
        if(done.flag == false){
            return res.status(done.statusCode).send({flag: false, message: done.message});
        }
        else{
            next();
        }
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};



module.exports = HackedDNSDetectingMid;