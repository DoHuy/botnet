// @ts-ignore
import*as ServiceInterface from './ServiceIneterface';
// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
import*as util from 'util';
const monitoredWebsiteDAO = new MonitoredWebsiteDAO();

function MultipleCountryUpDownCheckingService() {
    ServiceInterface.call(this);
}

// implement
util.inherits(MultipleCountryUpDownCheckingService, ServiceInterface);
//

MultipleCountryUpDownCheckingService.prototype.doOperation = async (jsonData)=>{
    let result: any={ siteName:"", url:""};
    let webId = jsonData.webId;
    let web: any = await monitoredWebsiteDAO.findById(webId);

    let response: any = web.responseTime;
    let notification: any = web.notification;
    let siteName: any = web.siteName;
    let url: any = web.url;

    for(let i in response){

        if(response[i].multipleCountries != undefined){
            result[i] = {response:[], notification:[], maxResponse:0, minResponse:0, averageResponse: 0};
            let maxResp = Number.MIN_SAFE_INTEGER;
            let minResp = Number.MAX_SAFE_INTEGER;
            let totalResp = 0;
            let map = new Map(response[i].multipleCountries);
            for(let el of map){
                maxResp = maxResp>el[1]["ResponseTime"]?maxResp:el[1]["ResponseTime"];
                minResp = minResp<el[1]["ResponseTime"]?minResp:el[1]["ResponseTime"];
                totalResp +=el[1]["ResponseTime"];
            }


            result[i].response = response[i].multipleCountries;
            result[i].notification = notification[i].multipleCountries;
            result[i].maxResponse = maxResp;
            result[i].minResponse = minResp;
            result[i].averageResponse = totalResp/4;
        }

    }

    result.siteName = siteName;
    result.url = url;

    return result;
};

module.exports = MultipleCountryUpDownCheckingService;

//test done
// let t = new MultipleCountryUpDownCheckingService();
// t.doOperation({webId: 126}).then(rs=>{
//     console.log(rs);
// })
//
