
// @ts-ignore
import *as SubProcManager from './SubProcManager';
// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let NormalUpDownCheckingProcess: any = {};

NormalUpDownCheckingProcess.frequently = process.argv[2] || 5;
NormalUpDownCheckingProcess.connectionTimeout = process.argv[3] || 30;
NormalUpDownCheckingProcess.webId = process.argv[4] || 10;
NormalUpDownCheckingProcess.url = process.argv[5] || 'https://vnexpress.net';
/**
 * init
 */
NormalUpDownCheckingProcess.run = async ()=>{
    let newResponse: any={};
    let newNotification: any={};
    let created: any = new Date().toISOString();

    let proc: any = SubProcManager.initCurrentIpCheckingProc(NormalUpDownCheckingProcess.connectionTimeout, NormalUpDownCheckingProcess.webId, NormalUpDownCheckingProcess.url);

    // neu nhan duoc message thi insert vao csdl
    let data: any = await new Promise((resolve) => {
        proc.on('message', async (message)=>{
            resolve(message);
        });
    });

    try{

        let web: any = await monitoredWebsiteDAO.findById(NormalUpDownCheckingProcess.webId);
        newResponse = web.responseTime==null?{}:web.responseTime;
        newNotification = web.notification==null?{}:web.notification;
        newNotification[created]=data.notification;
        newResponse[created]=data.response;
        monitoredWebsiteDAO.modifyById(NormalUpDownCheckingProcess.webId, ['responsetime', 'notification'], [newResponse, newNotification]);

    }catch (e) {
        throw e;
    }


};

//test done
// NormalUpDownCheckingProcess.run();

setInterval(async ()=>{
    await NormalUpDownCheckingProcess.run();
}, NormalUpDownCheckingProcess.frequently);
