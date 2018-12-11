// @ts-ignore
import*as Validator from '../../domains/Validator/Validator';
import*as CONFIG from '../../commons/Configs';
import*as Auth from '../../domains/Auth/Auth';
import*as Lib from '../../commons/Libs';
// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
// @ts-ignore
let validator = new Validator();
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
// @ts-ignore
let auth = new Auth();
let SearchingMid: any = {};


SearchingMid.beforeSearchByDate = async function (req, res, next) {
    req.jsonData = {webId:null, start: null, end: null };
    // @ts-ignore
    let query = Lib.getQueryUrl(req.url, 'start', 'end');
    let check = await validator.validateSearchByDate(req.params.id, req.credentialId, query);
    // console.log(query.end);
    if(check.flag == true){
        req.jsonData.webId = req.params.id;
        req.jsonData.start = query.start;
        req.jsonData.end = query.end;
        next();
    }
    else{
        return res.status(check.statusCode).send({flag: false, message: check.message});
    }
};

SearchingMid.beforeSearchComparison = async (req, res, next)=>{
    req.jsonData = {webId:null, start: null, end: null };
    // @ts-ignore
    let query = Lib.getQueryUrl(req.url, 'start', 'end');
    // console.log(query);
    let check = await validator.validateSearchComparison(req.params.id, req.credentialId, query);
    // console.log(query.end);
    if(check.flag == true){

        req.jsonData.webId = req.params.id;
        req.jsonData.start = query.start;
        req.jsonData.end = query.end;
        next();
    }
    else{
        return res.status(check.statusCode).send({flag: false, message: check.message});
    }
};



module.exports = SearchingMid;