// @ts-ignore
import*as MonitoredWebsiteDAO from "../../dao/MonitoredWebsiteDAO";
import*as Lib from "../../commons/Libs";
import*as CONFIG from "../../commons/Configs";
import *as CONSTANT from "../../commons/Constants";
import*as util from "util";
import {NOTICE_RULE} from "../../commons/Configs";

const exec = util.promisify(require('child_process').exec);


// 3 argument : connectionTimeout, webId, url
let CurrentIpCheckingProc: any = {};
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
//
// CurrentIpCheckingProc.frequently = process.argv[2] || 1;
CurrentIpCheckingProc.connectionTimeout = process.argv[2] || '30000';
CurrentIpCheckingProc.webId = process.argv[3] || 74;
CurrentIpCheckingProc.url = process.argv[4] || "https://news.zing.vn";
/**
 * done
 * @return void
 */
CurrentIpCheckingProc.run = async function () {
    let response: any; // {created: {DNSLookup..., averageResponseTime, minResponseTime, maxResponseTime, upTotal, downTotal, location:{}}}
    let notification: any; //{notification: {server, status, level, message}
    let created: any = `${new Date().toISOString()}`;
    let infoIp = await exec(`curl https://ipinfo.io`);
    let location: any = JSON.parse(infoIp.stdout);
    // @ts-ignore
    let image = `${created}.png`;
    // @ts-ignore
    let imagePath = Lib.generatePath(__dirname, CONSTANT.PATH.FILE_DATA_PATH, image);
    // co 3 level: success, warning, error
    let tmp:any={}; //{server, statusCode, code, state, level, message, img} // tmp la bien tam giu thong tin cua notification
    // @ts-ignore
    let map: any = new Map(CONSTANT.STATUS_CODE);
    let metric: any;
    try{
        // @ts-ignore
        metric = await Lib.requestWithPuppeteer(CurrentIpCheckingProc.url, imagePath, null, CurrentIpCheckingProc.connectionTimeout);
        // tong hop du lieu {DNSLookup, InitConnection, DataTransfer, ResponseTime, WaitTime }
        let web: any = await monitoredWebsiteDAO.findById(CurrentIpCheckingProc.webId);

        if(metric.status == '500'){
            // throw e/ neu co loi xay ra
            response = {
                DNSLookup: 0,
                InitConnection: 0,
                DataTransfer: 0,
                ResponseTime: 0,
                WaitTime: 0,
                averageResponseTime: 0,
                maxResponseTime: 0,
                minResponseTime: 0,
                location: location

            };
            notification = {
                server: null,
                statusCode: metric.status,
                code: map.get(`${metric.status}`).code,
                message: metric.message,
                state: NOTICE_RULE.state[1],
                img: `http://${CONFIG.SERVER.HOST_SERVER}:${CONFIG.SERVER.SERVER_PORT}/${image}`,
                level: "error"
            };

        }
        else{
            // calculate metric
            let averageResponseTime:any = 0;
            let maxResponseTime: Number = -1;
            let minResponseTime: Number = 99999999999;
            let firstResponse: Object={};
            firstResponse[created]={
                DNSLookup: metric.DNSLookup,
                InitConnection: metric.InitConnection,
                DataTransfer: metric.DataTransfer,
                ResponseTime: metric.ResponseTime,
                WaitTime: metric.WaitTime,
                averageResponseTime: 0,
                maxResponseTime: 0,
                minResponseTime: 0,
                location: location
            };

            let details: any = web.responseTime!=null?web.responseTime: firstResponse; // responseTime == detials
            details[created]=firstResponse[created];
            for(let i in details){
                averageResponseTime += details[i].ResponseTime;
                maxResponseTime = maxResponseTime>=details[i].ResponseTime?maxResponseTime:details[i].ResponseTime;
                minResponseTime = minResponseTime<=details[i].ResponseTime?minResponseTime:details[i].ResponseTime;
            }
            averageResponseTime = averageResponseTime/(Object.keys(details).length);
            //
            response = {
                DNSLookup: metric.DNSLookup,
                InitConnection: metric.InitConnection,
                DataTransfer: metric.DataTransfer,
                ResponseTime: metric.ResponseTime,
                WaitTime: metric.WaitTime,
                averageResponseTime: averageResponseTime,
                maxResponseTime: maxResponseTime,
                minResponseTime: minResponseTime,
                location: location

            };


            tmp.server = metric.server;
            tmp.statusCode = metric.status;
            tmp.code = map.get(`${metric.status}`).code;
            tmp.message= map.get(`${metric.status}`).message;
            tmp.state = NOTICE_RULE.state[0];
            tmp.img = `http://${CONFIG.SERVER.HOST_SERVER}:${CONFIG.SERVER.SERVER_PORT}/${image}`;

            if(tmp.statusCode =='200' && metric.ResponseTime <= CONFIG.NOTICE_RULE.connectionTimeout["threshold"].success){
                tmp.level = "success";
            }
            else if(tmp.statusCode =='200' && metric.ResponseTime > CONFIG.NOTICE_RULE.connectionTimeout["threshold"].success){
                tmp.level = "warning";
            }
            else {
                tmp.level = "error";
            }
            notification = tmp;
        }


    }catch (e) {
        throw e;

    };

    return {response, notification};

};

//test
// CurrentIpCheckingProc.run().then(rs=>{
//     console.log(rs);
// })
//
// setInterval(async ()=>{
//    await CurrentIpCheckingProc.run();
// }, CurrentIpCheckingProc.frequently);
//
//

// runing test done
CurrentIpCheckingProc.run().then(rs=>{
    // send kq toi parent_process sau do kill
    // console.log(rs);
    process.send(rs);
    process.exit(0);
});

