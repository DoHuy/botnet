import * as Constants from "../utils/Constants";
import * as puppeteer from "puppeteer";
import * as Fs from "fs";
const path = require('path');
const curl = require('curl');


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
async function generateRandomLink(){

        let words = `${Constants.WORDS[0][Math.floor(Math.random()*Constants.WORDS[0].length)]}
                +${Constants.WORDS[1][Math.floor(Math.random()*Constants.WORDS[1].length)]}`;
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto(`https://www.google.com/search?source=hp&ei=vxm8W5qIOcjqwQOJkJvwDQ&q=${words}&oq=${words}&
                         gs_l=psy-ab.3..35i39k1l2j0i67k1l8.7249.8180.0.9019.8.6.0.0.0.0.111.519.1j4.5.0....0.
                         ..1c.1j4.64.psy-ab..3.5.519.0..0j0i131k1.0.SkKO5CdOuBY`);
        let links = await page.evaluate(()=>{
            let tags = document.querySelectorAll('div.r > a');
            let hrefList = Array.prototype.map.call(tags, element=>({href: element.getAttribute('href')}));
            return hrefList;
        });

        return links;

    }

/**
 * min va max la 2 so nguyen duong
 * return  so nam trong khoang tu min den max
 * @param min
 * @param max
 */
function generateRandomIndex(min, max){
    return min+Math.floor(Math.random() * max-min);
}



module.exports = {
    generatePath,
    generateRandomLink,
    generateRandomIndex
};
