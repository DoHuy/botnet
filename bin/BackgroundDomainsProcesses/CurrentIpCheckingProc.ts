// @ts-ignore
import*as ResponseStateDAO from "../../dao/ResponseStateDAO";
import*as Lib from "../../commons/Libs";
import*as CONFIG from "../../commons/Configs";
import *as CONSTANT from "../../commons/Constants";
import*as util from "util";
import {NOTICE_RULE} from "../../commons/Configs";

const exec = util.promisify(require('child_process').exec);
// 3 argument : connectionTimeout, webId, url
let CurrentIpCheckingProc: any = {};
// @ts-ignore
let responseStateDAO = new ResponseStateDAO();
// CurrentIpCheckingProc.frequently = process.argv[2] || 1;
CurrentIpCheckingProc.connectionTimeout = process.argv[2] || '30000';
CurrentIpCheckingProc.webId = process.argv[3] || 1;
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
    // let image = `${created}.png`;
    // @ts-ignore
    // let imagePath = Lib.generatePath(__dirname, CONSTANT.PATH.FILE_DATA_PATH, image);
    // co 3 level: success, warning, error
    let tmp:any={}; //{server, statusCode, code, state, level, message, img} // tmp la bien tam giu thong tin cua notification
    // @ts-ignore
    let map: any = new Map(CONSTANT.STATUS_CODE);
    let metric: any;
    try{
        // @ts-ignore
        metric = await Lib.requestWithCurl(CurrentIpCheckingProc.url, null, CurrentIpCheckingProc.connectionTimeout);
        if(metric.status == '500'){
            // throw e/ neu co loi xay ra
            response = {
                DNSLookup: 0,
                InitConnection: 0,
                DataTransfer: 0,
                WaitTime: 0,
                SSLHandshake: 0,
                TotalTime: 0,
                averageResponseTime: 0,
                maxResponseTime:0,
                minResponseTime: 0,
                location: location

            };
            notification = {
                statusCode: metric.status,
                message: map.get(`${metric.status}`).code,
                state: NOTICE_RULE.state[1],
                level: "error"
            };

        }
        else if(metric.status != '200'){
            // throw e/ neu co loi xay ra
            response = {
                DNSLookup: metric.DNSLookup,
                InitConnection: metric.InitConnection,
                DataTransfer: metric.DataTransfer,
                WaitTime: metric.WaitTime,
                SSLHandshake: metric.SSLHandshake,
                TotalTime: metric.TotalTime,
                averageResponseTime: 0,
                maxResponseTime:0,
                minResponseTime: 0,
                location: location

            };
            notification = {
                statusCode: metric.status,
                message: map.get(`${metric.status}`).code,
                state: NOTICE_RULE.state[1],
                level: "error"
            };
        }
        else{
            // calculate metric
            // tong hop du lieu {DNSLookup, InitConnection, DataTransfer, ResponseTime, WaitTime }
            let respStateData: any = await responseStateDAO.findByCondition(` webid = ${CurrentIpCheckingProc.webId}`); //
            // adapter new => old response=>responseTime, notification => notification
            let web: any;
            if(respStateData != null){
                web={responseTime:{}, notification:{}};
                respStateData.forEach((e)=>{
                   web.responseTime[e.created] = e.response;
                   web.notification[e.created] = e.notification;
                });

            }
            else{
                web={responseTime:null, notification: null};
            }

            //

            let averageResponseTime:any = 0;
            let maxResponseTime: Number = Number.MIN_SAFE_INTEGER;
            let minResponseTime: Number = Number.MAX_SAFE_INTEGER;
            let firstResponse: Object={};

            firstResponse[created]={
                DNSLookup: metric.DNSLookup,
                InitConnection: metric.InitConnection,
                DataTransfer: metric.DataTransfer,
                WaitTime: metric.WaitTime,
                SSLHandshake: metric.SSLHandshake,
                TotalTime: metric.TotalTime,
                maxResponseTime: 0,
                minResponseTime: 0,
                location: location
            };

            let details: any = web.responseTime!=null?web.responseTime: firstResponse; // responseTime == detials
            details[created]=firstResponse[created];
            let totalResp: any = 0;
            let count=0;
            for(let i in details){
                if(details[i].TotalTime != Number.MIN_SAFE_INTEGER){
                    if(details[i].multipleCountries == undefined){
                        if(details[i].TotalTime != 0){
                            averageResponseTime += details[i].TotalTime;
                            maxResponseTime = maxResponseTime>=details[i].TotalTime?maxResponseTime:details[i].TotalTime;
                            minResponseTime = minResponseTime<=details[i].TotalTime?minResponseTime:details[i].TotalTime;
                            count++;
                        }
                    }
                    else{
                        if(details[i].TotalTime != 0){
                            averageResponseTime += details[i].response.TotalTime;
                            maxResponseTime = maxResponseTime>=details[i].response.TotalTime?maxResponseTime:details[i].response.TotalTime;
                            minResponseTime = minResponseTime<=details[i].response.TotalTime?minResponseTime:details[i].response.TotalTime;
                            count++;
                        }
                    }
                }
            }
            averageResponseTime = averageResponseTime/count;
            //
            response = {
                DNSLookup: metric.DNSLookup,
                InitConnection: metric.InitConnection,
                DataTransfer: metric.DataTransfer,
                WaitTime: metric.WaitTime,
                SSLHandshake: metric.SSLHandshake,
                TotalTime: metric.TotalTime,
                averageResponseTime: averageResponseTime,
                maxResponseTime: maxResponseTime,
                minResponseTime: minResponseTime,
                location: location

            };


            tmp.statusCode = metric.status;
            tmp.message= map.get(`${metric.status}`).code;
            tmp.state = NOTICE_RULE.state[0];

            if(tmp.statusCode =='200' && metric.TotalTime <= CONFIG.NOTICE_RULE.connectionTimeout["threshold"].success){
                tmp.level = "success";
            }
            else if(tmp.statusCode =='200' && metric.TotalTime > CONFIG.NOTICE_RULE.connectionTimeout["threshold"].success){
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

// runing test done
CurrentIpCheckingProc.run().then(rs=>{
    // send kq toi parent_process sau do kill
    // console.log(rs);
    process.send(rs);
    process.exit(0);
});

