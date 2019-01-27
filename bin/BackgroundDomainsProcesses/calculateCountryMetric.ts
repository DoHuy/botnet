import * as CONSTANT from "../../commons/Constants";
import * as Lib from "../../commons/Libs";
import {NOTICE_RULE} from "../../commons/Configs";
import * as CONFIG from "../../commons/Configs";

/**
 *
 * @param country
 * @param connectionTimeout
 * @param webId
 * @param url
 * @return  send ve parent_process{response, notification}
 */
const calculateMetric = async (country, connectionTimeout, url) => {

    let response: any; // {created: {DNSLookup..., averageResponseTime, minResponseTime, maxResponseTime, upTotal, downTotal, location:{}}}
    let notification: any; //{notification: {server, status, level, message}
    let created: any = `${new Date().toISOString()}`;
    let metric: any;
    // let image = `${created}.png`;
    // @ts-ignore
    let map: any = new Map(CONSTANT.STATUS_CODE);
    // @ts-ignore
    // let imagePath = Lib.generatePath(__dirname, CONSTANT.PATH.FILE_DATA_PATH, image);

    // co 3 level: success, warning, error
    let tmp: any = {}; //{server, statusCode, code, state, level, message, img} // tmp la bien tam giu thong tin cua notification
    // @ts-ignore

    // lay 3 proxy bat ki trong danh sach
    let proxyList: any = []; //
    const MAX = 3;
    for (let i = 0; i < MAX; i++) {
        // @ts-ignore
        let index = Lib.generateRandomIndex(0, country.length - 1);
        proxyList.push(country[index]);
        country = country.filter((value, i, arr) => {
            return value != country[index];
        });
    }


    // cai dat 1 bien dem neu ca 3 lan request deu co loi thi tra ve la loi cua trang web
    let count = 0;
    try {
        for (let i = 0; i < proxyList.length; i++) {
            let proxy = proxyList[i];
            // @ts-ignore
            metric = await Lib.requestWithCurl(url, {
                ip: proxy.ip,
                port: proxy.port
            }, connectionTimeout);

            if (metric.status == '500' && count != MAX-1) {
                count++;
            }

            else if (metric.status == '500' && count == MAX-1) {
                // throw e/ neu co loi xay ra
                let response = {
                    DNSLookup: 0,
                    InitConnection: 0,
                    DataTransfer: 0,
                    TotalTime: 0,
                    WaitTime: 0,
                    SSLHandshake:0,
                    location: proxy.details

                };
                let notification = {
                    statusCode: metric.status,
                    message: map.get(`${metric.status}`).code,
                    state: NOTICE_RULE.state[1],
                    level: "error"
                };

                return {response, notification};
            }
            else if(metric.status != '200' && count == MAX-1){
                // throw e/ neu co loi xay ra
                let response = {
                    DNSLookup: metric.DNSLookup,
                    InitConnection: metric.InitConnection,
                    DataTransfer: metric.DataTransfer,
                    WaitTime: metric.WaitTime,
                    SSLHandshake: metric.SSLHandshake,
                    TotalTime: metric.TotalTime,
                    location: proxy.details

                };
                let notification = {
                    statusCode: metric.status,
                    message: map.get(`${metric.status}`).code,
                    state: NOTICE_RULE.state[1],
                    level: "error"
                };

                return {response, notification};
            }
            else {
                // calculate metric
                let newResponse: any = {};
                let newNotification: any = {};

                newResponse = {
                    DNSLookup: metric.DNSLookup,
                    InitConnection: metric.InitConnection,
                    DataTransfer: metric.DataTransfer,
                    WaitTime: metric.WaitTime,
                    SSLHandshake: metric.SSLHandshake,
                    TotalTime: metric.TotalTime,
                    location: proxy.details
                };

                let level: any = newResponse.TotalTime > CONFIG.NOTICE_RULE.connectionTimeout["threshold"].success ? CONFIG.NOTICE_RULE.levels[1] : CONFIG.NOTICE_RULE.levels[0];

                newNotification = {
                    statusCode: metric.status,
                    message: map.get(`${metric.status}`).message,
                    state: NOTICE_RULE.state[0],
                    level: level
                };

                response = newResponse;
                notification = newNotification;

                break;
            }


        }

    } catch (e) {
        throw e;

    }
    ;

    return {response, notification};
};

