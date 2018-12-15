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
        if (account.flag == true) {
            return res.status(200).send({flag: true, credentialname: account.credential.credentialname, token: account.credential.token});
        }
        else {
            return res.status(404).send({flag: false, message: account.message});
        }
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message})
    }
}

AuthController.signUp = async function (req, res, next) {
    try{
        let accountFlag = await auth.createCredential(req.newAccount);
        if(accountFlag) return res.status(200).send({flag: true, message: 'sign up successfully !'});
        else return res.status(500).send({flag: false, message: 'something wrong !'});
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
}

AuthController.verifyAccount = async function (req, res, next) {
    try{
        let result = await auth.verifyCredential(req.params);
        if(result) return res.status(200).send({flag: true, message: 'Authenticate successfully !!'});
        else return  res.status(500);
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message})
    }
}


// AuthController.resetToken = async function (req, res, next) {
//     try{
//       let credential =  await auth.renewToken(req.params.token);
//       return res.status(200).send({flag: true, token: credential.token});
//     }catch (e) {
//         throw e;
//     }
// }

module.exports = AuthController;