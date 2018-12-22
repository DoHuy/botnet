"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MailService = require("./MailService");
const CONSTANT = require("../../commons/Constants");
function ThirdPartyFactory() { }
ThirdPartyFactory.prototype.getThirdPartyService = function (SERVICE) {
    switch (SERVICE) {
        case CONSTANT.SERVICE["MAIL"]:
            return new MailService();
            break;
        default:
            return null;
    }
};
module.exports = ThirdPartyFactory;
//# sourceMappingURL=ThirdPartyFactory.js.map