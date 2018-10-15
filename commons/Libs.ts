import * as puppeteer from "puppeteer";
import * as Fs from "fs";
const path = require('path');
const curl = require('curl');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Constants   = require('../utils/Constants');
const connection = require('./Connections');
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
async function requestCurl(url, proxyServer=null, timeOutProxy=null){
    let proxies;
    let result;
    let client = connection.createConnectionDb();
    try{
        const browser = await puppeteer.launch({
            headless: true,
            args: [ `--proxy-server=${proxyServer.ip}:${proxyServer.port}`]
        });
        const page = await browser.newPage();
        await page.goto(`${url}`, {
            timeout: timeOutProxy = timeOutProxy==null?config.NAVIGATION_TIME:timeOutProxy});

    }catch(e){
        console.log(e.message);
        throw e;
    }
    return result;
}

module.exports = {
    generatePath,
    generateRandomLink,
    generateRandomIndex,
    requestCurl
};
//
// requestCurl('https://news.zing.vn',{ip: '113.161.180.101', port: '8080'}).then(rs=>{
//     console.log(rs);
// }).catch(e=>{
//     console.log(e.message);
// })
