"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceInterface = require("./ServiceIneterface");
const util = require("util");
function DetectingServiceInterface() {
    ServiceInterface.call(this);
}
util.inherits(DetectingServiceInterface, ServiceInterface);
DetectingServiceInterface.prototype.doDetection = () => { };
module.exports = DetectingServiceInterface;
//# sourceMappingURL=DetectingServiceInterface.js.map