// @ts-ignore
import * as Validator from "../../domains/Validator/Validator";
import * as Auth from "../../domains/Auth/Auth";

// @ts-ignore
let validator = new Validator();
// @ts-ignore
let auth = new Auth();
// @ts-ignore
let Middleware: any={};

Middleware.verifyToken = async function (req, res, next){
    try{
        let token = req.headers.authorization.split(" ")[2];
        let rs = await auth.verifyToken(token);
        if(rs) {
            req.credentialId = auth.decode(token).id;
            next();
        }
        else res.status(401).send({flag: false, message:'token invalid'});
    }catch (e) {
        return res.status(500).send({flag: false, message:e.message});
    }
};

Middleware.AuthMiddleware = require('./AuthMiddleware');
Middleware.SettingMid = require('./SettingMid');

module.exports = Middleware;