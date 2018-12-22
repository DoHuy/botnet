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
const CONSTANT = require("../../commons/Constants");
const Other = require("../../domains/Other/Other");
const other = new Other();
let OtherCon = {};
OtherCon.getCountries = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        return res.status(200).send({ flag: true, result: CONSTANT.COUNTRIES });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
OtherCon.getMonitoredWebsite = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let list = yield other.getMonitoredWebsite(req.params.id);
        return res.status(200).send({ flag: true, result: list });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
OtherCon.getAllParentMonitoredWebsite = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let list = yield other.getAllParentMonitoredWebsite(req.credentialId);
        return res.status(200).send({ flag: true, result: list });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
OtherCon.getDomainsOfWebsite = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let list = yield other.getDomainsOfWebsite(req.params.id);
        return res.status(200).send({ flag: true, result: list });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
module.exports = OtherCon;
//# sourceMappingURL=OtherCon.js.map