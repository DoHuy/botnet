import * as puppeteer from "puppeteer";
import * as Fs from "fs";
const path = require('path');
const curl = require('curl');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Constants   = require('../utils/Constants');
const config    = require('../utils/Configs');


/**
 * ham tra ve duong dan tuong doi
 * @param currentPath
 * @param destinationFolder
 * @param filename
 */
function generatePath (currentPath, destinationFolder, filename?:null) {
    destinationFolder = filename==null?destinationFolder:`${destinationFolder}/${filename}`;
    return path.relative( currentPath,  destinationFolder);
}

/**
 *  hàm ma đạo tra ve 1 mang cac arr link web-site ngau nhien
 */
function generateRandomLink(){
    return Constants.LINKS[generateRandomIndex(0, Constants.LINKS.length -1)];

    }

/**
 * 
 * return  so nam trong khoang tu min den max
 * @param min so nguuyen duong can duoi
 * @param max so nguyen duong can tren
 */
function generateRandomIndex(min, max){
    return min+Math.floor(Math.random() * max-min);
}

/** khong duoc truyen nguoc
 * ham tao ra 1 req de lay resource timing
 * @param url ls link cua website muon check
 * @param proxyServer la 1 may chu proxy
 * @param timeOutProxy
 */
async function requestCurl(url, proxyServer, timeOutProxy=null){
    let result={};
    let timeout = timeOutProxy==null?55:timeOutProxy;
    let cmd = `curl --max-time ${timeout} --proxy http://${proxyServer.ip}:${proxyServer.port} -w "%{http_code} %{time_namelookup} %{time_connect} %{time_appconnect} %{time_pretransfer} %{time_redirect} %{time_starttransfer} %{time_total}" -o /dev/null -s "${url}"`;

    try{
       let tmp = await exec(cmd);

       let tmp2 = tmp.stdout.split(" ");
       let fields=['httpCode', 'timeNameLockup', 'timeConnect',
                    'timeSSLHanshake', 'timePretransfer', 'timeRedirect',
                    'timeStartTransfer', 'timeTotal'];
       for(let i=0 ; i< fields.length ; i++){
           result[fields[i]] = tmp2[i];
       }

    }catch (e) {
        let  page;
        const browser = await puppeteer.launch({
            headless: false
        });

        try{
            page = await browser.newPage();
            await page.goto(url, {
                waitUntil: 'networkidle0',
                timeout: timeout*1000
            });
        }catch (err) {

            await page.screenshot({
                // @ts-ignore
                path: generatePath(__dirname, Constants.PATH.FILE_DATA_PATH, `${new Date()}.png`),
                fullPage: true,
                omitBackground: true

            });
            e = err;
            console.log(e);
        }

        await browser.close();
        throw e;
    }

    return result;

}

/** khong duoc truyen nguoc
 * ham tao ra 1 req de lay resource timing
 * @param url ls link cua website muon check
 * @param proxyServer la 1 may chu proxy
 * @param timeOutProxy
 */
// async function requestPuppeteer(url, proxyServer, timeOutProxy=null){
//     let result;
//     let page;
//     const browser = await puppeteer.launch({
//         headless: false,
//         args: [ `--proxy-server=${proxyServer.ip}:${proxyServer.port}`]
//     });
//     let timeout = timeOutProxy==null?55*1000:timeOutProxy*1000;
//     try{
//        page = await browser.newPage();
//        await page.goto(url, {
//            waitUntil: 'networkidle0',
//            timeout: timeout
//        });
//         result = await page.evaluate(() => {
//             return window.performance.timing
//         });
//
//     }catch (e) {
//         await page.screenshot({
//             // @ts-ignore
//             path: generatePath(__dirname, Constants.PATH.FILE_DATA_PATH, `${new Date()}.png`),
//             fullPage: true,
//             omitBackground: true
//
//         });
//         throw e;
//
//     }
//     await browser.close();
//     return result;
//
//
// }



module.exports = {
    generatePath,
    generateRandomLink,
    generateRandomIndex,
    requestCurl,
    // requestPuppeteer
};
// // //
// requestCurl('https://news.zingd.vn',{ip: '117.103.2.254', port: '58276'}, 55).then(rs=>{
//     console.log(rs);
// }).catch(e=>{
//     console.log(e.message);
// })


// console.log( generatePath(__dirname, Constants.PATH.FILE_DATA_PATH));