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
    let result: any={};
    let webId = jsonData.webId;
    let web: any = await monitoredWebsiteDAO.findById(webId);

    let response: any = web.responseTime;
    let notification: any = web.notification;

    for(let i in response){
        result[i] = {response:{}, notification:{}, countries:{response:[], notification:[], maxResponse:0, minResponse:0}};
        result[i].response = response[i];
        result[i].notification = notification[i];

        if(response[i].multipleCountries != undefined){
            let maxResp = Number.MIN_SAFE_INTEGER;
            let minResp = Number.MAX_SAFE_INTEGER;

            let map = new Map(response[i].multipleCountries);
            for(let el of map){
                maxResp = maxResp>el["ResponseTime"]?maxResp:el["ResponseTime"];
                minResp = minResp<el["ResponseTime"]?minResp:el["ResponseTime"];
            }
            result[i].response = response[i].multipleCountries;
            result[i].notification = notification[i].multipleCountries;

        }
        else{
            delete result[i].countries;
        }
    }

    return result;
};

module.exports = MultipleCountryUpDownCheckingService;

//test done
// let t = new MultipleCountryUpDownCheckingService();
// t.doOperation({webId: 122}).then(rs=>{
//     console.log(rs);
// })
//
