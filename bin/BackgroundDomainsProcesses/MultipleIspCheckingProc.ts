

//
// @ts-ignore
import *as ProxyDAO from '../../dao/ProxyDAO';
import * as Lib from "../../commons/Libs";
import * as CONSTANT from "../../commons/Constants";
import {NOTICE_RULE} from "../../commons/Configs";
import * as CONFIG from "../../commons/Configs";
let proxyDAO = new ProxyDAO();
let MultipleIspCheckingProc: any = {};

/**
 *
 * @param country
 * @param connectionTimeout
 * @param webId
 * @param url
 * @return  send ve parent_process{response, notification}
 */
const calculateMetric = async (city, connectionTimeout, url)=>{

    let response: any; // {created: {DNSLookup..., averageResponseTime, minResponseTime, maxResponseTime, upTotal, downTotal, location:{}}}
    let notification: any; //{notification: {server, status, level, message}
    let created: any = `${new Date().toISOString()}`;
    let metric: any;
    let image = `${created}.png`;
    // @ts-ignore
    let map: any = new Map(CONSTANT.STATUS_CODE);
    // @ts-ignore
    let imagePath = Lib.generatePath(__dirname, CONSTANT.PATH.FILE_DATA_PATH, image);

    // co 3 level: success, warning, error
    let tmp:any={}; //{server, statusCode, code, state, level, message, img} // tmp la bien tam giu thong tin cua notification
    // @ts-ignore

    // lay 3 proxy ba, MultipleIspCheckingProc.webIdt ki trong danh sach
    let proxyList: any = []; //
    const MAX = 1;
    for(let i=0; i<MAX ; i++){
        // @ts-ignore
        let index = Lib.generateRandomIndex(0, city.length-1);
        proxyList.push(city[index]);
        city = city.filter((value, i, arr)=>{
            return value != city[index];
        });
    }


    // cai dat 1 bien dem neu ca 3 lan request deu co loi thi tra ve la loi cua trang web
    let count=0;
    try{
        for(let i=0 ; i<proxyList.length ; i++){
            let proxy = proxyList[i];
            // @ts-ignore
            metric= await Lib.requestWithPuppeteer(url, imagePath, {ip: proxy.ip, port: proxy.port}, connectionTimeout);

            if((metric.status == '500' || metric.status == 500) && count != MAX-1){
                count++;
            }

            else if((metric.status == '500' || metric.status == 500) && count == MAX-1){
                // throw e/ neu co loi xay ra
                response = {
                    DNSLookup: 0,
                    InitConnection: 0,
                    DataTransfer: 0,
                    ResponseTime: 0,
                    WaitTime: 0,
                    location: proxy.details

                };
                notification = {
                    server: metric.server,
                    statusCode: metric.status,
                    code: map.get(`${metric.status}`).code,
                    message: metric.message,
                    state: NOTICE_RULE.state[1],
                    img: `http://${CONFIG.SERVER.HOST_SERVER}:${CONFIG.SERVER.SERVER_PORT}/${image}`,
                    level: "error"
                };

                return {response, notification};
            }
            else {
                // calculate metric
                let newResponse: any={};
                let newNotification: any = {};

                newResponse = {
                    DNSLookup: metric.DNSLookup,
                    InitConnection: metric.InitConnection,
                    DataTransfer: metric.DataTransfer,
                    ResponseTime: metric.ResponseTime - Number.parseFloat(proxy.responseTime),
                    WaitTime: metric.WaitTime,
                    location: proxy.details
                };

                let level: any = newResponse.ResponseTime>CONFIG.NOTICE_RULE.connectionTimeout["threshold"].success?CONFIG.NOTICE_RULE.levels[1]:CONFIG.NOTICE_RULE.levels[0];

                newNotification = {
                    server: metric.server,
                    statusCode: metric.status,
                    code: map.get(`${metric.status}`).code,
                    message: map.get(`${metric.status}`).message,
                    state: NOTICE_RULE.state[0],
                    img: `http://${CONFIG.SERVER.HOST_SERVER}:${CONFIG.SERVER.SERVER_PORT}/${image}`,
                    level: level
                };

                response = newResponse;
                notification = newNotification;

                break;
            }



        }

    }catch (e) {
        console.log(e);
        throw e;

    };

    return {response, notification};
};


MultipleIspCheckingProc.connectionTimeout = process.argv[2] || 90;
MultipleIspCheckingProc.url = process.argv[3] || "https://www.24h.com.vn/";
//[usa, uk, rusia, singapore, india , southkorea, japan, germany, france, Sweden]
/**
 *
 * @retun process.exit()
 */
MultipleIspCheckingProc.run = async ()=>{
    let hnVnpt=[], hnVietel=[], hcmVnpt=[], hcmVietel=[];

    let sql = `details->>'city' like '%Hanoi%' OR details->>'city' like '%Ho Chi Minh City%' AND status = 'active'`;

    try{
        let proxies = await proxyDAO.findByCondition(sql);
        proxies.forEach((e)=>{
            if(e.details.city == 'Hanoi' && e.details.isp == 'VNPT Corp'){
                hnVnpt.push(e);
            }
            else if(e.details.city == 'Hanoi' && e.details.isp == 'Viettel Group'){
                hnVietel.push(e);
            }
            else if(e.details.city == 'Ho Chi Minh City' && e.details.isp == 'Viettel Group'){
                hcmVietel.push(e);
            }
            else{
                hcmVnpt.push(e);
            }
        });

        /** usa=[], uk=[], russia=[], sing=[], india=[], korea=[], japan=[], germany=[], france=[], sweden=[];
         * @param country
         * @param connectionTimeout
         * @param webId
         * @param url
         */
        let hnVietelMetric: any = await calculateMetric(hnVietel, MultipleIspCheckingProc.connectionTimeout, MultipleIspCheckingProc.url);
        let hnVnptMetric: any = await calculateMetric(hnVnpt, MultipleIspCheckingProc.connectionTimeout, MultipleIspCheckingProc.url);
        let hcmVnptMetric: any = await calculateMetric(hcmVnpt, MultipleIspCheckingProc.connectionTimeout, MultipleIspCheckingProc.url);
        let hcmVietelMetric: any = await calculateMetric(hcmVietel, MultipleIspCheckingProc.connectionTimeout, MultipleIspCheckingProc.url);
        return {
            isps: ['hnVietel', 'hnVnpt', 'hcmVnpt', 'hcmVietel'],
            result: [{response: hnVietelMetric.response, notification: hnVietelMetric.notification},
                        {response: hnVnptMetric.response, notification: hnVnptMetric.notification},
                        {response: hcmVnptMetric.response, notification: hcmVnptMetric.notification},
                        {response: hcmVietelMetric.response, notification: hcmVietelMetric.notification}]
        }

    }catch (e) {
        throw e;
    }



    // return proxies;
};

// run
MultipleIspCheckingProc.run().then(rs=>{
    process.send(rs);
    process.exit(0);
    // console.log(JSON.stringify(rs));
});