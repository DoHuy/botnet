
// @ts-ignore
const util = require('util');
// @ts-ignore
const exec = util.promisify(require('child_process').exec);
// @ts-ignore
const DomainsStateDAO = require('../../dao/DomainsStateDAO');
const domainsStateDAO = new DomainsStateDAO();


const frequently = process.argv[2] ||  180000 ;
const domainsList = process.argv[3] || JSON.stringify([{"domain":"www.techcombank.com.vn","expired":"2017-12-18T04:18:23.308Z"}]);
const ipList          = process.argv[4] || JSON.stringify(["103.4.128.120"]);
const domainsId   = process.argv[5] || 11


async function getIpOfDNS(domain) {
    let rs;
    try{
        rs = await exec(`ping -c 1 ${domain}`);
        return rs.stdout;
    } catch (e) {
        return e.stdout;
    }
}

const detectHack = async ()=>{
    let rs=[];
    try{
        let domainsArr: any = JSON.parse(domainsList);
        let absIpArr: any = JSON.parse(ipList);

        // await domainsStateDAO.transactionBegin();
        for(let i=0 ; i<domainsArr.length ; i++){
            let currentDate: any = new Date();
            let expiredDate: any = new Date(domainsArr[i].expired);
            let tmp: any = await getIpOfDNS(domainsArr[i].domain);
            // convert tmp
            tmp = tmp.match(/(\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)/gm)[0];

            // insert kq to db
            let notification={};

            if(currentDate - expiredDate > 0){
                notification = {
                    domain: domainsArr[i].domain,
                    state: 'expired'
                };
            }
            else if(absIpArr.indexOf(tmp) != -1){
                notification = {
                   domain: domainsArr[i].domain,
                   receivedIp: tmp,
                   state: 'safe'
                };
            }
            else{
                notification = {
                    domain: domainsArr[i].domain,
                    receivedIp:tmp,
                    state: 'hacked'
                };
            }

            let state = await domainsStateDAO.create({
                notification: notification,
                created: new Date().toISOString(),
                domainsId: domainsId
            });

        }
        // await domainsStateDAO.transactionCommit();

        // return state;

    }catch (e) {
        // await domainsStateDAO.transactionRollback();
        throw e;
    }
};

// detectHack();
//
setInterval(async ()=>{
    await detectHack();
}, frequently);
