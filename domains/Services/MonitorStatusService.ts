const puppeteer = require('puppeteer');

function MonitoringService(url, opts=null) {
    this.url  = url;
    this.opts = opts || null;
}

MonitoringService.prototype.getResponseTimeSingleLocation = async function () {
    let responTime;
    try{
        let browser = await puppeteer.launch();
        let page    = await browser.newPage();
        await page.goto(this.url);
        responTime = await page.evaluate(metric=> JSON.stringify(window.performance.timing));
    } catch(e){

        throw e;
    }

    return responTime;

}

MonitoringService.prototype.getResponseTimeMultipleLocations = async function () {
    let responseTime;
    try{
        const browser = await puppeteer.launch({
            // Launch chromium using a proxy server on port 9876.
            // More on proxying:
            //    https://www.chromium.org/developers/design-documents/network-settings
            args: [ `--proxy-server=${this.opts.proxy.host}:${this.opts.proxy.port}`]
        });
        let page    = await browser.newPage();
        await page.goto(this.url);
        responseTime = await page.evaluate(metric=> JSON.stringify(window.performance.timing));
    } catch(e){

        throw e;
    }

    return responseTime;

}


module.exports = MonitoringService;