let arr = JSON.parse(process.argv[2]) //||  [{"id":103,"ip":"98.101.202.219","port":"3128","proxyType":"Transparent","responseTime":"40ms","details":{"ip":"98.101.202.219","country":"United States","region":"South Carolina","city":"Salters","isp":"Time Warner Cable Internet LLC","organization":"Time Warner Cable Internet LLC","lat":"33.5611","long":"-79.8300"},"status":"active"},{"id":121,"ip":"75.149.104.77","port":"38414","proxyType":"Elite","responseTime":"68ms","details":{"ip":"75.149.104.77","country":"United States","region":"Georgia","city":"Eden","isp":"Comcast Cable Communications, LLC","organization":"Comcast Cable Communications, LLC","lat":"32.1738","long":"-81.3907"},"status":"active"},{"id":523,"ip":"142.93.51.134","port":"8080","proxyType":"Transparent","responseTime":"35ms","details":{"ip":"142.93.51.134","country":"United States","region":"New Jersey","city":"North Bergen","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"40.8043","long":"-74.0121"},"status":"inactive"},{"id":502,"ip":"47.206.13.115","port":"40285","proxyType":"Elite","responseTime":"241ms","details":{"ip":"47.206.13.115","country":"United States","region":"Florida","city":"Clearwater","isp":"Frontier Communications of America, Inc.","organization":"Frontier Communications of America, Inc.","lat":"27.9839","long":"-82.7181"},"status":"active"},{"id":118,"ip":"18.234.209.2","port":"3128","proxyType":"Transparent","responseTime":"38ms","details":{"ip":"18.234.209.2","country":"United States","region":"Virginia","city":"Ashburn","isp":"Amazon.com, Inc.","organization":"Amazon Technologies Inc.","lat":"39.0481","long":"-77.4728"},"status":"active"},{"id":125,"ip":"142.0.60.27","port":"32884","proxyType":"Elite","responseTime":"59ms","details":{"ip":"142.0.60.27","country":"United States","region":"Indiana","city":"Evansville","isp":"SIT-CO, LLC","organization":"SITCO","lat":"38.0281","long":"-87.5119"},"status":"active"},{"id":102,"ip":"40.114.14.173","port":"80","proxyType":"Elite","responseTime":"778ms","details":{"ip":"40.114.14.173","country":"United States","region":"Virginia","city":"Washington","isp":"Microsoft Corporation","organization":"Microsoft Corporation","lat":"38.7078","long":"-78.1566"},"status":"active"},{"id":104,"ip":"24.35.1.5","port":"36624","proxyType":"Elite","responseTime":"962ms","details":{"ip":"24.35.1.5","country":"United States","region":"Maryland","city":"Glen Burnie","isp":"WideOpenWest Finance LLC","organization":"Broadstripe","lat":"39.1702","long":"-76.5798"},"status":"active"},{"id":123,"ip":"100.39.36.100","port":"35531","proxyType":"Elite","responseTime":"43ms","details":{"ip":"100.39.36.100","country":"United States","region":"California","city":"Huntington Beach","isp":"Frontier Communications of America, Inc.","organization":"MCI Communications Services, Inc. d/b/a Verizon Business","lat":"33.7180","long":"-118.0500"},"status":"active"},{"id":116,"ip":"75.117.151.165","port":"53068","proxyType":"Elite","responseTime":"196ms","details":{"ip":"75.117.151.164","country":"United States","region":"Georgia","city":"Douglas","isp":"Windstream Communications LLC","organization":"Windstream Communications LLC","lat":"31.4973","long":"-82.8465"},"status":"active"},{"id":503,"ip":"47.251.50.29","port":"3128","proxyType":"Transparent","responseTime":"30ms","details":{"ip":"47.251.50.29","country":"United States","region":"California","city":"San Mateo","isp":"Alibaba (China) Technology Co., Ltd.","organization":"Alibaba (China) Technology Co., Ltd.","lat":"37.5507","long":"-122.3280"},"status":"active"},{"id":657,"ip":"185.179.204.35","port":"3128","proxyType":"Elite","responseTime":"641ms","details":{"ip":"162.253.153.79","country":"United States","region":"Nevada","city":"Las Vegas","isp":"Reprise Hosting","organization":"Reprise Hosting","lat":"36.1008","long":"-115.1360"},"status":"active"},{"id":670,"ip":"185.179.204.228","port":"3128","proxyType":"Elite","responseTime":"365ms","details":{"ip":"162.253.153.79","country":"United States","region":"Nevada","city":"Las Vegas","isp":"Reprise Hosting","organization":"Reprise Hosting","lat":"36.1008","long":"-115.1360"},"status":"active"},{"id":1053,"ip":"178.128.145.181","port":"8080","proxyType":"Transparent","responseTime":"34ms","details":{"ip":"178.128.145.181","country":"United States","region":"New Jersey","city":"North Bergen","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"40.8043","long":"-74.0121"},"status":"active"},{"id":1061,"ip":"178.128.154.246","port":"8080","proxyType":"Transparent","responseTime":"33ms","details":{"ip":"178.128.154.246","country":"United States","region":"New Jersey","city":"North Bergen","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"40.8043","long":"-74.0121"},"status":"active"},{"id":1067,"ip":"178.128.150.225","port":"8080","proxyType":"Transparent","responseTime":"34ms","details":{"ip":"178.128.150.225","country":"United States","region":"New Jersey","city":"North Bergen","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"40.8043","long":"-74.0121"},"status":"active"},{"id":107,"ip":"160.2.52.234","port":"8080","proxyType":"Elite","responseTime":"275ms","details":{"ip":"160.2.52.234","country":"United States","region":"Idaho","city":"Pocatello","isp":"CABLE ONE, INC.","organization":"CABLE ONE, INC.","lat":"42.8713","long":"-112.4460"},"status":"active"},{"id":113,"ip":"66.191.121.167","port":"54342","proxyType":"Elite","responseTime":"226ms","details":{"ip":"66.191.121.167","country":"United States","region":"Wisconsin","city":"Clintonville","isp":"Charter Communications","organization":"Charter Communications","lat":"44.6205","long":"-88.7623"},"status":"active"},{"id":101,"ip":"173.0.96.46","port":"34746","proxyType":"Elite","responseTime":"56ms","details":{"ip":"173.0.96.46","country":"United States","region":"Virginia","city":"Lancaster","isp":"Northern Neck Wireless Internet Services LLC","organization":"Northern Neck Wireless Internet Services LLC","lat":"37.7395","long":"-76.5002"},"status":"active"},{"id":416,"ip":"131.255.4.221","port":"5836","proxyType":"Elite","responseTime":"342ms","details":{"ip":"131.255.4.221","country":"United States","region":"Indiana","city":"Indianapolis","isp":"InterBS S.R.L. (BAEHOST)","organization":"InterBS S.R.L. (BAEHOST)","lat":"39.8588","long":"-86.0133"},"status":"active"}];
let connectionTimeout = process.argv[3] //|| 30000;
let url = process.argv[4]// || "https://youtube.com";
calculateMetric(arr, connectionTimeout, url)
    .then(rs => {
        process.send(rs);
        process.exit(0);
        // console.log(rs);
    });