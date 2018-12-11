// @ts-ignore
import *as ExportingServiceInterface from './ExportingServiceInterface';
import *as util from 'util';
import *as FilterComparisonDataByDate from './FilterComparisonDataByDate';
import *as Lib from '../../commons/Libs';

// @ts-ignore
const filterComparisonDataByDate = new FilterComparisonDataByDate();

function ComparisonDataExporting() {
    // @ts-ignore
    ExportingServiceInterface.call(this);
}

//implement ServiceInterface
util.inherits(ComparisonDataExporting, ExportingServiceInterface);


ComparisonDataExporting.prototype.doExporting = async (jsonData) => {
    // get data export
    let currentLocationCSV = "";
    let countriesCSV = "";
    let ispCSV = "";

    try {
        let data = await filterComparisonDataByDate.doFiltering(jsonData);

        // create file csv
        // create table curentlocation
        let dataCurrentLocation = data.currentLocation;
        dataCurrentLocation.metric.sub.push(dataCurrentLocation.metric.parent);
        let sitesList = dataCurrentLocation.metric.sub;
        // tinh chinh siteList
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
        let currentLocationFields: any = ['siteName', 'url', 'averageResponseTime', 'maxResponseTime', 'minResponseTime',
            'totalUp', 'totalDown', 'bestResponseTimePage', 'worstResponseTimePage',
            'bestUpDownPage', 'worstUpDownPage'];
        currentLocationFields = currentLocationFields.map(e => e.toUpperCase());
        // @ts-ignore
        currentLocationCSV = Lib.convertDataToCsv(currentLocationFields, sitesList);
        // countries
        let multipleCountriesData: any = data.multipleCountries;
        let countriesMap: any = new Map(multipleCountriesData.metric.parent.multipleCountries);
        let countries: any = [];
        let countriesForMap: any = [];
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
        //ADD fields
        let countryFields: any = ['SITENAME', 'URL'].concat(countries).concat(bestPageCountries).concat(worstPageCountries);
        //
        subSite = subSite.map((element: any, index: any) => {
            countriesForMap.forEach((country) => {
                let countryMetric: any = new Map(element.multipleCountries).get(country);
                let metric = `${countryMetric.up}\t${countryMetric.down}`;
                element[`${country}`] = metric;
            });
            countriesForMap.forEach((country) => {
                let evaluateMetric: any = new Map(data.multipleCountries.evaluate.upDown);
                let evaluate: any = evaluateMetric.get(country);

                if (evaluate.bestPage.siteName == element.siteName && evaluate.bestPage.url == element.url) {
                    element[`best${country}UpDownPage`] = 1;
                }
                else {
                    element[`best${country}UpDownPage`] = 0;
                }

            });
            countriesForMap.forEach((country) => {
                let evaluateMetric: any = new Map(data.multipleCountries.evaluate.upDown);
                let evaluate: any = evaluateMetric.get(country);

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

        // convert csv
        // @ts-ignore
        countriesCSV = Lib.convertDataToCsv(countryFields, subSite);
        //

        // ispsCSV
        let multipleIspData: any = data.multipleIsps;
        let ispMap: any = new Map(multipleIspData.metric.parent.multipleIsp);
        let isps: any = [];
        let ispsForMap: any = [];
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
        //ADD fields
        let ispFields: any = ['SITENAME', 'URL'].concat(isps).concat(bestPageIsp).concat(worstPageIsp);
        //
        ispSubSites = ispSubSites.map((element: any, index: any) => {
            ispsForMap.forEach((isp) => {
                let ispMetric: any = new Map(element.multipleIsp).get(isp);
                let metric = `${ispMetric.up}\t${ispMetric.down}`;
                element[`${isp}`] = metric;
            });
            ispsForMap.forEach((isp) => {
                let evaluateMetric: any = new Map(data.multipleIsps.evaluate.upDown);
                let evaluate: any = evaluateMetric.get(isp);

                if (evaluate.bestPage.siteName == element.siteName && evaluate.bestPage.url == element.url) {
                    element[`best${isp}UpDownPage`] = 1;
                }
                else {
                    element[`best${isp}UpDownPage`] = 0;
                }

            });
            ispsForMap.forEach((isp) => {
                let evaluateMetric: any = new Map(data.multipleIsps.evaluate.upDown);
                let evaluate: any = evaluateMetric.get(isp);

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

        // convert csv
        // @ts-ignore
        ispCSV = Lib.convertDataToCsv(ispFields, ispSubSites);
        //

        return `${currentLocationCSV}\n\n\n${countriesCSV}\n\n\n${ispCSV}`;

    } catch (e) {
        throw e;
    }

};

module.exports = ComparisonDataExporting;


//test done
//let test = new ComparisonDataExporting();

// test.doExporting({webId: 18});