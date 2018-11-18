
// @ts-ignore
import *as SubProcManager from './SubProcManager';
// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let NormalUpDownCheckingProcess: any = {};

NormalUpDownCheckingProcess.frequently = process.argv[2];
NormalUpDownCheckingProcess.connectionTimeout = process.argv[3];
NormalUpDownCheckingProcess.webId = process.argv[4];
NormalUpDownCheckingProcess.url = process.argv[5];
/**
 * init
 */
NormalUpDownCheckingProcess.run = async ()=>{
    let proc: any = SubProcManager.initCurrentIpCheckingProc(NormalUpDownCheckingProcess.connectionTimeout, NormalUpDownCheckingProcess.webId, NormalUpDownCheckingProcess.url);
    // neu nhan duoc message thi insert vao csdl
    proc.on('message', async (message)=>{
        let newResponse: any;
        let newNotification: any;
        let created: any;

        try{

            let web: any = await monitoredWebsiteDAO.findById(NormalUpDownCheckingProcess.webId);
            newResponse = web.responseTime==null?null:web.responseTime;
            newResponse[created]=message.response;
            newNotification = web.notification==null?null:web.notification;
            newNotification[created]=message.notification;
            monitoredWebsiteDAO.modifyById(NormalUpDownCheckingProcess.webId, ['responsetime', 'notification'], [newResponse, newNotification]);
        }catch (e) {
            throw e;
        }
    });
};

//test
// NormalUpDownCheckingProcess.run();

setInterval(async ()=>{
    await NormalUpDownCheckingProcess.run();
}, NormalUpDownCheckingProcess.frequently);
