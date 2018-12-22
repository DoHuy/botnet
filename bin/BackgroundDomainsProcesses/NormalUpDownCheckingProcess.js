"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SubProcManager = require("./SubProcManager");
const ResponseStateDAO = require("../../dao/ResponseStateDAO");
let responseStateDAO = new ResponseStateDAO();
let NormalUpDownCheckingProcess = {};
NormalUpDownCheckingProcess.frequently = process.argv[2] || '18000';
NormalUpDownCheckingProcess.connectionTimeout = process.argv[3] || '30000';
NormalUpDownCheckingProcess.webId = process.argv[4] || 7;
NormalUpDownCheckingProcess.url = process.argv[5] || 'https://www.techcombank.com.vn/trang-chu';
NormalUpDownCheckingProcess.run = () => __awaiter(this, void 0, void 0, function* () {
    let newResponse = {};
    let newNotification = {};
    let created = new Date().toISOString();
    let proc = SubProcManager.initCurrentIpCheckingProc(NormalUpDownCheckingProcess.connectionTimeout, NormalUpDownCheckingProcess.webId, NormalUpDownCheckingProcess.url);
    let data = yield new Promise((resolve) => {
        proc.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
            resolve(message);
        }));
    });
    try {
        let rs = yield responseStateDAO.create({
            response: data.response,
            notification: data.notification,
            created: new Date().toISOString(),
            webId: NormalUpDownCheckingProcess.webId
        });
        return rs;
    }
    catch (e) {
        throw e;
    }
});
setInterval(() => __awaiter(this, void 0, void 0, function* () {
    yield NormalUpDownCheckingProcess.run();
}), NormalUpDownCheckingProcess.frequently);
//# sourceMappingURL=NormalUpDownCheckingProcess.js.map