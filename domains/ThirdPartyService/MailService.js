"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThirdPartyService = require("./ThirdPartyService");
const util = require("util");
const NodeMailer = require("nodemailer");
function MailService() {
    ThirdPartyService.call(this);
}
util.inherits(MailService, ThirdPartyService);
MailService.prototype.sendMail = function (serviceMail, auth, mailOptions) {
    let transporter = NodeMailer.createTransport({
        service: serviceMail,
        auth: {
            user: auth.user,
            pass: auth.pass
        }
    });
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
                reject(err);
            else
                resolve(info.response);
        });
    });
};
module.exports = MailService;
//# sourceMappingURL=MailService.js.map