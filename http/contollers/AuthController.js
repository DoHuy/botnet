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
const Auth = require("../../domains/Auth/Auth");
const auth = new Auth();
let AuthController = {};
AuthController.login = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let account = yield auth.authenticate(req.account);
            if (account.flag == true) {
                return res.status(200).send({ flag: true, credentialname: account.credential.credentialname, token: account.credential.token });
            }
            else {
                return res.status(404).send({ flag: false, message: account.message });
            }
        }
        catch (e) {
            return res.status(500).send({ flag: false, message: e.message });
        }
    });
};
AuthController.signUp = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let accountFlag = yield auth.createCredential(req.newAccount);
            if (accountFlag)
                return res.status(200).send({ flag: true, message: 'Sign up successfully !' });
            else
                return res.status(500).send({ flag: false, message: 'something wrong !' });
        }
        catch (e) {
            return res.status(500).send({ flag: false, message: e.message });
        }
    });
};
AuthController.verifyAccount = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield auth.verifyCredential(req.params);
            if (result)
                return res.status(200).send({ flag: true, message: 'Validate successfully !!' });
            else
                return res.status(500);
        }
        catch (e) {
            return res.status(500).send({ flag: false, message: e.message });
        }
    });
};
module.exports = AuthController;
//# sourceMappingURL=AuthController.js.map