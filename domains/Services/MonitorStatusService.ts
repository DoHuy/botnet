const puppeteer = require('puppeteer');
const monitorStatusServiceInterface  = require('MonitorStatusServiceInterface');
const util = require('util');

// constructor
function MonitorStatusService() {
    monitorStatusServiceInterface.call(this);
}
// monitorStatusService implements monitorStatusServiceInterface
util.inherits(MonitorStatusService, monitorStatusServiceInterface);


// ham nay get ve data cua
MonitorStatusService.prototype.getResponseTimeSingleLocation = async function () {
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
module.exports = MonitorStatusService;