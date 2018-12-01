
// @ts-ignore
import *as SubProcManager from './SubProcManager';
// @ts-ignore
import*as ResponseStateDAO from '../../dao/ResponseStateDAO';
// @ts-ignore
let responseStateDAO = new ResponseStateDAO();
let NormalUpDownCheckingProcess: any = {};

NormalUpDownCheckingProcess.frequently = process.argv[2] || '18000';
NormalUpDownCheckingProcess.connectionTimeout = process.argv[3] || '30000';
NormalUpDownCheckingProcess.webId = process.argv[4] || 7;
NormalUpDownCheckingProcess.url = process.argv[5] || 'https://www.techcombank.com.vn/trang-chu';
/**
 * init
 */
NormalUpDownCheckingProcess.run = async ()=>{

    let newResponse: any={};
    let newNotification: any={};
    let created: any = new Date().toISOString();

    // @ts-ignore
    let proc: any = SubProcManager.initCurrentIpCheckingProc(NormalUpDownCheckingProcess.connectionTimeout, NormalUpDownCheckingProcess.webId, NormalUpDownCheckingProcess.url);

    // neu nhan duoc message thi insert vao csdl, data {responsetime, notification}
    let data: any = await new Promise((resolve) => {
        proc.on('message', async (message)=>{
            resolve(message);
        });
    });

    try{
       let rs =  await responseStateDAO.create( {
            response: data.response,
            notification: data.notification,
            created: new Date().toISOString(),
            webId: NormalUpDownCheckingProcess.webId
        });

       return rs;

    }catch (e) {
        throw e;
    }


};

// //test done
// NormalUpDownCheckingProcess.run().then(rs=>{
//     console.log(rs);
// });

// // test done
setInterval(async ()=>{
   await NormalUpDownCheckingProcess.run();
}, NormalUpDownCheckingProcess.frequently);
