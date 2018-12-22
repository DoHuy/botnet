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
const ExportingServiceInterface = require("./ExportingServiceInterface");
const util = require("util");
const FilterComparisonDataByDate = require("./FilterComparisonDataByDate");
const Lib = require("../../commons/Libs");
const filterComparisonDataByDate = new FilterComparisonDataByDate();
function ComparisonDataExporting() {
    ExportingServiceInterface.call(this);
}
util.inherits(ComparisonDataExporting, ExportingServiceInterface);
ComparisonDataExporting.prototype.doExporting = (jsonData) => __awaiter(this, void 0, void 0, function* () {
    let currentLocationCSV = "";
    let countriesCSV = "";
    let ispCSV = "";
    try {
        let data = yield filterComparisonDataByDate.doFiltering(jsonData);
        let dataCurrentLocation = data.currentLocation;
        dataCurrentLocation.metric.sub.push(dataCurrentLocation.metric.parent);
        let sitesList = dataCurrentLocation.metric.sub;
        sitesList = sitesList.map((element, index) => {
            let bestUpDownPage = dataCurrentLocation.evaluate.upDown.bestPage;
            let worstUpDownPage = dataCurrentLocation.evaluate.upDown.worstPage;
            let bestRespPage = dataCurrentLocation.evaluate.responseTime.bestPage;
            let worstRespPage = dataCurrentLocation.evaluate.responseTime.worstPage;
            if (bestRespPage.siteName == element.siteName && bestRespPage.url == element.url) {
                element.bestResponseTimePage = 1;
            }
            else {
                element.bestResponseTimePage = 0;
            }
            if (worstRespPage.siteName == element.sitenName && worstRespPage.url == element.url) {
                element.worstResponseTimePage = 1;
            }
            else {
                element.worstResponseTimePage = 0;
            }
            if (bestUpDownPage.siteName == element.siteName && bestUpDownPage.url == element.url) {
                element.bestUpDownPage = 1;
            }
            else {
                element.bestUpDownPage = 0;
            }
            if (worstUpDownPage.siteName == element.siteName && worstUpDownPage.url == element.url) {
                element.worstUpDownPage = 1;
            }
            else {
                element.worstUpDownPage = 0;
            }
            return element;
        });
        let currentLocationFields = ['siteName', 'url', 'averageResponseTime', 'maxResponseTime', 'minResponseTime',
            'totalUp', 'totalDown', 'bestResponseTimePage', 'worstResponseTimePage',
            'bestUpDownPage', 'worstUpDownPage'];
        currentLocationFields = currentLocationFields.map(e => e.toUpperCase());
        currentLocationCSV = Lib.convertDataToCsv(currentLocationFields, sitesList);
        let multipleCountriesData = data.multipleCountries;
        let countriesMap = new Map(multipleCountriesData.metric.parent.multipleCountries);
        let countries = [];
        let countriesForMap = [];
        let bestPageCountries = [];
        let worstPageCountries = [];
        multipleCountriesData.metric.sub.push(multipleCountriesData.metric.parent);
        let subSite = multipleCountriesData.metric.sub;
        countriesMap.forEach((e, key) => {
            countries.push(key.toUpperCase());
            countriesForMap.push(key);
            bestPageCountries.push(`best_${key}_updown_Page`.toUpperCase());
            worstPageCountries.push(`worst_${key}_updown_Page`.toUpperCase());
        });
        let countryFields = ['SITENAME', 'URL'].concat(countries).concat(bestPageCountries).concat(worstPageCountries);
        subSite = subSite.map((element, index) => {
            countriesForMap.forEach((country) => {
                let countryMetric = new Map(element.multipleCountries).get(country);
                let metric = `${countryMetric.up}\t${countryMetric.down}`;
                element[`${country}`] = metric;
            });
            countriesForMap.forEach((country) => {
                let evaluateMetric = new Map(data.multipleCountries.evaluate.upDown);
                let evaluate = evaluateMetric.get(country);
                if (evaluate.bestPage.siteName == element.siteName && evaluate.bestPage.url == element.url) {
                    element[`best${country}UpDownPage`] = 1;
                }
                else {
                    element[`best${country}UpDownPage`] = 0;
                }
            });
            countriesForMap.forEach((country) => {
                let evaluateMetric = new Map(data.multipleCountries.evaluate.upDown);
                let evaluate = evaluateMetric.get(country);
                if (evaluate.worstPage.siteName == element.siteName && evaluate.worstPage.url == element.url) {
                    element[`worst${country}UpDownPage`] = 1;
                }
                else {
                    element[`worst${country}UpDownPage`] = 0;
                }
            });
            delete element.multipleCountries;
            return element;
        });
        countriesCSV = Lib.convertDataToCsv(countryFields, subSite);
        let multipleIspData = data.multipleIsps;
        let ispMap = new Map(multipleIspData.metric.parent.multipleIsp);
        let isps = [];
        let ispsForMap = [];
        let bestPageIsp = [];
        let worstPageIsp = [];
        multipleIspData.metric.sub.push(multipleIspData.metric.parent);
        let ispSubSites = multipleIspData.metric.sub;
        ispMap.forEach((e, key) => {
            isps.push(key.toUpperCase());
            ispsForMap.push(key);
            bestPageIsp.push(`best_${key}_updown_Page`.toUpperCase());
            worstPageIsp.push(`worst_${key}_updown_Page`.toUpperCase());
        });
        let ispFields = ['SITENAME', 'URL'].concat(isps).concat(bestPageIsp).concat(worstPageIsp);
        ispSubSites = ispSubSites.map((element, index) => {
            ispsForMap.forEach((isp) => {
                let ispMetric = new Map(element.multipleIsp).get(isp);
                let metric = `${ispMetric.up}\t${ispMetric.down}`;
                element[`${isp}`] = metric;
            });
            ispsForMap.forEach((isp) => {
                let evaluateMetric = new Map(data.multipleIsps.evaluate.upDown);
                let evaluate = evaluateMetric.get(isp);
                if (evaluate.bestPage.siteName == element.siteName && evaluate.bestPage.url == element.url) {
                    element[`best${isp}UpDownPage`] = 1;
                }
                else {
                    element[`best${isp}UpDownPage`] = 0;
                }
            });
            ispsForMap.forEach((isp) => {
                let evaluateMetric = new Map(data.multipleIsps.evaluate.upDown);
                let evaluate = evaluateMetric.get(isp);
                if (evaluate.worstPage.siteName == element.siteName && evaluate.worstPage.url == element.url) {
                    element[`worst${isp}UpDownPage`] = 1;
                }
                else {
                    element[`worst${isp}UpDownPage`] = 0;
                }
            });
            delete element.multipleIsp;
            return element;
        });
        ispCSV = Lib.convertDataToCsv(ispFields, ispSubSites);
        return `${currentLocationCSV}\n\n\n${countriesCSV}\n\n\n${ispCSV}`;
    }
    catch (e) {
        throw e;
    }
});
module.exports = ComparisonDataExporting;
//# sourceMappingURL=ComparisonDataExporting.js.map