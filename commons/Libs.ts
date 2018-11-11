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
    return min+Math.floor(Math.random() * (max-min));
}

/** khong duoc truyen nguoc
 * ham tao ra 1 req de lay resource timing
 * @param url ls link cua website muon check
 * @param proxyServer la 1 may chu proxy
 * @param timeOutProxy
 */
async function requestCurl(url, proxyServer=null, timeOutProxy=null){
    let rawResult: any={};
    let result: any={};
    let timeout = timeOutProxy==null?config.DEFAULT_TIMEOUT:timeOutProxy;
    let cmd = proxyServer !== null
                ? `curl --max-time ${timeout} --proxy http://${proxyServer.ip}:${proxyServer.port} -w "%{http_code} %{time_namelookup} %{time_connect} %{time_appconnect} %{time_pretransfer} %{time_redirect} %{time_starttransfer} %{time_total}" -o /dev/null -s "${url}"`
                : `curl --max-time ${timeout} -w "%{http_code} %{time_namelookup} %{time_connect} %{time_appconnect} %{time_pretransfer} %{time_redirect} %{time_starttransfer} %{time_total}" -o /dev/null -s "${url}"`;


    try{
       let tmp = await exec(cmd);

       let tmp2 = tmp.stdout.split(" ");
       let fields=['http_code', 'time_namelookup', 'time_connect',
                    'time_appconnect', 'time_pretransfer', 'time_redirect',
                    'time_starttransfer', 'time_total'];
       for(let i=0 ; i< fields.length ; i++){
           rawResult[fields[i]] = Number.parseFloat(tmp2[i].trim().replace(",", "."));
       }
        // console.log(rawResult);
       result.DNSLookup = rawResult.time_namelookup;
       // ssl+tcp(clientvsproxy+proxyvswebserver)
       result.ConnectionTime = rawResult.time_connect - rawResult.time_namelookup + rawResult.time_appconnect - rawResult.time_connect;
       result.WaitTime = rawResult.time_starttransfer - rawResult.time_appconnect;
       result.DataTransfer = rawResult.time_total - rawResult.time_starttransfer;
       result.TotalTime = rawResult.time_total;

    }catch (e) {
        throw e;
    }

    return result;
}

/** done
 *  khong duoc truyen nguoc
 * ham tao ra 1 req de lay resource timing
 * @param url ls link cua website muon check
 * @param proxyServer la 1 may chu proxy
 * @param timeOutProxy
 */
async function requestWithPuppeteer(url, proxyServer=null, timeOutProxy=null){
    let result;
    let page;
    let option = proxyServer==null?{headless: true}:{headless: true, args: [`--proxy-server=${proxyServer.ip}:${proxyServer.port}`]};
    const browser = await puppeteer.launch(option);
    let timeout = timeOutProxy==null?config.DEFAULT_TIMEOUT:timeOutProxy*1000;
    try{
       page = await browser.newPage();
      let response =  await page.goto(url, {
           waitUntil: "domcontentloaded",
           timeout: timeout
       });

       const result = await page.evaluate(()=>{
          let nav:any={};
          let res:any={};
          let pagNav: any = window.performance.timing.toJSON();
           // console.log(pagNav);
           nav.DNSLookup      = pagNav.domainLookupEnd - pagNav.domainLookupStart;
           nav.InitConnection = pagNav.connectEnd - pagNav.connectStart;
           nav.DataTransfer = pagNav.responseEnd - pagNav.responseStart;
           nav.ResponseTime = pagNav.responseEnd - pagNav.requestStart;
           nav.WaitTime     = pagNav.responseStart - pagNav.requestStart;
          return nav;
        });

        console.log(response["_headers"].status);
        result.status = response["_headers"].status;
        result.server = response["_headers"].server;
        if(result.status !== '200'){
            // chup lai anh neu loi xay ra
            await page.screenshot({
                // @ts-ignore
                path: generatePath(__dirname, Constants.PATH.FILE_DATA_PATH, `${new Date()}.png`),
                fullPage: true,
                omitBackground: true

            });
        }
        await browser.close();
        return result;

    }catch (e) {
        // chup lai anh neu co loi xay ra
        await page.screenshot({
            // @ts-ignore
            path: generatePath(__dirname, Constants.PATH.FILE_DATA_PATH, `${new Date()}.png`),
            fullPage: true,
            omitBackground: true

        });

        await browser.close();
        throw e;

    }

    await browser.close();


}

/**
 *  ham nay convert base64 to base64Url
 * @param str la chuoi thong tin
 * @return chuoi da duoc ma hoa bang base64Url
 */
function base64EncodeUrl(str){
    str = Buffer.from(str).toString('base64');
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}

/**
 *  ham nay convert base64 to base64Url
 * @param str la chuoi dang bi ma hoa bang base64Url
 * @return chuoi thong tin
 */
function base64DecodeUrl(str){
    str = (str + '===').slice(0, str.length + (str.length % 4));
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    return Buffer.from(str, 'base64').toString('ascii');
}

// function conver


module.exports = {
    generatePath,
    generateRandomLink,
    generateRandomIndex,
    requestCurl,
    requestWithPuppeteer,
    base64EncodeUrl,
    base64DecodeUrl
};
//
// requestCurl('https://news.zing.vn', {ip: '125.234.113.170', port: '35720'}).then(
//     (rs)=>{
//         console.log(rs);
//     }
// )
