var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function Monitor(service) {
    this.service = service;
}
Monitor.prototype.executeMonitoringService = function (jsonData) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield this.service.doOperation(jsonData);
        return data;
    });
};
Monitor.prototype.executeFilteringService = function (jsonData) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield this.service.doFiltering(jsonData);
        return data;
    });
};
Monitor.prototype.executeDetectingService = function (jsonData) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield this.service.doDetection(jsonData);
        return data;
    });
};
Monitor.prototype.executeExportingService = function (jsonData) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield this.service.doExporting(jsonData);
        return data;
    });
};
module.exports = Monitor;
//# sourceMappingURL=Monitor.js.map