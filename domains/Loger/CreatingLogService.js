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
const LogDAO = require("../../dao/LogDAO");
let logDAO = new LogDAO();
class CreatingLogService {
    constructor(jsonData, credentialId) {
        this.jsonData = jsonData;
        this.credentialId = credentialId;
    }
    logCreatingMonitoredWebsite() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rs = yield logDAO.create({
                    log: this.jsonData.log,
                    created: this.jsonData.created,
                    credentialId: this.credentialId
                });
                return rs;
            }
            catch (e) {
                throw e;
            }
        });
    }
    logCreatingDNS() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rs = yield logDAO.create({
                    log: this.jsonData.log,
                    created: this.jsonData.created,
                    credentialId: this.credentialId
                });
                return rs;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
module.exports = CreatingLogService;
//# sourceMappingURL=CreatingLogService.js.map