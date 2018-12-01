// @ts-ignore
import *as ResponseStateDAO from "../../dao/ResponseStateDAO";
// @ts-ignore
import *as SubProcManager from './SubProcManager';
import*as CONSTANT from '../../commons/Constants';
import {log} from "util";

// 4 argument : frequently, connectionTimeout, webId, url
let AdvanceUpDownCheckingProcess: any = {};
// @ts-ignore
let responseStateDAO = new ResponseStateDAO();
let arrTest = JSON.stringify(['usa', 'uk', 'russia', 'japan']);

// input arguments
AdvanceUpDownCheckingProcess.frequently = process.argv[2] || 180000;
AdvanceUpDownCheckingProcess.connectionTimeout = process.argv[3] || 120000 ;
AdvanceUpDownCheckingProcess.webId = process.argv[4] || 108;
AdvanceUpDownCheckingProcess.url = process.argv[5] || "https://youtube.com";
AdvanceUpDownCheckingProcess.countries = process.argv[6] || arrTest;
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
    let countriesList: any=[];
    //convert countries
    // @ts-ignore
    let countriesMap = new Map(CONSTANT.COUNTRIES);
    if(typeof AdvanceUpDownCheckingProcess.countries != 'object'){
        AdvanceUpDownCheckingProcess.countries = JSON.parse(AdvanceUpDownCheckingProcess.countries);
    }
    AdvanceUpDownCheckingProcess.countries.forEach((e)=>{
        let kq = countriesMap.get(e);
        // console.log(kq);
        countriesList.push({key: e, value: kq});
    });
    countriesList = JSON.stringify(countriesList);
    //
    try{
        // init child_process checking
        // @ts-ignore
        let proc1 = SubProcManager.initCurrentIpCheckingProc(AdvanceUpDownCheckingProcess.connectionTimeout, AdvanceUpDownCheckingProcess.webId, AdvanceUpDownCheckingProcess.url);
        // @ts-ignore
        let proc2 = SubProcManager.initMultipleIspCheckingProc(AdvanceUpDownCheckingProcess.connectionTimeout, AdvanceUpDownCheckingProcess.url);
        // @ts-ignore
        let proc3 = SubProcManager.initMultipleCountryCheckingProc(AdvanceUpDownCheckingProcess.connectionTimeout, AdvanceUpDownCheckingProcess.url, countriesList);

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
            //

            // newResponse = web.responseTime==null?{}:web.responseTime;
            // newNotification=web.notification==null?{}:web.notification;

            let newResponse = {
                response: vals[0]["response"],
                multipleIsp: multipleIspResp,
                multipleCountries: multipleCountriesResp
            };

            let newNotification = {
                notification: vals[0]["notification"],
                multipleIsp: multipleIspNoti,
                multipleCountries: multipleCountriesNoti
            };

            await responseStateDAO.create(
                {
                    response: newResponse,
                    notification: newNotification,
                    created: created,
                    webId: AdvanceUpDownCheckingProcess.webId
                }
            );

        });
    }catch (e) {
        throw e;
    }

};

//run done

// AdvanceUpDownCheckingProcess.run();

// // // test done
setInterval(()=>{
    AdvanceUpDownCheckingProcess.run();
}, AdvanceUpDownCheckingProcess.frequently);
