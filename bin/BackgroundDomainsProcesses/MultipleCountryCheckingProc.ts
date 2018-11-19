//[usa, uk, rusia, singapore, india , southkorea, japan, germany, france, Sweden]
// @ts-ignore
import *as ProxyDAO from '../../dao/ProxyDAO';
import * as Lib from "../../commons/Libs";
import * as CONSTANT from "../../commons/Constants";
import {NOTICE_RULE} from "../../commons/Configs";
import * as CONFIG from "../../commons/Configs";
let proxyDAO = new ProxyDAO();
let MultipleCountryCheckingProc: any = {};

/**
 *
 * @param country
 * @param connectionTimeout
 * @param webId
 * @param url
 * @return  send ve parent_process{response, notification}
 */
const calculateMetric = async (country, connectionTimeout, webId, url)=>{

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

    // lay 3 proxy bat ki trong danh sach
    let proxyList: any = []; //
    const MAX = 3;
    for(let i=0; i<MAX ; i++){
        // @ts-ignore
        let index = Lib.generateRandomIndex(0, country.length-1);
        proxyList.push(country[index]);
        country = country.filter((value, i, arr)=>{
           return value != country[index];
        });
    }


    // cai dat 1 bien dem neu ca 3 lan request deu co loi thi tra ve la loi cua trang web
    let count=0;
    try{
        for(let i=0 ; i<proxyList.length ; i++){
            let proxy = proxyList[i];
            // @ts-ignore
           metric= await Lib.requestWithPuppeteer(url, imagePath, {ip: proxy.ip, port: proxy.port}, connectionTimeout);

            if(metric.status == '500' && count != MAX){
                count++;
            }

           else if(metric.status=='500' && count == MAX){
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
        throw e;

    };

    return {response, notification};
};


MultipleCountryCheckingProc.connectionTimeout = process.argv[2] || 90;
MultipleCountryCheckingProc.url = process.argv[3] || "https://www.24h.com.vn/";
//[usa, uk, rusia, singapore, india , southkorea, japan, germany, france, Sweden]
/**
 *
 * @retun process.exit()
 */
MultipleCountryCheckingProc.run = async ()=>{
    let usa=[], uk=[], russia=[], sing=[], india=[], korea=[], japan=[], germany=[], france=[], sweden=[];

    let sql = `details->>'country' like '%United States%' OR details->>'country' like '%United Kingdom%'
            OR details->>'country' like '%Russia%' OR details->>'country' like '%Singapore%'
            OR details->>'country' like '%India%' OR details->>'country' like '%South Korea%'
            OR details->>'country' like '%Japan%' OR details->>'country' like '%Germany%'
            OR details->>'country' like '%France%' OR details->>'country' like '%Sweden%'
            AND status = 'active'`;

    try{
        let proxies = await proxyDAO.findByCondition(sql);
        proxies.forEach((e)=>{
            switch (e.details.country) {
                case "United States":
                    usa.push(e);
                    break;
                case "United Kingdom":
                    uk.push(e);
                    break;
                case "Russia":
                    russia.push(e);
                    break;
                case "Singapore":
                    sing.push(e);
                    break;
                case "India":
                    india.push(e);
                    break;
                case "South Korea":
                    korea.push(e);
                    break;
                case "Japan":
                    japan.push(e);
                    break;
                case "Germany":
                    germany.push(e);
                    break;
                case "France":
                    france.push(e);
                    break;
                case "Sweden":
                    sweden.push(e);
                    break;
            }
        });

        /** usa=[], uk=[], russia=[], sing=[], india=[], korea=[], japan=[], germany=[], france=[], sweden=[];
         * @param country
         * @param connectionTimeout
         * @param webId
         * @param url
         */
        let usaMetric: any = await calculateMetric(usa, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.webId, MultipleCountryCheckingProc.url);
        let ukMetric: any = await calculateMetric(uk, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.webId, MultipleCountryCheckingProc.url);
        let russiaMetric: any = await calculateMetric(russia, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.webId, MultipleCountryCheckingProc.url);
        let singMetric: any = await calculateMetric(sing, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.webId, MultipleCountryCheckingProc.url);
        let indiaMetric: any = await calculateMetric(india, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.webId, MultipleCountryCheckingProc.url);
        let koreaMetric: any = await calculateMetric(korea, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.webId, MultipleCountryCheckingProc.url);
        let japanMetric: any = await calculateMetric(japan, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.webId, MultipleCountryCheckingProc.url);
        let germanyMetric: any = await calculateMetric(germany, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.webId, MultipleCountryCheckingProc.url);
        let franceMetric: any = await calculateMetric(france, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.webId, MultipleCountryCheckingProc.url);
        let swedenMetric: any = await calculateMetric(sweden, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.webId, MultipleCountryCheckingProc.url);

        return {
            response: [usaMetric.response, ukMetric.response, russiaMetric.response, singMetric.response,
                       indiaMetric.response, koreaMetric.response, japanMetric.response, germanyMetric.response,
                       franceMetric.response, swedenMetric.response],
            notification: [usaMetric.notification, ukMetric.notification, russiaMetric.notification, singMetric.notification,
                            indiaMetric.notification, koreaMetric.notification, japanMetric.notification, germanyMetric.notification,
                            franceMetric.notification, swedenMetric.notification]
        }

    }catch (e) {
        throw e;
    }



    // return proxies;
};

// run
MultipleCountryCheckingProc.run().then(rs=>{
    process.send(rs);
    process.exit();
});