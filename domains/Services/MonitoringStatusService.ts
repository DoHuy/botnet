const puppeteer = require('puppeteer');
const monitorStatusServiceInterface  = require('MonitoringStatusServiceInterface');
const util = require('util');

// constructor
function MonitoringStatusService() {
    monitorStatusServiceInterface.call(this);
}
// monitorStatusService implements monitorStatusServiceInterface
util.inherits(MonitoringStatusService, monitorStatusServiceInterface);


// ham nay get ve data cua
MonitoringStatusService.prototype.getResponseTimeSingleLocation = async function () {
    let responseTime;
    try{
        let browser = await puppeteer.launch();
        let page    = await browser.newPage();
        await page.goto(this.url);
        responseTime = await page.evaluate(metric=> JSON.stringify(window.performance.timing));
    } catch(e){

        throw e;
    }

    return responseTime;

}
module.exports = MonitoringStatusService;