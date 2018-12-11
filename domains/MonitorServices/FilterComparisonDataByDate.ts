import *as util from "util";
// @ts-ignore
import *as FilteringServiceInterface from './FilteringServiceInterface';
// @ts-ignore
import *as MonitoredWebssiteDAO from '../../dao/MonitoredWebsiteDAO';
// @ts-ignore
import *as ResponseStateDAO from '../../dao/ResponseStateDAO';
import {toASCII} from "punycode";

const monitoredWebsiteDAO = new MonitoredWebssiteDAO();
const responseStateDAO = new ResponseStateDAO();

function FilterComparisonDataByDate() {
    // @ts-ignore
    FilteringServiceInterface.call(this);
}

// implement ServiceInterface
util.inherits(FilterComparisonDataByDate, FilteringServiceInterface);

//

function calculateMaxMinEachIsp(sub, isp) {

    let max = Number.MAX_SAFE_INTEGER;
    let min = Number.MIN_SAFE_INTEGER;

    let bestPage: any = {
        siteName: "best",
        url: "best",
        multipleIsp: [[isp, {up: 2 * min, down: min}]]
    };
    let worstPage: any = {
        siteName: "worst",
        url: "worst",
        multipleIsp: [[isp, {up: 2 * max, down: max}]]
    };

    sub.forEach(e => {
        let subData: any = new Map(e.multipleIsp).get(isp);
        let bestData: any = new Map(bestPage.multipleIsp).get(isp);
        let worstData: any = new Map(worstPage.multipleIsp).get(isp);
        if (bestData.up - bestData.down < subData.up - subData.down) {
            bestPage = e;
        }

        if (worstData.up - worstData.down > subData.up - subData.down) {
            worstPage = e;
        }
    });

    return [isp, {bestPage, worstPage}];
}


function calculateMaxMinEachCountry(sub, country) {

    let max = Number.MAX_SAFE_INTEGER;
    let min = Number.MIN_SAFE_INTEGER;

    let bestPage: any = {
        siteName: "best",
        url: "best",
        multipleCountries: [[country, {up: 2 * min, down: min}]]
    };
    let worstPage: any = {
        siteName: "worst",
        url: "worst",
        multipleCountries: [[country, {up: 2 * max, down: max}]]
    };

    sub.forEach(e => {
        let subData: any = new Map(e.multipleCountries).get(country);
        let bestData: any = new Map(bestPage.multipleCountries).get(country);
        let worstData: any = new Map(worstPage.multipleCountries).get(country);
        if (bestData.up - bestData.down < subData.up - subData.down) {
            bestPage = e;
        }

        if (worstData.up - worstData.down > subData.up - subData.down) {
            worstPage = e;
        }
    });

    return [country, {bestPage, worstPage}];
}

