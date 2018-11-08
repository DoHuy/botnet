// @ts-ignore
import request from "sync-request";

const fs = require('fs');
// @ts-ignore
const ProxyDAO = require('../../dao/ProxyDAO');
// @ts-ignore
const fetch = require('node-fetch');
// const sleep = require('sleep');
// const syncRequest = require('sync-request');
// @ts-ignore
let proxyDAO = new ProxyDAO();
//
//

// console.log(getDetailsLocationProxy('195.94.27.249'));

// let count=1;
// while(1){
//     getDetailsLocationProxy('185.26.153.4').then(rs=>{
//         console.log(rs);
//     }).catch(e=>{
//         console.log(e);
//     })
//
//     sleep.sleep(10);
//
// }

//
(async ()=>{
    let data:any = await new Promise((resolve, reject) => {
        fs.readFile(`listproxy.json`, 'utf8', (err, data)=>{
            if(err) reject(err);
            else resolve(data);
        });

    });

    data = JSON.parse(data);
    console.log(data);
    let count=0;
    let proxyList = [];
    for(let i in data){
        for(let proxy of data[i]){
            let objTmp;
            objTmp = proxy;
            objTmp.details = null;
            try{
                let rs = await proxyDAO.create(objTmp);
                console.log(rs);
                console.log("da insert duoc ", count++);
            }catch (e) {
                throw e;
            }
            // proxyList.push(objTmp);
        }
    }

    // console.log(proxyList);


    process.exit();

})();

// console.log('heeloo');
// sleep.sleep(5);
// console.log('huy');