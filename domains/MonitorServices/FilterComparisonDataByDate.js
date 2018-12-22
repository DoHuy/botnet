"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const FilteringServiceInterface = require("./FilteringServiceInterface");
const MonitoredWebssiteDAO = require("../../dao/MonitoredWebsiteDAO");
const ResponseStateDAO = require("../../dao/ResponseStateDAO");
const monitoredWebsiteDAO = new MonitoredWebssiteDAO();
const responseStateDAO = new ResponseStateDAO();
function FilterComparisonDataByDate() {
    FilteringServiceInterface.call(this);
}
util.inherits(FilterComparisonDataByDate, FilteringServiceInterface);
function calculateMaxMinEachIsp(sub, isp) {
    let max = Number.MAX_SAFE_INTEGER;
    let min = Number.MIN_SAFE_INTEGER;
    let bestPage = {
        siteName: "best",
        url: "best",
        multipleIsp: [[isp, { up: 2 * min, down: min }]]
    };
    let worstPage = {
        siteName: "worst",
        url: "worst",
        multipleIsp: [[isp, { up: 2 * max, down: max }]]
    };
    sub.forEach(e => {
        let subData = new Map(e.multipleIsp).get(isp);
        let bestData = new Map(bestPage.multipleIsp).get(isp);
        let worstData = new Map(worstPage.multipleIsp).get(isp);
        if (bestData.up - bestData.down < subData.up - subData.down) {
            bestPage = e;
        }
        if (worstData.up - worstData.down > subData.up - subData.down) {
            worstPage = e;
        }
    });
    return [isp, { bestPage, worstPage }];
}
function calculateMaxMinEachCountry(sub, country) {
    let max = Number.MAX_SAFE_INTEGER;
    let min = Number.MIN_SAFE_INTEGER;
    let bestPage = {
        siteName: "best",
        url: "best",
        multipleCountries: [[country, { up: 2 * min, down: min }]]
    };
    let worstPage = {
        siteName: "worst",
        url: "worst",
        multipleCountries: [[country, { up: 2 * max, down: max }]]
    };
    sub.forEach(e => {
        let subData = new Map(e.multipleCountries).get(country);
        let bestData = new Map(bestPage.multipleCountries).get(country);
        let worstData = new Map(worstPage.multipleCountries).get(country);
        if (bestData.up - bestData.down < subData.up - subData.down) {
            bestPage = e;
        }
        if (worstData.up - worstData.down > subData.up - subData.down) {
            worstPage = e;
        }
    });
    return [country, { bestPage, worstPage }];
}
function calculateDataCurrentLocation(data) {
    let rs = {
        metric: { parent: {}, sub: [] },
        evaluate: {
            upDown: { bestPage: null, worstPage: null },
            responseTime: { bestPage: null, worstPage: null }
        }
    };
    let webIdList = new Set();
    for (let i = 0; i < data.length; i++) {
        webIdList.add(data[i].monitoredWeb.id);
    }
    let subLists = [];
    webIdList.forEach(e => {
        let metrics = data.filter(website => website.monitoredWeb.id == e);
        let totalUp, totalDown, bestPage;
        if (metrics[0].monitoredWeb.id == metrics[0].monitoredWeb.parent) {
            totalDown = 0;
            totalUp = 0;
            bestPage = {
                siteName: metrics[0].monitoredWeb.siteName,
                url: metrics[0].monitoredWeb.url,
                averageResponseTime: metrics[0].responseState.response.averageResponseTime,
                maxResponseTime: Number.MIN_SAFE_INTEGER,
                minResponseTime: Number.MAX_SAFE_INTEGER,
                totalUp: null,
                totalDown: null
            };
            metrics.forEach(metric => {
                if (metric.responseState.response.response != undefined) {
                    if (metric.responseState.notification.notification.state == 'up') {
                        totalUp++;
                    }
                    else {
                        totalDown++;
                    }
                    let tmpWeb = {
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
                }
                else {
                    if (metric.responseState.notification.state == 'up') {
                        totalUp++;
                    }
                    else {
                        totalDown++;
                    }
                    let tmpWeb = {
                        siteName: metric.monitoredWeb.siteName,
                        url: metric.monitoredWeb.url,
                        averageResponseTime: metric.responseState.response.averageResponseTime,
                        maxResponseTime: metric.responseState.response.maxResponseTime,
                        minResponseTime: metric.responseState.response.minResponseTime,
                        totalUp: 0,
                        totalDown: 0
                    };
                    bestPage = bestPage.maxResponseTime > tmpWeb.maxResponseTime
                        ? bestPage : tmpWeb;
                }
            });
            bestPage.totalUp = totalUp;
            bestPage.totalDown = totalDown;
            rs.metric.parent = bestPage;
        }
        else {
            let totalUp, totalDown, bestPage;
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
            metrics.forEach(metric => {
                if (metric.responseState.notification.notification.state == 'up') {
                    totalUp++;
                }
                else {
                    totalDown++;
                }
                let tmpWeb = {
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
            bestPage.totalUp = totalUp;
            bestPage.totalDown = totalDown;
            rs.metric.sub.push(bestPage);
        }
    });
    let bestUpDownPage = rs.metric.parent;
    let worstUpDownPage = rs.metric.parent;
    let bestRespTimePage = rs.metric.parent;
    let worstRespTimePage = rs.metric.parent;
    for (let i = 0; i < rs.metric.sub.length; i++) {
        bestUpDownPage = bestUpDownPage.totalUp - bestUpDownPage.totalDown > rs.metric.sub[i].totalUp - rs.metric.sub[i].totalDown ? bestUpDownPage : rs.metric.sub[i];
        worstUpDownPage = worstUpDownPage.totalUp - worstUpDownPage.totalDown < rs.metric.sub[i].totalUp - rs.metric.sub[i].totalDown ? worstUpDownPage : rs.metric.sub[i];
        bestRespTimePage = bestRespTimePage.maxResponseTime < rs.metric.sub[i].maxResponseTime ? bestRespTimePage : rs.metric.sub[i];
        worstRespTimePage = worstRespTimePage.maxResponseTime > rs.metric.sub[i].maxResponseTime ? worstRespTimePage : rs.metric.sub[i];
    }
    rs.evaluate.upDown.bestPage = bestUpDownPage;
    rs.evaluate.upDown.worstPage = worstUpDownPage;
    rs.evaluate.responseTime.bestPage = bestRespTimePage;
    rs.evaluate.responseTime.worstPage = worstRespTimePage;
    return rs;
}
function calculateDataMultipleCountries(data) {
    let rs = {
        metric: { parent: { siteName: null, url: null, multipleCountries: null }, sub: [] },
        evaluate: {
            upDown: []
        }
    };
    let webIdList = new Set();
    for (let i = 0; i < data.length; i++) {
        webIdList.add(data[i].monitoredWeb.id);
    }
    webIdList.forEach(webId => {
        let metrics = data.filter(website => website.monitoredWeb.id == webId);
        let upDown = [{ up: 0, down: 0 }, { up: 0, down: 0 }, { up: 0, down: 0 }, { up: 0, down: 0 }];
        let subTmp = {};
        metrics.forEach(metric => {
            if (metric.monitoredWeb.id == metric.monitoredWeb.parent && metric.responseState.response.multipleCountries !== undefined) {
                let multipleCountries = new Map(metric.responseState.response.multipleCountries);
                let orderCountryInMap = [];
                multipleCountries.forEach((value, key, map) => {
                    orderCountryInMap.push(key);
                });
                multipleCountries.forEach((value, key, map) => {
                    let index = orderCountryInMap.indexOf(key);
                    if (value.InitConnection == 0 && value.ResponseTime == 0) {
                        upDown[index].down++;
                    }
                    else {
                        upDown[index].up++;
                    }
                });
                orderCountryInMap = orderCountryInMap.map((e, i) => {
                    return [e, upDown[i]];
                });
                rs.metric.parent = {
                    siteName: metric.monitoredWeb.siteName,
                    url: metric.monitoredWeb.url,
                    multipleCountries: orderCountryInMap
                };
            }
            else if (metric.responseState.response.multipleCountries !== undefined) {
                let multipleCountries = new Map(metric.responseState.response.multipleCountries);
                let orderCountryInMap = [];
                multipleCountries.forEach((value, key, map) => {
                    orderCountryInMap.push(key);
                });
                multipleCountries.forEach((value, key, map) => {
                    let index = orderCountryInMap.indexOf(key);
                    if (value.InitConnection == 0 && value.ResponseTime == 0) {
                        upDown[index].down++;
                    }
                    else {
                        upDown[index].up++;
                    }
                });
                orderCountryInMap = orderCountryInMap.map((e, i) => {
                    return [e, upDown[i]];
                });
                subTmp = {
                    siteName: metric.monitoredWeb.siteName,
                    url: metric.monitoredWeb.url,
                    multipleCountries: orderCountryInMap
                };
            }
        });
        if (Object.keys(subTmp).length > 0) {
            rs.metric.sub.push(subTmp);
        }
    });
    let countriesMap = new Map(rs.metric.parent.multipleCountries);
    let countries = [];
    countriesMap.forEach((value, key, map) => {
        countries.push(key);
    });
    let subTmp = rs.metric.sub;
    subTmp.push(rs.metric.parent);
    countries.forEach(country => {
        let kq = calculateMaxMinEachCountry(subTmp, country);
        rs.evaluate.upDown.push(kq);
    });
    rs.metric.sub.pop();
    return rs;
}
function calculateDataMultipleIsps(data) {
    let rs = {
        metric: { parent: { siteName: null, url: null, multipleIsps: null }, sub: [] },
        evaluate: {
            upDown: []
        }
    };
    let webIdList = new Set();
    for (let i = 0; i < data.length; i++) {
        webIdList.add(data[i].monitoredWeb.id);
    }
    webIdList.forEach(webId => {
        let metrics = data.filter(website => website.monitoredWeb.id == webId);
        let upDown = [{ up: 0, down: 0 }, { up: 0, down: 0 }, { up: 0, down: 0 }, { up: 0, down: 0 }];
        let subTmp = {};
        metrics.forEach(metric => {
            if (metric.monitoredWeb.id == metric.monitoredWeb.parent && metric.responseState.response.multipleIsp !== undefined) {
                let multipleIsp = new Map(metric.responseState.response.multipleIsp);
                let orderIspInMap = [];
                multipleIsp.forEach((value, key, map) => {
                    orderIspInMap.push(key);
                });
                multipleIsp.forEach((value, key, map) => {
                    let index = orderIspInMap.indexOf(key);
                    if (value.InitConnection == 0 && value.ResponseTime == 0) {
                        upDown[index].down++;
                    }
                    else {
                        upDown[index].up++;
                    }
                });
                orderIspInMap = orderIspInMap.map((e, i) => {
                    return [e, upDown[i]];
                });
                rs.metric.parent = {
                    siteName: metric.monitoredWeb.siteName,
                    url: metric.monitoredWeb.url,
                    multipleIsp: orderIspInMap
                };
            }
            else if (metric.responseState.response.multipleIsp !== undefined) {
                let multipleIsp = new Map(metric.responseState.response.multipleIsp);
                let orderIspInMap = [];
                multipleIsp.forEach((value, key, map) => {
                    orderIspInMap.push(key);
                });
                multipleIsp.forEach((value, key, map) => {
                    let index = orderIspInMap.indexOf(key);
                    if (value.InitConnection == 0 && value.ResponseTime == 0) {
                        upDown[index].down++;
                    }
                    else {
                        upDown[index].up++;
                    }
                });
                orderIspInMap = orderIspInMap.map((e, i) => {
                    return [e, upDown[i]];
                });
                subTmp = {
                    siteName: metric.monitoredWeb.siteName,
                    url: metric.monitoredWeb.url,
                    multipleIsp: orderIspInMap
                };
            }
        });
        if (Object.keys(subTmp).length > 0) {
            rs.metric.sub.push(subTmp);
        }
    });
    let ispsMap = new Map(rs.metric.parent.multipleIsp);
    let isps = [];
    ispsMap.forEach((value, key, map) => {
        isps.push(key);
    });
    let subTmp = rs.metric.sub;
    subTmp.push(rs.metric.parent);
    isps.forEach(isp => {
        let kq = calculateMaxMinEachIsp(subTmp, isp);
        rs.evaluate.upDown.push(kq);
    });
    rs.metric.sub.pop();
    return rs;
}
FilterComparisonDataByDate.prototype.doFiltering = (jsonData) => __awaiter(this, void 0, void 0, function* () {
    let result = { currentLocation: {}, multipleCountries: null, multiplesIsps: null };
    let condition;
    if (jsonData.start == null || jsonData.end == null) {
        condition = `monitoredwebsites.parent=${jsonData.webId}`;
    }
    else {
        condition = `monitoredwebsites.parent=${jsonData.webId}
                    AND responsestates.created BETWEEN '${jsonData.start}' AND '${jsonData.end}'`;
    }
    try {
        let data = yield monitoredWebsiteDAO.findDataJoinWithResponseState(condition);
        result.currentLocation = data != null ? calculateDataCurrentLocation(data) : null;
        result.multipleCountries = data != null ? calculateDataMultipleCountries(data) : null;
        result.multipleIsps = data != null ? calculateDataMultipleIsps(data) : null;
        delete result["multiplesIsps"];
        return result;
    }
    catch (e) {
        throw e;
    }
});
module.exports = FilterComparisonDataByDate;
//# sourceMappingURL=FilterComparisonDataByDate.js.map