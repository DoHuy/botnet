// @ts-ignore
import*as ServiceInterface from './ServiceIneterface';
// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
// @ts-ignore
import*as ResponseStateDAO from '../../dao/ResponseStateDAO';
import*as util from 'util';
const monitoredWebsiteDAO = new MonitoredWebsiteDAO();
const responseStateDAO = new ResponseStateDAO();
function MultipleCountryUpDownCheckingService() {
    ServiceInterface.call(this);
}

// implement
util.inherits(MultipleCountryUpDownCheckingService, ServiceInterface);
//


// adapt data to old data
async function adaptData (webId, start=null, end=null){
    let rs: any = {siteName:"", url:"", responseTime:{}, notification:{}};
    let condition;
    if(start != null && end != null){
        condition = `webid=${webId} AND created between '${start}' AND '${end}' ORDER BY id DESC`;
    }
    else{
        condition=`webid=${webId} ORDER BY id DESC limit 100`;
    }

    try{
        let site: any = await monitoredWebsiteDAO.findById(webId);
        let respState: any = await responseStateDAO.findByCondition(condition);
        respState.forEach(e=>{
            rs.responseTime[e.created] = e.response;
            rs.notification[e.created] = e.notification;
        });

        rs.siteName = site.siteName;
        rs.url = site.url;

    }catch (e) {
        throw e;
    }

    return rs;
}

MultipleCountryUpDownCheckingService.prototype.doOperation = async (jsonData)=>{
    let result: any={ siteName:"", url:""};
    let webId = jsonData.webId;
    let web: any = await adaptData(webId);

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
