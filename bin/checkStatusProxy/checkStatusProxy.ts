// @ts-ignore
const Libs   = require('../../commons/Libs');
const utils  = require('util');
// @ts-ignore
const exec   = utils.promisify(require('child_process').exec);
// @ts-ignore
const ProxyDAO = require('../../dao/ProxyDAO');
const Configs = require('../../utils/Configs');
// @ts-ignore
let proxyDAO = new ProxyDAO();

// process.exit();

setInterval(async ()=>{
    try{
        console.log("Bat dau kiem tra trang thai cua cac proxy server ....");
        let rs = await proxyDAO.findAll();
        let proxies = rs; // convert to arr
        let link: any = Libs.generateRandomLink();
        // console.log(link);
        let dem=0;
        for(let proxy of proxies){
            // console.log("rows: ",proxy);
            try{
                let result: any = await Libs.requestCurl(link,{ip: proxy.ip  , port: proxy.port});
                if(proxy.status == 'inactive'){
                    await proxyDAO.modifyById(proxy.id, 'status', 'active');
                }
                console.log("responseTime: ", result);
                console.log(`${proxy.ip}: ${proxy.port} active`);
            }catch(e){
                // update lai status cua proxy active->inactive
                await proxyDAO.modifyById(proxy.id, 'status', 'inactive');
                console.log(`${proxy.ip}: ${proxy.port} inactive`);
                // throw e;
            }

        }
        console.log("So luong cac proxy inactive: ",++dem);
    }catch(e){
        console.log(e.message);
        throw e;

    }

}, Configs.CHECK_PROXY_TIME);
