import* as Validator from '../../domains/Validator/Validator';

// @ts-ignore
const validator = new Validator();
let CredentialManagerMid: any = {};

CredentialManagerMid.beforeResetAccount = async function (req, res, next) {
    // let email = req.body.email;
    let check = validator.validateResetPassword(req.body);
    if(check.flag == false){
        return res.status(400).send(check);
    }
    next();
};

CredentialManagerMid.beforeChangePassword = async function (req, res, next) {
    let check = validator.validateChangePassword(req.body);
    if(check.flag == false){
        return res.status(400).send(check);
    }
    next();
}


module.exports = CredentialManagerMid;