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
const ComparisonDataExporting = require("../../domains/MonitorServices/ComparisonDataExporting");
let comparisonExporting = new Monitor(new ComparisonDataExporting());
let ExportingCon = {};
ExportingCon.exportComparisonData = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let rs = yield comparisonExporting.executeExportingService(req.jsonData);
        res.setHeader('Content-disposition', `attachment;filename=${new Date().toISOString()}.csv`);
        res.set('Content-Type', 'text/csv');
        res.status(200).send(rs);
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
module.exports = ExportingCon;
//# sourceMappingURL=ExportingCon.js.map