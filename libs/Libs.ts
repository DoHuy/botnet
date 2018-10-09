import * as Constants from "../utils/Constants";
import * as puppeteer from "puppeteer";
import * as Fs from "fs";
const path = require('path');
const curl = require('curl');



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

async function generateRandomLocation (numberLocations){
    let result = {};
    // let a = generateRandomLink();
    let data:any = await new Promise((resolve, reject) => {
        Fs.readFile( this.generatePath(__dirname, Constants.PATH.FILE_DATA_PATH, 'listproxy.json'), 'utf8', (err, data) =>{
            if(err) reject(err);
            resolve(data);
        } );
    }).then(result=>{
        return result;
    }).catch(e=> {throw e});

    let listProxy = JSON.parse(data);


}


module.exports = {
    generatePath,
    generateRandomLink,
    generateRandomLocation
};
