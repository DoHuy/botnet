import*as Validator from '../../domains/Validator/Validator';

// let domainsDAO = new DomainsDAO();
// @ts-ignore
let validator = new Validator();
let CoinMinerDetectingMid: any = {};

// kiem tra xem cac dich vu dieu kien tien quyet da dc them hay chua neu chua thi ko dc su dung cai nay
CoinMinerDetectingMid.beforeRegisterService = async function (req, res, next) {
    try{
        let checked = await validator.validateRegisterCoinMinerDetecting(req.params.id, req.credentialId);
        if(checked.flag == false){
            return res.status(checked.statusCode).send({flag: false, message: checked.message});
        }
        else next();
    }catch (e) {
        throw e;
    }
};

// kiem tra quyen
CoinMinerDetectingMid.beforeDetect = async function (req, res, next){
    try{
        let checked = await validator.validateDetectCoinMiner(req.params.id, req.credentialId);
        if(checked.flag == false){
            return res.status(checked.statusCode).send({flag: false, message: checked.message});
        }
        else {
            next();
        }
    }catch (e) {
        throw e;
    }
};


// kiem tra quyen
CoinMinerDetectingMid.beforeDelete = async (req, res, next)=>{
    try{
        let checked = await validator.validateDeleteCoinMinerDetecting(req.params.id, req.credentialId);
        if(checked.flag == false){
            return res.status(checked.statusCode).send({flag: false, message: checked.message});
        }
        else next();
    }catch (e) {
        throw e;
    }
};

module.exports = CoinMinerDetectingMid;