function calculateDataCurrentLocation(data) {
    let rs: any = {
        metric: {parent: {}, sub: []},
        evaluate: {
            upDown: {bestPage: null, worstPage: null},
            responseTime: {bestPage: null, worstPage: null}
        }
    };

    // lay duoc danh sach web tu data input
    let webIdList = new Set();
    for (let i = 0; i < data.length; i++) {
        webIdList.add(data[i].monitoredWeb.id);
    }
    let subLists: any = [];

    webIdList.forEach(e => {
        let metrics = data.filter(website => website.monitoredWeb.id == e);
        let totalUp, totalDown, bestPage;
        if (metrics[0].monitoredWeb.id == metrics[0].monitoredWeb.parent) {
            // tim bestwebsite trong 1 list, va tong so up-down
            //init
            totalDown = 0;
            totalUp = 0;
            bestPage = {
                siteName: metrics[0].monitoredWeb.siteName,
                url: metrics[0].monitoredWeb.url,
                averageResponseTime: metrics[0].responseState.response.response.averageResponseTime,
                maxResponseTime: Number.MIN_SAFE_INTEGER,
                minResponseTime: Number.MAX_SAFE_INTEGER,
                totalUp: null,
                totalDown: null
            };
            //
            metrics.forEach(metric => {

                // calculate totalUp, totalDown
                if (metric.responseState.notification.notification.state == 'up') {
                    totalUp++;
                }
                else {
                    totalDown++;
                }
                //
                let tmpWeb: any = {
                    siteName: metric.monitoredWeb.siteName,
                    url: metric.monitoredWeb.url,
                    averageResponseTime: metric.responseState.response.response.averageResponseTime,
                    maxResponseTime: metric.responseState.response.response.maxResponseTime,
                    minResponseTime: metric.responseState.response.response.minResponseTime,
                    totalUp: 0,
                    totalDown: 0
                };

                bestPage = bestPage.maxResponseTime > tmpWeb.maxResponseTime
                    ? bestPage : tmpWeb;

            });
            //
            bestPage.totalUp = totalUp;
            bestPage.totalDown = totalDown;
            rs.metric.parent = bestPage;
        }
        else {
            // tim bestwebsite trong 1 list, va tong so up-down
            let totalUp, totalDown, bestPage;
            //init
            totalDown = 0;
            totalUp = 0;
            bestPage = {
                siteName: metrics[0].monitoredWeb.siteName,
                url: metrics[0].monitoredWeb.url,
                averageResponseTime: metrics[0].responseState.response.response.averageResponseTime,
                maxResponseTime: Number.MIN_SAFE_INTEGER,
                minResponseTime: Number.MAX_SAFE_INTEGER,
                totalUp: null,
                totalDown: null
            };
            //
            metrics.forEach(metric => {

                // calculate totalUp, totalDown
                if (metric.responseState.notification.notification.state == 'up') {
                    totalUp++;
                }
                else {
                    totalDown++;
                }
                //
                let tmpWeb: any = {
                    siteName: metric.monitoredWeb.siteName,
                    url: metric.monitoredWeb.url,
                    averageResponseTime: metric.responseState.response.response.averageResponseTime,
                    maxResponseTime: metric.responseState.response.response.maxResponseTime,
                    minResponseTime: metric.responseState.response.response.minResponseTime,
                    totalUp: 0,
                    totalDown: 0
                };

                bestPage = bestPage.maxResponseTime > tmpWeb.maxResponseTime
                    ? bestPage : tmpWeb;

            });
            //
            bestPage.totalUp = totalUp;
            bestPage.totalDown = totalDown;
            rs.metric.sub.push(bestPage);
        }
    });

    //calculate evaluate
    let bestUpDownPage = rs.metric.parent;
    let worstUpDownPage = rs.metric.parent;
    let bestRespTimePage = rs.metric.parent;
    let worstRespTimePage = rs.metric.parent;
    for (let i = 0; i < rs.metric.sub.length; i++) {
        // console.log(rs.metric.sub[i].maxResponseTime);
        bestUpDownPage = bestUpDownPage.totalUp - bestUpDownPage.totalDown > rs.metric.sub[i].totalUp - rs.metric.sub[i].totalDown ? bestUpDownPage : rs.metric.sub[i];
        worstUpDownPage = worstUpDownPage.totalUp - worstUpDownPage.totalDown < rs.metric.sub[i].totalUp - rs.metric.sub[i].totalDown ? worstUpDownPage : rs.metric.sub[i];
        bestRespTimePage = bestRespTimePage.maxResponseTime < rs.metric.sub[i].maxResponseTime ? bestRespTimePage : rs.metric.sub[i];
        worstRespTimePage = worstRespTimePage.maxResponseTime > rs.metric.sub[i].maxResponseTime ? worstRespTimePage : rs.metric.sub[i];

    }

    rs.evaluate.upDown.bestPage = bestUpDownPage;
    rs.evaluate.upDown.worstPage = worstUpDownPage;
    rs.evaluate.responseTime.bestPage = bestRespTimePage;
    rs.evaluate.responseTime.worstPage = worstRespTimePage;

    //

    return rs;

}

