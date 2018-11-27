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
    let result:any = {upDown:{}}; // {resp, notification}
    let webId = jsonData.webId;
    let web: any = await monitoredWebsiteDAO.findById(webId);

    let response: any = JSON.stringify(web.responseTime);
    response =  JSON.parse(response);

    let notification: any = JSON.stringify(web.notification);
    notification = JSON.parse(notification);

    // console.log(response, notification);
    let countUp=0;
    let countDown=0;

    for(let key in response){
        result[key] = {
            response: response[key],
            notification: notification[key]
        };

        // console.log(notification[key].level);
        if(notification[key]["level"] == 'error'){
            countDown++;
        }
        else{
            countUp++;
        }
    }

    result.upDown.up = countUp;
    result.upDown.down = countDown;


    return result;

};

module.exports = NormalUpDownCheckingService;

//test done
// let test = new NormalUpDownCheckingService();
// test.doOperation({webId: 122}).then(rs=>{
//     console.log(rs);
// })
//




