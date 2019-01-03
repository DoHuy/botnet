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
const Validator = require("../../domains/Validator/Validator");
const validator = new Validator();
let CredentialManagerMid = {};
CredentialManagerMid.beforeResetAccount = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let check = validator.validateResetPassword(req.body);
        if (check.flag == false) {
            return res.status(400).send(check);
        }
        next();
    });
};
CredentialManagerMid.beforeChangePassword = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let check = validator.validateChangePassword(req.body);
        if (check.flag == false) {
            return res.status(400).send(check);
        }
        next();
    });
};
module.exports = CredentialManagerMid;
//# sourceMappingURL=CredentialManagerMid.js.map