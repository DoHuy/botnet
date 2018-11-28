import *as util from "util";
// @ts-ignore
import*as ServiceInterface from './ServiceIneterface';
// @ts-ignore
import*as MonitoredWebssiteDAO from '../../dao/MonitoredWebsiteDAO';

const monitoredWebsiteDAO = new MonitoredWebssiteDAO();

function NormalUpDownCheckingService (){
    ServiceInterface.call(this);
}

//implement ServiceInterface
util.inherits(NormalUpDownCheckingService, ServiceInterface);
//

NormalUpDownCheckingService.prototype.doOperation = async (jsonData) => {
    let result:any = {siteName: "", url:"", upDown:{}}; // {resp, notification}
    let webId = jsonData.webId;

    try{
        let web: any = await monitoredWebsiteDAO.findById(webId);
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




