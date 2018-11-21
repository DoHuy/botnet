// @ts-ignore
import *as MonitoredWebsiteDAO from "../../dao/MonitoredWebsiteDAO";
// @ts-ignore
import *as SubProcManager from './SubProcManager';


// 4 argument : frequently, connectionTimeout, webId, url
let AdvanceUpDownCheckingProcess: any = {};
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let arrTest = JSON.stringify([{key: 'usa', value: 'United States'}, {key: 'japan', value: 'Japan'}, {key: 'uk', value: 'United Kingdom'}, {key: 'russia', value: 'Russia'}]);

// input arguments
AdvanceUpDownCheckingProcess.frequently = process.argv[2] || 1;
AdvanceUpDownCheckingProcess.connectionTimeout = process.argv[3] || 30;
AdvanceUpDownCheckingProcess.webId = process.argv[4] || 10;
AdvanceUpDownCheckingProcess.url = process.argv[5] || "https://youtube.com";
AdvanceUpDownCheckingProcess.countriesList = process.argv[6] || arrTest;
/**
 *
 * tao luong con nhan message them lai vao csdl
 * {created: {DNSLookup..., averageResponseTime, minResponseTime, maxResponseTime, upTotal, downTotal, location:{}, multipleCountry:[], multipleIsp:[]}}
 //{notification: {server, status, level, message, state, img, multipleCountry:[], multipleIsp:[]}
 * @return void
 */
AdvanceUpDownCheckingProcess.run = async function () {
    let metric = {};
    let created = new Date().toISOString();
    try{
        // get old_notification, old_responseTime
        let web: any = await monitoredWebsiteDAO.findById(AdvanceUpDownCheckingProcess.webId);

        // init child_process checking
        let proc1 = SubProcManager.initCurrentIpCheckingProc(AdvanceUpDownCheckingProcess.connectionTimeout, AdvanceUpDownCheckingProcess.webId, AdvanceUpDownCheckingProcess.url);
        let proc2 = SubProcManager.initMultipleIspCheckingProc(AdvanceUpDownCheckingProcess.connectionTimeout, AdvanceUpDownCheckingProcess.url);
        let proc3 = SubProcManager.initMultipleCountryCheckingProc(AdvanceUpDownCheckingProcess.connectionTimeout, AdvanceUpDownCheckingProcess.url, AdvanceUpDownCheckingProcess.countriesList);

        let dataProc1 = new Promise((resolve)=>{
            proc1.on('message', (msg)=>{
               resolve(msg);
            });
        });
        //
        //
        // console.log(dataProc1);
        let dataProc2 = new Promise((resolve)=>{
            proc2.on('message', (msg)=>{
                resolve(msg);
            });
        });

        // console.log(dataProc2);
        let dataProc3 =  new Promise((resolve)=>{
            proc3.on('message', (msg)=>{
                resolve(msg);
            });
        });

        Promise.all([dataProc1, dataProc2, dataProc3]).then(async vals=>{
            // let local = vals[0];
            // metric={local, multipleIsp: vals[1], multipleCountries: vals[2]};
            // console.log(metric);
            // analaysis data

            let multipleIspResp = [];
            let multipleCountriesResp=[];
            let multipleIspNoti = [];
            let multipleCountriesNoti=[];

            for(let i=0 ; i<vals[1]["isps"].length ; i++ ){
                let isp = vals[1]["isps"][i];
                let result = vals[1]["result"][i];
                let country = vals[2]["countries"][i];
                let result2 = vals[2]["result"][i];
                multipleIspResp.push([isp, result.response]);
                multipleCountriesResp.push([country, result2.response]);
                multipleIspNoti.push([isp, result.notification]);
                multipleCountriesNoti.push([country, result2.notification]);
            }

            let newResponse: any;
            let newNotification: any;

            newResponse = web.responseTime==null?{}:web.responseTime;
            newNotification=web.notification==null?{}:web.notification;

            newResponse[created]={
                response: vals[0]["response"],
                multipleIsp: multipleIspResp,
                multipleCountries: multipleCountriesResp
            };

            newNotification[created]={
                notification: vals[0]["notification"],
                multipleIsp: multipleIspNoti,
                multipleCountries: multipleCountriesNoti
            };

            await monitoredWebsiteDAO.modifyById(AdvanceUpDownCheckingProcess.webId, ["responsetime", "notification"], [newResponse, newNotification]);

        });
    }catch (e) {
        throw e;
    }

};

//run

AdvanceUpDownCheckingProcess.run();