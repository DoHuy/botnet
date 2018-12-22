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
const Monitor = require("../../domains/MonitorServices/Monitor");
const NormalUpDownCheckingService = require("../../domains/MonitorServices/NormalUpDownCheckingService");
const MultipleCountryUpDownCheckingService = require("../../domains/MonitorServices/MultipleCountryUpDownCheckingService");
const ISPsUpDownCheckingService = require("../../domains/MonitorServices/ISPsUpDownCheckingService");
let monitor = new Monitor(new NormalUpDownCheckingService());
let monitorCountries = new Monitor(new MultipleCountryUpDownCheckingService());
let monitorIsps = new Monitor(new ISPsUpDownCheckingService());
let UpDownCheckingCon = {};
UpDownCheckingCon.getNormalUpDownInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let rs = yield monitor.executeMonitoringService(req.jsonData);
        return res.status(200).send({ flag: true, result: rs });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
UpDownCheckingCon.getCountriesInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let rs = yield monitorCountries.executeMonitoringService(req.jsonData);
        return res.status(200).send({ flag: true, result: rs });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
UpDownCheckingCon.getIspsInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let rs = yield monitorIsps.executeMonitoringService(req.jsonData);
        return res.status(200).send({ flag: true, result: rs });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
module.exports = UpDownCheckingCon;
//# sourceMappingURL=UpDownCheckingCon.js.map