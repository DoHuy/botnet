// @ts-ignore
import*as DetectingServiceInterface from './DetectingServiceInterface';
import*as util from 'util';
// @ts-ignore
import*as DomainsDAO from '../../dao/DomainsDAO';
// @ts-ignore
import*as DomainsStateDAO from '../../dao/DomainsStateDAO';

const domainsDAO = new DomainsDAO();
const domainsStateDAO = new DomainsStateDAO();

function HackedDNSDetectingService() {
    // @ts-ignore
    DetectingServiceInterface.call(this);
}

//implement ServiceInterface
util.inherits(HackedDNSDetectingService, DetectingServiceInterface);

HackedDNSDetectingService.prototype.doDetection = async(jsonData)=>{
    try{
        let domain: any = await domainsDAO.findByCondition(`webid=${jsonData.webId} order by id desc`);
        let condition: any;
        if(jsonData.limit == null){
            condition = `domainsid= ${domain[0].id} order by id DESC`;
        }
        else{
            condition = `domainsid= ${domain[0].id} order by id DESC limit ${jsonData.limit}`;
        }

        let domainState: any = await domainsStateDAO.findByCondition(condition);

        if(domainState !== null){
            domainState.forEach(e=>{
                delete e.id;
                delete e.domainsId;
            });
        }

        return domainState;
    }catch (e) {
        throw e;
    }
};

module.exports = HackedDNSDetectingService;