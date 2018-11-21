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
    let image = `${created}.png`;
    // @ts-ignore
    let map: any = new Map(CONSTANT.STATUS_CODE);
    // @ts-ignore
    let imagePath = Lib.generatePath(__dirname, CONSTANT.PATH.FILE_DATA_PATH, image);

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
            metric = await Lib.requestWithPuppeteer(url, imagePath, {
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
                    ResponseTime: 0,
                    WaitTime: 0,
                    location: proxy.details

                };
                let notification = {
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
                let newResponse: any = {};
                let newNotification: any = {};

                newResponse = {
                    DNSLookup: metric.DNSLookup,
                    InitConnection: metric.InitConnection,
                    DataTransfer: metric.DataTransfer,
                    ResponseTime: metric.ResponseTime - Number.parseFloat(proxy.responseTime),
                    WaitTime: metric.WaitTime,
                    location: proxy.details
                };

                let level: any = newResponse.ResponseTime > CONFIG.NOTICE_RULE.connectionTimeout["threshold"].success ? CONFIG.NOTICE_RULE.levels[1] : CONFIG.NOTICE_RULE.levels[0];

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

    } catch (e) {
        throw e;

    }
    ;

    return {response, notification};
};

let arr = JSON.parse(process.argv[2]);
let connectionTimeout = process.argv[3] || 30;
let url = process.argv[4] || 'https://news.zong.vn';
calculateMetric(arr, connectionTimeout, url)
    .then(rs => {
        process.send(rs);
        process.exit(0);
        // console.log(rs);
    });