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
    let result={};
    let timeout = timeOutProxy==null?config.DEFAULT_TIMEOUT:timeOutProxy;
    let cmd = typeof proxyServer === 'object'
                ? `curl --max-time ${timeout} --proxy http://${proxyServer.ip}:${proxyServer.port} -w "%{http_code} %{time_namelookup} %{time_connect} %{time_appconnect} %{time_pretransfer} %{time_redirect} %{time_starttransfer} %{time_total}" -o /dev/null -s "${url}"`
                : `curl --max-time ${timeout} -w "%{http_code} %{time_namelookup} %{time_connect} %{time_appconnect} %{time_pretransfer} %{time_redirect} %{time_starttransfer} %{time_total}" -o /dev/null -s "${url}"`;


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
async function requestWithPuppeteer(url, proxyServer=null, timeOutProxy=null){
    let result;
    let page;
    let option = proxyServer==null?{headless: false}:{headless: false, args: [`--proxy-server=${proxyServer.ip}:${proxyServer.port}`]};
    const browser = await puppeteer.launch(option);
    let timeout = timeOutProxy==null?config.DEFAULT_TIMEOUT:timeOutProxy*1000;
    try{
       page = await browser.newPage();
       await page.goto(url, {
           waitUntil: "domcontentloaded",
           timeout: timeout
       });

       const result = await page.evaluate(()=>{
          let result = window.performance.timing.toJSON();

          return result;
        })

        await browser.close();
        return result;

    }catch (e) {
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
// // // //
//
// setInterval(function () {
//     requestWithPuppeteer('https://github.com/GoogleChrome/puppeteer/issues/1535',{ip: '103.15.51.160', port: '8080'}, 60).then(rs=>{
//         console.log(rs);
//     }).catch(e=>{
//         console.log(e.message);
//     })
//
// }, 30*1000)

// console.log( generatePath(__dirname, Constants.PATH.FILE_DATA_PATH));