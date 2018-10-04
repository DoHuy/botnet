
const puppeteer = require("puppeteer");

const ssr = async function (url) {
    const  browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'});
    const html = await page.content();
    await browser.close();

    return html;
}

ssr("https://news.zing.vn/").then(html =>{

    console.log(html);
})