// @ts-ignore
import*as ThirdPartyService from './ThirdPartyService';
import*as util from 'util';
import*as NodeMailer from 'nodemailer';
function MailService() {
    ThirdPartyService.call(this);
}
util.inherits(MailService, ThirdPartyService);

/**
 *
 * @param mailOptions={}
 */
MailService.prototype.sendMail = function (serviceMail, auth, mailOptions) {
    let transporter = NodeMailer.createTransport({
        service: serviceMail,
        auth: {
            user: auth.user,
            pass: auth.pass
        }
    });

    return new Promise((resolve, reject) => {
       transporter.sendMail(mailOptions, (err, info)=>{
           if(err) reject(err);
           else resolve(info.response);
       });
    });
}

module.exports = MailService;



