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
let validator = new Validator();
let CoinMinerDetectingMid = {};
CoinMinerDetectingMid.beforeRegisterService = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let checked = yield validator.validateRegisterCoinMinerDetecting(req.params.id, req.credentialId);
            if (checked.flag == false) {
                return res.status(checked.statusCode).send({ flag: false, message: checked.message });
            }
            else
                next();
        }
        catch (e) {
            throw e;
        }
    });
};
CoinMinerDetectingMid.beforeDetect = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let checked = yield validator.validateDetectCoinMiner(req.params.id, req.credentialId);
            if (checked.flag == false) {
                return res.status(checked.statusCode).send({ flag: false, message: checked.message });
            }
            else {
                next();
            }
        }
        catch (e) {
            throw e;
        }
    });
};
CoinMinerDetectingMid.beforeDelete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let checked = yield validator.validateDeleteCoinMinerDetecting(req.params.id, req.credentialId);
        if (checked.flag == false) {
            return res.status(checked.statusCode).send({ flag: false, message: checked.message });
        }
        else
            next();
    }
    catch (e) {
        throw e;
    }
});
module.exports = CoinMinerDetectingMid;
//# sourceMappingURL=CoinMinerDetectingMid.js.map