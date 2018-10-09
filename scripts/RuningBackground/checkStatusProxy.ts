import * as puppeteer from "puppeteer";
const Libs = require('../../libs/Libs');
/**
 *
 * @param list
 */
const checkStatusProxy = async function (list){
    let linksList = await Libs.generateRandomLink();
    linksList.length = 5; // lay 5 phan tu dau tien cua mang
    // for(let i=0 ; i<list.length ; i++){
    //     let host = list[i][0];
    //     let port = list[i][1];
    //     let browser = await puppeteer.launch({args: [ `--proxy-server=${host}:${port}` ]});
    //     let page    = await browser.newPage();
    //     let response:any = await page.goto(linksList[i].href);
    //
    //     if(response.headers.status !=='200') return false;
    //
    // }
    console.log(linksList);

    return true;
}

checkStatusProxy('a').then(rs=>{
    console.log(rs);
})