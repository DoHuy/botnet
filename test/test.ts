// @ts-ignore
// @ts-ignore
const util = require('util');

// @ts-ignore
const exec = util.promisify(require('child_process').exec);


const test = async (proxyServer, url)=>{
    let string = `curl --proxy 'http://${proxyServer.ip}:${proxyServer.port}' -L --output /dev/null --silent --show-error --write-out '%{http_code} %{time_namelookup} %{time_connect} %{time_appconnect} %{time_pretransfer} %{time_redirect} %{time_starttransfer} %{time_total}' '${url}'`
   let result = await exec(string);
};

test({ip: '117.103.2.254', port: 58726}, 'https://news.zing.vn')
.then(rs=>{
    console.log(rs);
})