import*as MailService from './MailService';
import*as CONSTANT from "../../commons/Constants";

function ThirdPartyFactory() {}

/**
 *
 * @param service
 * @return service duoc yeu cau
 */
ThirdPartyFactory.prototype.getThirdPartyService = function (SERVICE) {
    switch (SERVICE) {
        case CONSTANT.SERVICE["MAIL"]:
            // @ts-ignore
            return new MailService();
            break;

        default:
            return null;
    }
}

module.exports = ThirdPartyFactory;