
// @ts-ignore
const util = require('util');
// @ts-ignore
const exec = util.promisify(require('child_process').exec);
// @ts-ignore
const DomainsStateDAO = require('../../dao/DomainsStateDAO');
const domainsStateDAO = new DomainsStateDAO();


const frequently = process.argv[2] ||  180000 ;
const domainsList = process.argv[3] || JSON.stringify(['facebook.com','fb.com']);
const ipList          = process.argv[4] || JSON.stringify(['157.240.15.35']);
const domainsId   = process.argv[5] || 5

const detectHack = async ()=>{
    let rs=[];
    try{
        let domainsArr: any = JSON.parse(domainsList);
        let ipArr: any = JSON.parse(ipList);

        await domainsStateDAO.transactionBegin();
        for(let i=0 ; i<domainsArr.length ; i++){
            let tmp: any = await exec(`ping -c 1 ${domainsArr[i]}`);
            // convert tmp
            tmp = tmp.stdout.match(/(\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)/gm)[0];

            // inser kq to db
            let notification={};
            if(ipArr.indexOf(tmp) != -1){
                notification = {
                   domains: domainsArr[i],
                   checkedIp: tmp,
                   state: 'safe'
                };
            }
            else{
                notification = {
                    domains: domainsArr[i],
                    checkedIp: tmp,
                    state: 'hacked'
                };
            }

            let state = await domainsStateDAO.create({
                notification: notification,
                created: new Date().toISOString(),
                domainsId: domainsId
            });

        }
        await domainsStateDAO.transactionCommit();

        // return state;

    }catch (e) {
        await domainsStateDAO.transactionRollback();
        throw e;
    }
};

// detectHack();
//
setInterval(async ()=>{
    await detectHack();
}, frequently);
