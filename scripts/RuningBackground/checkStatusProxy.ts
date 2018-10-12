const Libs   = require('../../libs/Libs');
const utils  = require('util');
const exec   = utils.promisify(require('child_process').exec);
const connection = require('../../libs/Connections');
// sau 60 phut kiem tra 1 lan
setInterval(async ()=>{
    try{
        let client  = connections.createConnectionDb();
        let rs = await client.query(`SELECT*FROM Proxies`);
        let proxies = rs.rows;
        let links: any = await Libs.generateRandomLink();
        for(let x in proxies){
            let proxy = proxies[x];
            let result: any = await exec(`curl --proxy https://${proxy.host}:${proxy.port} -o /dev/null -s -w '%{http_code} ${links[Libs.generateRandomIndex(0, links.length-1)]}`);
            if(/2[0-9][0-9]/g.test(result.stdout) === false){
                // update lai status cua proxy active->inactive
                let sql = `UPDATE Proxies SET status=$1 WHERE id=$2`;
                await client.query(sql, ['inactive', proxy.id]);

            }
        }
    }catch(e){
        console.log(e.message);
        throw e;

    }
}, 30*60*1000);
//
// exec(`curl --proxy https://1.55.240.156:53281 -o /dev/null -s -w '%{http_code}' https://news.zing.vn`).then(rs=>{
//     console.log( rs);
// })