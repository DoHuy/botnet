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
const FilterByDate = require("../../domains/MonitorServices/FilterByDate");
const FilterComparisonDataByDate = require("../../domains/MonitorServices/FilterComparisonDataByDate");
let cordinator = new Monitor(new FilterByDate());
let comparisonDataFiltering = new Monitor(new FilterComparisonDataByDate());
let SearchingCon = {};
SearchingCon.searchByDate = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let rs = yield cordinator.executeFilteringService(req.jsonData);
        return res.status(200).send({ flag: true, result: rs });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
SearchingCon.searchComparison = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let rs = yield comparisonDataFiltering.executeFilteringService(req.jsonData);
        return res.status(200).send({ flag: true, result: rs });
    }
    catch (e) {
        return res.status(500).send({ flag: false, message: e.message });
    }
});
module.exports = SearchingCon;
//# sourceMappingURL=SearchingCon.js.map