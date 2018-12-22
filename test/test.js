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
const test = (proxyServer, url) => __awaiter(this, void 0, void 0, function* () {
    let string = `curl --proxy 'http://${proxyServer.ip}:${proxyServer.port}' -L --output /dev/null --silent --show-error --write-out '%{http_code} %{time_namelookup} %{time_connect} %{time_appconnect} %{time_pretransfer} %{time_redirect} %{time_starttransfer} %{time_total}' '${url}'`;
    let result = yield exec(string);
});
test({ ip: '117.103.2.254', port: 58726 }, 'https://news.zing.vn')
    .then(rs => {
    console.log(rs);
});
//# sourceMappingURL=test.js.map