import * as puppeteer from "puppeteer";
import * as fs from "fs";
const path = require('path');
const curl = require('curl');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Constants   = require('./Constants');
const config    = require('./Configs');


/**
 * ham tra ve duong dan tuong doi
 * @param currentPath
 * @param destinationFolder
 * @param filename
 */
function generatePath (currentPath, destinationFolder, filename?:null) {
    destinationFolder = filename==null?destinationFolder:`${destinationFolder}/${filename}`;
    return path.normalize(path.relative( currentPath,  destinationFolder));
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

/**
 * generate random String
 * @param length
 */
function generateRandomString(length) {
    let string: any = "";
    for(let i=0 ; i<length ; i++){
        let index = generateRandomIndex(32, 126);
        string += Constants.ASCII[index];
    }
    return string;
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
 * @return {DNSLookUp, InitConnection, DataTransfer, ResponseTime, WaitTime, notification: {status, server, message}}
 */
async function requestWithPuppeteer(url, imagePath, proxyServer=null, timeOutProxy=null){
    let result: any={};
    let response: any;
    let page: any;
    // @ts-ignore
    // let imagePath = generatePath(__dirname, Constants.PATH.FILE_DATA_PATH, `${new Date().toISOString()}.png`);
    let option = proxyServer==null?{headless: true}:{headless: true, args: [`--proxy-server=${proxyServer.ip}:${proxyServer.port}`]};
    const browser = await puppeteer.launch(option);
    let timeout = timeOutProxy==null?config.DEFAULT_TIMEOUT:timeOutProxy;
    try{
       page = await browser.newPage();
      response =  await page.goto(url, {
           waitUntil: "domcontentloaded",
           timeout: timeout
       });

       result = await page.evaluate(()=>{
          let nav:any={};
          let res:any={};
          let pagNav: any = window.performance.timing.toJSON();
           // console.log(pagNav); {DNSLookup, InitConnection, DataTransfer, ResponseTime, WaitTime }
           nav.DNSLookup      = pagNav.domainLookupEnd - pagNav.domainLookupStart;
           nav.InitConnection = pagNav.connectEnd - pagNav.connectStart;
           nav.DataTransfer = pagNav.responseEnd - pagNav.responseStart;
           nav.ResponseTime = pagNav.responseEnd - pagNav.requestStart;
           nav.WaitTime     = pagNav.responseStart - pagNav.requestStart;
          return nav;
        });

        result.status = response["_headers"].status==undefined?response["_status"]:response["_headers"].status;
        result.server = response["_headers"].server==undefined?"not available".toLocaleUpperCase():response["_headers"].server;
        // result.header = response["_headers"];
        // @ts-ignore
        if(result.status !== '200'){
            // chup lai anh neu loi xay ra
            await page.screenshot({
                // @ts-ignore
                path: imagePath

            });

        }
        else  {
            // chup lai anh neu loi xay ra
            // console.log(__dirname);
            await page.screenshot({
                // @ts-ignore
                path: imagePath,
                fullPage: true,
                omitBackground: false

            });
        }
        await browser.close();
        return result;

    }catch (e) {
        // chup lai anh neu co loi xay ra
        await page.screenshot({
            // @ts-ignore
            path: imagePath

        });
        await browser.close();
        return {
            server: "NOT AVAILABLE",
            status: '500',
            message: e.message
        }

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

// function convert query ?=abc thanh object

function getQueryUrl (url, ...params){
    let result={};
    let query = url.split('/')[url.split('/').length - 1];
    let tmp = new URLSearchParams(query);
    params.forEach(key=>{
        let value = tmp.get(key);
       if( key != null){
           result[key] = value;
       }
       else{
           result[key] = null;
       }
    });

    return result;

};
// tao moi 1 csv file
function convertDataToCsv(fields, data){
    let csv ="";
    fields = fields.join(',');
    data = data.map((value, index)=>{
       let tmp:any =[];
       for(let key in value){
           tmp.push(value[key]);
       }
       tmp = tmp.join(',');
       return tmp;
    });
    data = data.join('\n');
    csv = `${fields}\n${data}`;
    return csv;

}

// get domains from url

function getDomain(url) {
    const match = url.match(/:\/\/(.[^/]+)/);

    return match ? match[1] : '';
};


module.exports = {
    generatePath,
    generateRandomLink,
    generateRandomIndex,
    requestCurl,
    requestWithPuppeteer,
    base64EncodeUrl,
    base64DecodeUrl,
    getQueryUrl,
    convertDataToCsv,
    generateRandomString,
    getDomain
};
//
