// @ts-ignore
import* as CredentialManager from '../../domains/CredentialManagerService/CredentialManager';
import*as fs from 'fs';
// @ts-ignore
const credentialManager = new CredentialManager();

let CredentialManagerCon: any = {};

CredentialManagerCon.resetAccount = async (req, res)=>{
    try{
        let rs: any = await credentialManager.resetPassword(req.body.email, req.body.credentialname);
        return res.status(200).send(rs);
        //
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};


CredentialManagerCon.changePassword = async (req, res)=>{
    try{
        let rs: any = await credentialManager.changePassword(req.body.newPassword, req.credentialId);
        return res.status(200).send(rs);
        //
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};




module.exports = CredentialManagerCon;