import* as url from 'url';
import*as Auth from '../../domains/Auth/Auth';
// @ts-ignore
const auth = new Auth();
let AuthController: any = {};
/**
 *  ham nay validate toan bo
 * @param req
 * @param res
 * @param next
 */
AuthController.login = async function (req, res, next) {
    try{
        let account = await auth.authenticate(req.account);
        if(account == null) return res.status(404).send({flag: false, message: 'not found '});
        else return res.status(200).send({flag: true, token: account.token});
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message})
    }
}

AuthController.signUp = async function (req, res, next) {
    try{
        let accountFlag = await auth.createCredential(req.newAccount);
        if(accountFlag) return res.status(200).send({flag: true, message: 'Tạo tài khoản thành công !'});
        else return res.status(500).send({flag: false, message: 'Tạo tài khoản ko thành công !'});
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
}

AuthController.verifyAccount = async function (req, res, next) {
    try{
        let result = await auth.verifyCredential(req.params);
        if(result) return res.status(200).send({flag: true, message: 'Chứng thực tài khoản thành công!'});
        else return  res.status(500);
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message})
    }
}


AuthController.resetToken = async function (req, res, next) {
    try{
      let credential =  await auth.renewToken(req.params.token);
      return res.status(200).send({flag: true, token: credential.token});
    }catch (e) {
        throw e;
    }
}

module.exports = AuthController;