import *as util from "util";
// @ts-ignore
import*as ServiceInterface from './ServiceIneterface';
// @ts-ignore
import*as MonitoredWebssiteDAO from '../../dao/MonitoredWebsiteDAO';

const monitoredWebsiteDAO = new MonitoredWebssiteDAO();

function ISPsUpDownCheckingService(){
    ServiceInterface.call(this);
}

// implement ServiceInterface
util.inherits(ISPsUpDownCheckingService, ServiceInterface);
//

// thong ke duoc so luong min max average responseTime trong lan check hien tai cua
ISPsUpDownCheckingService.prototype.doOperation = async (jsonData)=>{
    let result: any={siteName:"", url:"", upDown:{}};
    let webId = jsonData.webId;
    let web: any = await monitoredWebsiteDAO.findById(webId);

    let response: any = web.responseTime;
    let notification: any = web.notification;
    let siteName: any = web.siteName;
    let url: any = web.url;
    let hnVietel: any = {up:0, down: 0};
    let hnVnpt: any = {up:0, down: 0};
    let hcmVietel: any = {up: 0, down: 0};
    let hcmVnpt: any = {up: 0, down: 0};

    for(let i in response){

        if(response[i].multipleIsp != undefined){
            result[i] = {response:[], notification:[], maxResponse:0, minResponse:0, averageResponse:0};
            let maxResp = Number.MIN_SAFE_INTEGER;
            let minResp = Number.MAX_SAFE_INTEGER;
            let totalResp = 0;
            let map = new Map(response[i].multipleIsp);
            for(let el of map){
                maxResp = maxResp>el[1]["ResponseTime"]?maxResp:el[1]["ResponseTime"];
                minResp = minResp<el[1]["ResponseTime"]?minResp:el[1]["ResponseTime"];
                totalResp +=el[1]["ResponseTime"];
            }

            result[i].response = response[i].multipleIsp;
            result[i].notification = notification[i].multipleIsp;
            result[i].maxResponse = maxResp;
            result[i].minResponse = minResp;
            result[i].averageResponse = totalResp/4;

            // count updown

            //

        }

    }

    result.siteName = siteName;
    result.url = url;

    return result;
};

module.exports = ISPsUpDownCheckingService;