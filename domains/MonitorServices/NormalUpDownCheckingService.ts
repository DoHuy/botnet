import *as util from "util";
// @ts-ignore
import*as ServiceInterface from './ServiceIneterface';
// @ts-ignore
import*as MonitoredWebssiteDAO from '../../dao/MonitoredWebsiteDAO';
// @ts-ignore
import*as ResponseStateDAO from '../../dao/ResponseStateDAO';

const monitoredWebsiteDAO = new MonitoredWebssiteDAO();
const responseStateDAO = new ResponseStateDAO();

function NormalUpDownCheckingService (){
    ServiceInterface.call(this);
}

//implement ServiceInterface
util.inherits(NormalUpDownCheckingService, ServiceInterface);
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
        console.log(respState);
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

NormalUpDownCheckingService.prototype.doOperation = async (jsonData) => {
    let result:any = {siteName: "", url:"", upDown:{}}; // {resp, notification}
    let webId = jsonData.webId;

    try{
        let web: any = await adaptData (webId);
        console.log(web);
        let siteName: any = web.siteName;
        let url: any = web.url;

        let response: any = web.responseTime;
        let notification: any = web.notification;

        let upResp: any = 0;
        let downResp: any = 0;

        for(let i in response){
            result[i] = {response:{}, notification:{}};
            if(response[i].multipleCountries !== undefined){
                // console.log(response[i].multipleCountries);
                delete response[i].multipleCountries;
                delete response[i].multipleIsp;
                delete notification[i].multipleCountries;
                delete notification[i].multipleIsp;
            }
            // console.log(response[i]);
            result[i].response = response[i];
            result[i].notification = notification[i];

            if(notification[i].level == 'error'){
                downResp++;
            }
            else{
                upResp++;
            }
        }

        result.upDown.totalUp = upResp;
        result.upDown.totalDown = downResp;
        result.siteName = siteName;
        result.url = url;

        return result;
    }catch (e) {
        throw e;
    }


};

module.exports = NormalUpDownCheckingService;

//test done
// let test = new NormalUpDownCheckingService();
// test.doOperation({webId: 122}).then(rs=>{
//     console.log(rs);
// })
//




