import*as Libs from '../../commons/Libs';
import*as CONFIG from '../../commons/Configs';
// @ts-ignore
import*as ProxyDAO from '../../dao/ProxyDAO';
import*as fetch from 'node-fetch';
import*as puppeteer from 'puppeteer';
let proxyDAO = new ProxyDAO();

async function getDetailsLocationProxy(proxy){
    let browser;
    try{
        browser = await puppeteer.launch({headless: true, args: [`--proxy-server=${proxy.ip}:${proxy.port}`]});
        const page = await browser.newPage();
        await page.goto('https://www.iplocation.net/',  {
            waitUntil: "domcontentloaded",
            timeout: 100000
        });
        // let response =  await page.goto(url);
        const rs = await page.evaluate(() => {
            let rs:any={};
            let trList:any = document.querySelectorAll(".table_dark_green > tbody > tr");
            trList = [...trList];
            let tdList1 = trList[2].children; let tdList2 = trList[3].children;
            tdList1=[...tdList1]; tdList2 = [...tdList2];
            rs.ip = tdList1[0].innerText.trim();
            rs.country = tdList1[1].innerText.trim();
            rs.region = tdList1[2].innerText.trim();
            rs.city = tdList1[3].innerText.trim();
            rs.isp = tdList2[0].innerText.trim();
            rs.organization = tdList2[1].innerText.trim();
            rs.lat = tdList2[2].innerText.trim();
            rs.long = tdList2[3].innerText.trim();
            return rs;
        });
        await browser.close();
        return rs;
    } catch (e) {
        await browser.close();
        throw e;
    }
}
//
(async ()=>{
    try{
        console.log("Bat dau update details cua cac proxy server ....");
        let rs = await proxyDAO.findByCondition(`details IS NULL AND status = 'active'`);
        let proxies = rs; // convert to arr
        // @ts-ignore
        let link: any = Libs.generateRandomLink();
        // console.log(link);
        let dem=0;
        for(let proxy of proxies){
            // console.log("rows: ",proxy);
            try{
                // @ts-ignore
                let result: any = await Libs.requestCurl(link,{ip: proxy.ip  , port: proxy.port}, CONFIG.DEFAULT_TIMEOUT);
                // neu active  thi update details cho server
                let details = await getDetailsLocationProxy({ip: proxy.ip, port: proxy.port});
                console.log(`${proxy.ip}: ${proxy.port} active`);
                console.log(details);
                await proxyDAO.modifyById(proxy.id, "details", details);
            }catch(e){
                // update lai status cua proxy active->inactive
                await proxyDAO.modifyById(proxy.id, 'status', 'inactive');
                console.log(`${proxy.ip}: ${proxy.port} inactive`);
                // throw e;
            }

        }
        console.log("So luong cac proxy inactive: ",++dem);
    }catch(e){
        // console.log(e.message);
        throw e;

    }
})();
// //
// getDetailsLocationProxy({ip: '176.196.238.210', port: '60449'}).then(rs=>{
//     console.log(rs);
// })

// process.exit();
