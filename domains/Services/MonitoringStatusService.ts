const puppeteer = require('puppeteer');
const monitorStatusServiceInterface  = require('MonitoringStatusServiceInterface');
const util = require('util');
const lib  = require('../../libs/Libs');
// @ts-ignore
const connection = require('../../libs/Libs');
// constructor
function MonitoringStatusService() {
    monitorStatusServiceInterface.call(this);
    this.connection = connection.createConnectionDb();
}
// monitorStatusService implements monitorStatusServiceInterface
util.inherits(MonitoringStatusService, monitorStatusServiceInterface);

// ham nay tra ve random proxies

MonitoringStatusService.prototype.generateRandomProxy = async function(){
    let self = this;
    let sql = `SELECT*FROM Proxies`;
    let proxies;
    let rs;
    try{
        rs = await self.connection.query(sql);
    }catch(e){
        throw e;
    }

    proxies = rs.rows;


}

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