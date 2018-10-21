// @ts-ignore
const fs = require('fs');
// @ts-ignore
const ProxyDAO = require('../../dao/ProxyDAO');
// @ts-ignore
let proxyDAO = new ProxyDAO();

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
    for(let i in data){
        for(let proxy of data[i]){
            let objTmp;
            objTmp = proxy;
            objTmp['country']=i;
            // let rs = await client.query(query, [proxy.ip,proxy.port, proxy.proxyType, proxy.responseTime, i, proxy.status ]);
            try{
                let rs = await proxyDAO.create(objTmp);
                console.log(rs);
                console.log("da insert duoc ", count++);
            }catch (e) {
                throw e;
            }
        }
    }

    process.exit();

})();