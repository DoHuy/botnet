import * as puppeteer from "puppeteer";
import * as Lib from "../../commons/Libs";
import * as path from "path";
import * as fs from "fs";
import * as CONFIG from "../../commons/Configs";
// @ts-ignore
import * as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let CoinMinerDetectingProcess: any = {};


CoinMinerDetectingProcess.webId = process.argv[2] || 11;
CoinMinerDetectingProcess.run = async (webId) =>{
    try{
        let website: any = await monitoredWebsiteDAO.findById(webId);

        // get url script in resource
        let option = {headless: true};
        const browser: any = await puppeteer.launch(option);
        let page: any = await browser.newPage();
        let response = await page.goto(website.url, {
            waitUntil: "domcontentloaded"
        });
        let domains: any = await page.evaluate(()=>{
            //out function
            const getDomain = (url) => {
                const match = url.match(/:\/\/(.[^/]+)/);
                return match ? match[1] : '';
            };
            //
            let resource = performance.getEntriesByType("resource");
            // @ts-ignore
            resource = resource.filter(e=>e.initiatorType == "script");
            console.log(resource);
            // @ts-ignore
            resource = resource.map(e=> {
                // @ts-ignore
                let dns = getDomain(e.name);
                return dns;
            });

            return resource;

        });

        // close browser
        await browser.close();
        // console.log(domains);
        // so sanh voi db xem co domains nao nam trong blacklist hay khong
        let blackListPath = path.join(__dirname, '..', '..', 'data', 'store', 'coinminer', 'blacklist.txt');
        fs.readFile(blackListPath, 'utf8', (err, data)=>{
            if(err) throw err;
            let detected = [];
            let blackList: any = data.split('\n');

            blackList = blackList.map(e=>{
                // @ts-ignore
                let dns = Lib.getDomain(e);
                let tmp="";
                let rs = {
                    dns: 'hashforcash.us',
                    regex: /(hashforcash.us)/
                };

                if(dns[0] === '*'){
                    [].forEach.call(dns, (char, index)=>{
                        if(index != 0){
                            tmp+=char;
                        }

                    });
                }
                else if (dns.length > 0){
                    // console.log(dns);
                    tmp = dns;
                }

                if(tmp.charAt(0) === '.'){
                    rs = {
                        dns: '*'+tmp,
                        regex: new RegExp(`\\w+${tmp}`, 'gm')
                    };
                }
                else if (tmp.length > 0){
                    rs = {
                        dns: tmp,
                        regex: new RegExp((`(${tmp})`), 'gm')
                    };
                }
                return rs;
            });

            let kq_kiemtra = [];
            for(let i=0 ; i<blackList.length ; i++){
                for(let j=0 ; j<domains.length ; j++){
                    let boolean = blackList[i].regex.test(domains[j]);
                    // console.log(boolean);
                    if(boolean == true){
                        // console.log(JSON.stringify(blackList[i])+'\n'+ domains[j]);
                        detected.push(domains[j]);
                    }
                }
            }
            // write file result calculated
            let resultFilesDbPath = path.join(__dirname, '..', '..', 'data', 'store', 'filesDb');
            let resultFilePath = path.join(__dirname, '..', '..', 'data', 'store', 'filesDb', `coinminer_${webId}.json`);
            let content: any;
            if(fs.existsSync(resultFilesDbPath)){
                if(detected.length == 0){
                    content = {
                        notice: "safe",
                        detected:detected,
                        created: new Date().toISOString()
                    };

                    fs.writeFile(resultFilePath, JSON.stringify(content), 'utf8', (err)=>{
                        if(err) throw err;
                    });
                }
                else{
                    content = {
                        notice: "un_safe",
                        detected:detected,
                        created: new Date().toISOString()
                    };

                    fs.writeFile(resultFilePath, JSON.stringify(content), 'utf8', (err)=>{
                        if(err) throw err;
                    });
                }
            }
            else{
                fs.mkdirSync(resultFilesDbPath);
                if(detected.length == 0){
                    content = {
                        notice: "safe",
                        detected:detected,
                        created: new Date().toISOString()
                    };

                    fs.writeFile(resultFilePath, JSON.stringify(content), 'utf8', (err)=>{
                        if(err) throw err;
                    });
                }
                else{
                    content = {
                        notice: "un_safe",
                        detected:detected,
                        created: new Date().toISOString()
                    };

                    fs.writeFile(resultFilePath, JSON.stringify(content), 'utf8', (err)=>{
                        if(err) throw null;
                    });
                }

            }
            //

        });
        //
    }catch (e) {
        throw e;
    }
}

//test

// CoinMinerDetectingProcess.run(CoinMinerDetectingProcess.webId);

setInterval(async () =>{
    await CoinMinerDetectingProcess.run(CoinMinerDetectingProcess.webId);
}, CONFIG.DEFAULT_DETECT_COINMINER_TIME);