function calculateDataMultipleCountries(data) {
    let rs: any = {
        metric: {parent: {siteName: null, url: null, multipleCountries: null}, sub: []},
        evaluate: {
            upDown: []
        }
    };

    // lay duoc danh sach web tu data input
    let webIdList = new Set();
    for (let i = 0; i < data.length; i++) {
        webIdList.add(data[i].monitoredWeb.id);
    }

    webIdList.forEach(webId => {
        let metrics: any = data.filter(website => website.monitoredWeb.id == webId);
        let upDown = [{up: 0, down: 0}, {up: 0, down: 0}, {up: 0, down: 0}, {up: 0, down: 0}];
        let subTmp = {};


        metrics.forEach(metric => {
            if (metric.monitoredWeb.id == metric.monitoredWeb.parent && metric.responseState.response.multipleCountries !== undefined) {

                let multipleCountries = new Map(metric.responseState.response.multipleCountries);

                // get  countries
                let orderCountryInMap = [];
                multipleCountries.forEach((value, key, map) => {
                    orderCountryInMap.push(key);
                });
                //

                // calculate data
                multipleCountries.forEach((value: any, key: any, map) => {
                    let index = orderCountryInMap.indexOf(key);
                    if (value.InitConnection == 0 && value.ResponseTime == 0) {
                        upDown[index].down++;
                    }
                    else {
                        upDown[index].up++;
                    }
                });
                // combine up-down with name countries
                orderCountryInMap = orderCountryInMap.map((e, i) => {
                    return [e, upDown[i]];
                });
                // creata sub

                rs.metric.parent = {
                    siteName: metric.monitoredWeb.siteName,
                    url: metric.monitoredWeb.url,
                    multipleCountries: orderCountryInMap
                };


            }
            else if (metric.responseState.response.multipleCountries !== undefined) {
                let multipleCountries = new Map(metric.responseState.response.multipleCountries);

                // get  countries
                let orderCountryInMap = [];
                multipleCountries.forEach((value, key, map) => {
                    orderCountryInMap.push(key);
                });
                //

                // calculate data
                multipleCountries.forEach((value: any, key: any, map) => {
                    let index = orderCountryInMap.indexOf(key);
                    if (value.InitConnection == 0 && value.ResponseTime == 0) {
                        upDown[index].down++;
                    }
                    else {
                        upDown[index].up++;
                    }
                });
                // combine up-down with name countries
                orderCountryInMap = orderCountryInMap.map((e, i) => {
                    return [e, upDown[i]];
                });
                // creata sub

                subTmp = {
                    siteName: metric.monitoredWeb.siteName,
                    url: metric.monitoredWeb.url,
                    multipleCountries: orderCountryInMap
                };

                // rs.metric.sub.push(sub);


            }
        });
        // add subsite vao rs
        if (Object.keys(subTmp).length > 0) {
            rs.metric.sub.push(subTmp);
        }
    });

    // calculate bestPage - worstPage


    // lay so luong caac quoc gia

    // lay so luong cac isp
    let countriesMap = new Map(rs.metric.parent.multipleCountries);
    let countries = [];
    countriesMap.forEach((value, key, map) => {
        countries.push(key);
    });

    let subTmp = rs.metric.sub;
    subTmp.push(rs.metric.parent);

    // call ham khac o day
    countries.forEach(country => {
        //init best 1 thu
        let kq = calculateMaxMinEachCountry(subTmp, country);
        rs.evaluate.upDown.push(kq);
        //
    });
    // trick
    rs.metric.sub.pop();
    //

    return rs;
}

