const connections = require('../../libs/Connections');
const Fs = require('fs');
(async ()=>{
    let data: any = await new Promise((resolve, reject) => {
        Fs.readFile('listproxy.json', 'utf8', (err, rs)=>{
            if(err) reject(err);
            resolve(rs);
        });
    });

    const client = connections.createConnectionDb();
    data = JSON.parse(data);
    // console.log(data);
    let count=0;
    for(let i in data){
        for(let proxy of data[i]){
            count++;
            let query = `INSERT INTO Proxies(ip, port, proxyType, responseTime, country, status) VALUES($1,$2,$3,$4,$5,$6)`;
            console.log(proxy.ip, proxy.port, proxy.proxyType, proxy.responseTime, i, proxy.status);
            let rs = await client.query(query, [proxy.ip,proxy.port, proxy.proxyType, proxy.responseTime, i, proxy.status ]);
        }
    }
    console.log("\nso luong ban ghi da them: ", count);
})();