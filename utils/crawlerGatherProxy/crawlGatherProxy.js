var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Puppeteer = require('puppeteer');
let fs = require('fs');
(() => __awaiter(this, void 0, void 0, function* () {
    const browser = yield Puppeteer.launch({ headless: true });
    const page = yield browser.newPage();
    yield page.goto('http://www.gatherproxy.com/proxylistbycountry');
    const urls = yield page.evaluate(() => {
        let titleLinks = document.querySelectorAll('ul.pc-list > li > a');
        let Links = [...titleLinks];
        let urls = Links.map(link => ({
            country: link.textContent.split(/[^a-zA-Z\+]/g).join(""),
            url: `http://www.gatherproxy.com${link.getAttribute('href').split(" ").join("%20")}`
        }));
        return urls;
    });
    let listProxy = {};
    for (let i = 0; i < urls.length; i++) {
        yield page.goto(urls[i].url);
        let result = yield page.evaluate(() => {
            let table = document.querySelectorAll('div.proxy-list > table > tbody > tr');
            let rows = [...table];
            rows = rows.slice(2, rows.length);
            let proxyList = {};
            let result = rows.map(element => {
                let tmp = [];
                let cols = element.children;
                for (let j = 0; j < cols.length; j++) {
                    if (Array.prototype.indexOf.call(cols, cols[j]) !== 5) {
                        tmp.push(cols[j].textContent);
                    }
                }
                tmp.push('active');
                return tmp;
            });
            return result;
        });
        listProxy[urls[i].country] = result;
    }
    let list = {};
    for (let i in listProxy) {
        list[i] = listProxy[i];
        let arrTmp = [];
        for (let j = 0; j < listProxy[i].length; j++) {
            let fields = ['xxx', 'ip', 'port', 'proxyType', 'xxx', 'xxx', 'responseTime', 'status'];
            let element = list[i][j];
            let objTmp = {};
            for (let k = 0; k < element.length; k++) {
                if (k == 0 || k == 4 || k == 5)
                    continue;
                objTmp[fields[k]] = element[k];
            }
            arrTmp.push(objTmp);
        }
        list[i] = arrTmp;
    }
    fs.writeFile('listproxy.json', JSON.stringify(list), 'utf8', (err) => {
        if (err)
            throw err;
        console.log('The file has been saved !');
    });
    yield browser.close();
    process.exit();
}))();
//# sourceMappingURL=crawlGatherProxy.js.map