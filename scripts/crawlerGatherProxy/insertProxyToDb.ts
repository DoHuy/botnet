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
    let query = `INSERT INTO Proxies(data) VALUES($1)`;
    client.query(query, [data]).then(rs=>{
        console.log(rs.rows[0]);
    })
})();