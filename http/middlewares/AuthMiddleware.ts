import* as url from 'url';
// @ts-ignore
import*as Validator from '../../domains/Validator/Validator';
let AuthMiddleware = {};
let validator = new Validator();

/**
 *  ham nay validate toan bo
 * @param req
 * @param res
 * @param next
 */
// @ts-ignore
AuthMiddleware.beforeLogin = async function (req, res, next) {
    let result = validator.validateLogin(req.body);
    if(result.flag == true){
        req.account = req.body;
        next();
    }
    else{
        res.status(400).send(result);
    }
}

// @ts-ignore
AuthMiddleware.beforeSignUp = async function (req, res, next) {
    let result = validator.validateSignUp(req.body);
    if(result.flag == true){
        req.newAccount = req.body;
        next();
    }
    else{
        res.status(400).send(result);
    }
}


// @ts-ignore
AuthMiddleware.beforeVerifyAccount = async function (req, res, next) {
    next();
}

// @ts-ignore
AuthMiddleware.beforeResetToken = async function (req, res, next) {
    next();
}

module.exports = AuthMiddleware;