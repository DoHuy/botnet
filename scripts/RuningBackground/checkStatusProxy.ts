const Libs   = require('../../libs/Libs');
const utils  = require('util');
const exec   = utils.promisify(require('child_process').exec);
// @ts-ignore
const connection = require('../../libs/Connections');

(async ()=>{
    try{
        let client  = connection.createConnectionDb();
        let rs = await client.query(`SELECT*FROM Proxies`);
        let proxies = [...rs.rows]; // convert to arr
        let link: any = Libs.generateRandomLink();
        console.log(link);
        let dem=0;
        for(let proxy of proxies){
            console.log("rows: ",proxy);
            try{
                let result: any = await Libs.requestCurl(link,{ip: proxy.ip  , port: proxy.port});
                console.log(`${proxy.ip}: ${proxy.port} active`);
            }catch(e){
                // update lai status cua proxy active->inactive
                let sql = `UPDATE Proxies SET status=$1 WHERE id=$2`;
                await client.query(sql, ['inactive', proxy.id]);
                console.log(`${proxy.ip}: ${proxy.port} inactive`);
                // throw e;
            }

            console.log(dem++);
        }
    }catch(e){
        console.log(e.message);
        throw e;

    }})();