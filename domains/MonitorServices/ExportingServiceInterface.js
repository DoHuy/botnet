"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceInterface = require("./ServiceIneterface");
const util = require("util");
function ExportingServiceInterface() {
    ServiceInterface.call(this);
}
util.inherits(ExportingServiceInterface, ServiceInterface);
ExportingServiceInterface.prototype.doExporting = () => { };
module.exports = ExportingServiceInterface;
//# sourceMappingURL=ExportingServiceInterface.js.map