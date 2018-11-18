import*as MailService from './MailService';
import {SERVICE_MAIL} from "../../commons/Constants";

function ThirdPartyFactory() {}

/**
 *
 * @param service
 * @return service duoc yeu cau
 */
ThirdPartyFactory.prototype.getThirdPartyService = function (SERVICE) {
    switch (SERVICE) {
        case SERVICE_MAIL["VERIFY_MAIL"]:
            // @ts-ignore
            return new MailService();
            break;

        default:
            return null;
    }
}

module.exports = ThirdPartyFactory;