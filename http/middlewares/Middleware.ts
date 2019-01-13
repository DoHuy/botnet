// @ts-ignore
import * as Validator from "../../domains/Validator/Validator";
import * as Auth from "../../domains/Auth/Auth";

// @ts-ignore
let validator = new Validator();
// @ts-ignore
let auth = new Auth();
// @ts-ignore
let Middleware: any={};

Middleware.AuthMiddleware = require('./AuthMiddleware');
Middleware.SettingMid = require('./SettingMid');
Middleware.UpDownCheckingMid = require('./UpDownCheckingMid');
Middleware.SearchingMid = require('./SearchingMid');
Middleware.HackedDNSDetectingMid = require('./HackedDNSDetectingMid');
Middleware.OtherMid = require('./OtherMid');
Middleware.CredentialManagerMid = require('./CredentialManagerMid');
Middleware.CoinMinerDetectingMid = require('./CoinMinerDetectingMid');
Middleware.verifyToken = async function (req, res, next){
    let token;
    try{

        if(req.headers.authorization != null){
            token = req.headers.authorization.split(" ")[1];
        }
        else{
            return res.status(400).send({flag: false, message: 'empty token'});
        }

        let checked = await auth.verifyToken(token);
        if(checked.flag == true) {

            req.credentialId = auth.decode(token).id;
            next();
        }
        else return res.status(401).send({flag: false, message: checked.message});
    }catch (e) {
        return res.status(500).send({flag: false, message:e.message});
    }
};

module.exports = Middleware;