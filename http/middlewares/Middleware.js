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
const Auth = require("../../domains/Auth/Auth");
let validator = new Validator();
let auth = new Auth();
let Middleware = {};
Middleware.AuthMiddleware = require('./AuthMiddleware');
Middleware.SettingMid = require('./SettingMid');
Middleware.UpDownCheckingMid = require('./UpDownCheckingMid');
Middleware.SearchingMid = require('./SearchingMid');
Middleware.HackedDNSDetectingMid = require('./HackedDNSDetectingMid');
Middleware.OtherMid = require('./OtherMid');
Middleware.verifyToken = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token;
        try {
            if (req.headers.authorization != null) {
                token = req.headers.authorization.split(" ")[1];
            }
            else {
                return res.status(400).send({ flag: false, message: 'empty token' });
            }
            let checked = yield auth.verifyToken(token);
            if (checked.flag == true) {
                req.credentialId = auth.decode(token).id;
                next();
            }
            else
                return res.status(401).send({ flag: false, message: checked.message });
        }
        catch (e) {
            return res.status(500).send({ flag: false, message: e.message });
        }
    });
};
module.exports = Middleware;
//# sourceMappingURL=Middleware.js.map