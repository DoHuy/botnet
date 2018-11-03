import* as url from 'url';
import*as Auth from '../../domains/Auth/Auth';
// @ts-ignore
const auth = new Auth();
let AuthController = {};
/**
 *  ham nay validate toan bo
 * @param req
 * @param res
 * @param next
 */
// @ts-ignore
AuthController.login = async function (req, res, next) {
    try{
        let account = await auth.authenticate(req.account);
        if(account == null) res.status(404).send('not found ');
        else res.status(200).send({flag: true, token: account.token});
    }catch (e) {
        throw e;
    }
}

// @ts-ignore
AuthController.signUp = async function (req, res, next) {
    try{
        let accountFlag = await auth.createCredential(req.newAccount);
        if(accountFlag) res.status(200).send({flag: true, message: 'Tạo tài khoản thành công !'});
        else res.status(500).send({flag: false, message: 'Tạo tài khoản ko thành công !'});
    }catch (e) {
        throw e;
    }
}

// @ts-ignore
AuthController.verifyAccount = async function (req, res, next) {
    try{
        let result = await auth.verifyCredential(req.params);
        if(result) res.status(200).send({flag: true, message: 'Chứng thực tài khoản thành công!'});
        else res.status(500);
    }catch (e) {
        throw e;
    }
}


// @ts-ignore
AuthController.resetToken = async function (req, res, next) {
    try{
      let credential =  await auth.renewToken(req.params.token);
      return res.status(200).send({flag: true, token: credential.token});
    }catch (e) {
        throw e;
    }
}

module.exports = AuthController;