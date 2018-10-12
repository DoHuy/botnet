/**
 *  File nay thuc hien nhiem vu crawl listproxy tu trang : http://www.gatherproxy.com
 */
const Puppeteer = require('puppeteer');
let fs        = require('fs');
const Connections = require('../../libs/Connections');
(async() => {
    const browser = await Puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://www.gatherproxy.com/proxylistbycountry');

    const urls = await page.evaluate(() => {
        let titleLinks = document.querySelectorAll('ul.pc-list > li > a');
        let Links = [...titleLinks];
        let urls = Links.map(link => ({
            country: link.textContent.split(/[^a-zA-Z\+]/g).join(""),
            url: `http://www.gatherproxy.com${link.getAttribute('href').split(" ").join("%20")}`
        }));
        return urls;
    });

    let listProxy={};
    for(let i=0 ; i<urls.length ; i++){
        await page.goto(urls[i].url);
        let result = await page.evaluate(()=>{
            let table = document.querySelectorAll('div.proxy-list > table > tbody > tr');
            let rows = [...table];
            rows = rows.slice(2, rows.length); // cat bo di 2 hang dau tien khong co y nghia
            let proxyList = {};
            let result = rows.map(element => {
                let tmp=[];
                let cols = element.children;

                for(let j=0 ; j< cols.length ; j++){
                    if(Array.prototype.indexOf.call(cols, cols[j]) !== 5){
                        tmp.push(cols[j].textContent);
                    }
                }
                tmp.push('active'); // flag help mark proxy be used

                return tmp;
            });
            return result;
        });

        listProxy[urls[i].country]=result;

    }
    //
    // // console.log(typeof listProxy);
    // fs.writeFile('listproxy.json', JSON.stringify(listProxy),'utf8', (err)=> {
    //     if(err) throw err;
    //     console.log('The file has been saved !');
    // });
    //  insert proxy vao bang proxies

    let client  =  Connections.createConnectionDb();
    let list;
    for(let i in listProxy){
        list = {};
        list["country"] = i;
        list['proxies'] = listProxy[i];
        let arrTmp=[];
        for(let j=0 ; j<listProxy[i].length ; j++){
            let fields = ['xxx', 'ip', 'port','proxyType', 'xxx', 'xxx', 'responseTime', 'status'];
            let element = list[i][j];
            let objTmp = {};
            for(let k=0 ; k<element.length ; k++){
                if(k==0 || k==4 || k==5) continue;
                objTmp[fields[k]] = element[k];
            }
            arrTmp.push(objTmp);

        }
        list["proxies"]=arrTmp;
    }
    //
    // console.log(typeof listProxy);
    fs.writeFile('listproxy.json', JSON.stringify(list),'utf8', (err)=> {
        if(err) throw err;
        console.log('The file has been saved !');
    });

    await browser.close();
    process.exit();
})();