function calculateDataMultipleIsps(data) {

    let rs: any = {
        metric: {parent: {siteName: null, url: null, multipleIsps: null}, sub: []},
        evaluate: {
            upDown: []
        }
    };

    // lay duoc danh sach web tu data input
    let webIdList = new Set();
    for (let i = 0; i < data.length; i++) {
        webIdList.add(data[i].monitoredWeb.id);
    }

    webIdList.forEach(webId => {
        let metrics: any = data.filter(website => website.monitoredWeb.id == webId);
        let upDown = [{up: 0, down: 0}, {up: 0, down: 0}, {up: 0, down: 0}, {up: 0, down: 0}];
        let subTmp = {};


        metrics.forEach(metric => {
            if (metric.monitoredWeb.id == metric.monitoredWeb.parent && metric.responseState.response.multipleIsp !== undefined) {

                let multipleIsp = new Map(metric.responseState.response.multipleIsp);

                // get  countries
                let orderIspInMap = [];
                multipleIsp.forEach((value, key, map) => {
                    orderIspInMap.push(key);
                });
                //

                // calculate data
                multipleIsp.forEach((value: any, key: any, map) => {
                    let index = orderIspInMap.indexOf(key);
                    if (value.InitConnection == 0 && value.ResponseTime == 0) {
                        upDown[index].down++;
                    }
                    else {
                        upDown[index].up++;
                    }
                });
                // combine up-down with name countries
                orderIspInMap = orderIspInMap.map((e, i) => {
                    return [e, upDown[i]];
                });
                // creata sub

                rs.metric.parent = {
                    siteName: metric.monitoredWeb.siteName,
                    url: metric.monitoredWeb.url,
                    multipleIsp: orderIspInMap
                };


            }
            else if (metric.responseState.response.multipleIsp !== undefined) {
                let multipleIsp = new Map(metric.responseState.response.multipleIsp);

                // get  countries
                let orderIspInMap = [];
                multipleIsp.forEach((value, key, map) => {
                    orderIspInMap.push(key);
                });
                //

                // calculate data
                multipleIsp.forEach((value: any, key: any, map) => {
                    let index = orderIspInMap.indexOf(key);
                    if (value.InitConnection == 0 && value.ResponseTime == 0) {
                        upDown[index].down++;
                    }
                    else {
                        upDown[index].up++;
                    }
                });
                // combine up-down with name countries
                orderIspInMap = orderIspInMap.map((e, i) => {
                    return [e, upDown[i]];
                });
                // creata sub

                subTmp = {
                    siteName: metric.monitoredWeb.siteName,
                    url: metric.monitoredWeb.url,
                    multipleIsp: orderIspInMap
                };

                // rs.metric.sub.push(sub);


            }
        });
        // add subsite vao rs
        if (Object.keys(subTmp).length > 0) {
            rs.metric.sub.push(subTmp);
        }
    });

    // calculate bestPage - worstPage


    // lay so luong cac isp
    let ispsMap = new Map(rs.metric.parent.multipleIsp);
    let isps = [];
    ispsMap.forEach((value, key, map) => {
        isps.push(key);
    });

    let subTmp = rs.metric.sub;
    subTmp.push(rs.metric.parent);

    // call ham khac o day
    isps.forEach(isp => {
        //init best 1 thu
        let kq = calculateMaxMinEachIsp(subTmp, isp);
        rs.evaluate.upDown.push(kq);
        //
    });
    // trick
    rs.metric.sub.pop();
    //
    return rs;
}

/**
 *
 * @param jsonData = {start, end, webId} || all
 */
FilterComparisonDataByDate.prototype.doFiltering = async (jsonData) => {

    let result: any = {currentLocation: {}, multipleCountries: null, multiplesIsps: null};

    let condition: any;
    if (jsonData.start == null || jsonData.end == null) {
        condition = `monitoredwebsites.parent=${jsonData.webId}`;
    }
    else {
        condition = `monitoredwebsites.parent=${jsonData.webId}
                    AND responsestates.created BETWEEN '${jsonData.start}' AND '${jsonData.end}'`;
    }

    try {
        let data: any = await monitoredWebsiteDAO.findDataJoinWithResponseState(condition);

        //calculate metric
        result.currentLocation = data != null ? calculateDataCurrentLocation(data) : null;
        result.multipleCountries = data != null ? calculateDataMultipleCountries(data) : null;
        result.multipleIsps = data != null ? calculateDataMultipleIsps(data) : null;
        //
        // let keyResult = Object.keys(result);
        delete result["multiplesIsps"];
        return result;

    } catch (e) {
        throw e;
    }


};

module.exports = FilterComparisonDataByDate;

// // test done
// let t = new FilterComparisonDataByDate();
// //
// t.doFiltering({webId: 18}).then(rs => {
//     console.log(rs);
// })