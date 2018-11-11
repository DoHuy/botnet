// @ts-ignore
import*as Validator from '../../domains/Validator/Validator';
let validator = new Validator();
let MonitoredWebsiteMiddleware: any={};

MonitoredWebsiteMiddleware.beforeRegister = function(req, res, next){
    let rs = validator.validateUrl(req.body.url);
    if(rs){
        next();
    }
    else{
        res.status(400).send({flag: false, message: "syntax false"});
    }
};

module.exports = MonitoredWebsiteMiddleware;