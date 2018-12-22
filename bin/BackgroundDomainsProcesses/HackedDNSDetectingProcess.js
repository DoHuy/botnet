var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const DomainsStateDAO = require('../../dao/DomainsStateDAO');
const domainsStateDAO = new DomainsStateDAO();
const frequently = process.argv[2] || 180000;
const domainsList = process.argv[3] || JSON.stringify([{ "domain": "www.techcombank.com.vn", "expired": "2017-12-18T04:18:23.308Z" }]);
const ipList = process.argv[4] || JSON.stringify(["103.4.128.120"]);
const domainsId = process.argv[5] || 11;
function getIpOfDNS(domain) {
    return __awaiter(this, void 0, void 0, function* () {
        let rs;
        try {
            rs = yield exec(`ping -c 1 ${domain}`);
            return rs.stdout;
        }
        catch (e) {
            return e.stdout;
        }
    });
}
const detectHack = () => __awaiter(this, void 0, void 0, function* () {
    let rs = [];
    try {
        let domainsArr = JSON.parse(domainsList);
        let absIpArr = JSON.parse(ipList);
        for (let i = 0; i < domainsArr.length; i++) {
            let currentDate = new Date();
            let expiredDate = new Date(domainsArr[i].expired);
            let tmp = yield getIpOfDNS(domainsArr[i].domain);
            tmp = tmp.match(/(\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)/gm)[0];
            let notification = {};
            if (currentDate - expiredDate > 0) {
                notification = {
                    domain: domainsArr[i].domain,
                    state: 'expired'
                };
            }
            else if (absIpArr.indexOf(tmp) != -1) {
                notification = {
                    domain: domainsArr[i].domain,
                    receivedIp: tmp,
                    state: 'safe'
                };
            }
            else {
                notification = {
                    domain: domainsArr[i].domain,
                    receivedIp: tmp,
                    state: 'hacked'
                };
            }
            let state = yield domainsStateDAO.create({
                notification: notification,
                created: new Date().toISOString(),
                domainsId: domainsId
            });
        }
    }
    catch (e) {
        throw e;
    }
});
setInterval(() => __awaiter(this, void 0, void 0, function* () {
    yield detectHack();
}), frequently);
//# sourceMappingURL=HackedDNSDetectingProcess.js.map