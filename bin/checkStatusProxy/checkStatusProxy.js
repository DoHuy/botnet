var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Libs = require('../../commons/Libs');
const utils = require('util');
const exec = utils.promisify(require('child_process').exec);
const ProxyDAO = require('../../dao/ProxyDAO');
const Configs = require('../../commons/Configs');
let proxyDAO = new ProxyDAO();
setInterval(() => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log("Bat dau kiem tra trang thai cua cac proxy server ....");
        let rs = yield proxyDAO.findAll();
        let proxies = rs;
        let link = Libs.generateRandomLink();
        let dem = 0;
        for (let proxy of proxies) {
            try {
                let result = yield Libs.requestCurl(link, { ip: proxy.ip, port: proxy.port });
                if (proxy.status == 'inactive') {
                    yield proxyDAO.modifyById(proxy.id, 'status', 'active');
                }
                console.log("responseTime: ", result);
                console.log(`${proxy.ip}: ${proxy.port} active`);
            }
            catch (e) {
                yield proxyDAO.modifyById(proxy.id, 'status', 'inactive');
                console.log(`${proxy.ip}: ${proxy.port} inactive`);
            }
        }
        console.log("So luong cac proxy inactive: ", ++dem);
    }
    catch (e) {
        console.log(e.message);
        throw e;
    }
}), Configs.CHECK_PROXY_TIME);
//# sourceMappingURL=checkStatusProxy.js.map