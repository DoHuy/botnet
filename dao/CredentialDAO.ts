// @ts-ignore
const DAO = require('./DAO');
// @ts-ignore
const util = require('util');
// @ts-ignore
const Credential = require('../data/entities/Credential');

// @ts-ignore
function CredentialDAO() {
    DAO.call(this);
}

// ProxyDAO extends DAO
util.inherits(CredentialDAO, DAO);

CredentialDAO.prototype.findById = async function (id) {
    let result;
    let sql = `select*from credentials where id=$1`;
    try{
        // console.log(this.connection.connect());
        let execution: any = await this.connection.connect();
        result = await execution.query(sql, [id]);
        this.ConnectionOBJ.endConnect(execution);

    }catch (e) {
        throw e;
    }
    // @ts-ignore
    let credential = result.rows[0];
    if(credential == undefined) return null;
    console.log(credential);
    // @ts-ignore
    return new Credential(credential.id, credential.credentialname, credential.password, credential.email, credential.phone, credential.created, credential.modified,credential.deleted, credential.token, credential.status);
    //Credential(credentialname=null, password=null,email=null, phone=null, created=null, modified=null, token=null, status=null)
};


CredentialDAO.prototype.findForLogin = async function (credentialname, password) {
    let result;
    let sql = `select*from credentials
                where credentialname=$1 and password=$2`;
    try{
        let execution: any = await this.connection.connect();
        result = await execution.query(sql, [credentialname, password]);
        this.ConnectionOBJ.endConnect(execution);
        if(result.rows.length == 0) return null;
    }catch (e) {
        throw e;
    }
    // @ts-ignore
    let credential = result.rows[0];
    // @ts-ignore
    return new Credential(credential.id, credential.credentialname, credential.password, credential.email, credential.phone, credential.created, credential.modified,credential.deleted, credential.token, credential.status);
}

// CredentialDAO.prototype.findAll = async function (limit=null) {
//     let result;
//     let sql = `select*from credentials
//                 limit ${limit}`;
//     try{
//         result = await this.connection.connect().query(sql);
//     }catch (e) {
//         throw e;
//
//     }
//     let credentialList = [];
//     for(let person of result.rows){
//         // @ts-ignore
//         credentialList.push(new Credential(person.username, person.password, person.tokenId));
//     }
//
//     return credentialList;
// }
//
CredentialDAO.prototype.create = async function (newCredential) {
    let result;
    let sql = `insert into credentials(credentialname, password, email, phone, created, modified, deleted, token, status)
                values($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    let values = [newCredential.credentialname, newCredential.password,
                  newCredential.email, newCredential.phone, new Date().toISOString(),
                  null, null, null, 'inactive'
                 ];
    try{
        let execution: any = await this.connection.connect();
        result = await execution.query(sql, values);
        this.ConnectionOBJ.endConnect(execution);
        // result = await this.connection.query(sql, values);
    }catch(e){
        throw e;
    }
    let credential = result.rows[0];
    // @ts-ignore
    return new Credential(credential.id, credential.credentialname, credential.password, credential.email, credential.phone, credential.created, credential.modified,credential.deleted, credential.token, credential.status);;
}
//
//
// CredentialDAO.prototype.deleteById = async function (id) {
//     let sql = `update credentials set deleted=$1 where id=$2`;
//     let values = [new Date(), id];
//     let flag;
//     try{
//         await this.connection.connect().query(sql, values);
//         flag=true;
//     }catch (e) {
//         throw e;
//     }
//
//     return flag;
// }
//

/**
 *
 * @param object have {key: value}
 * @param id is id of credential want update
 */
CredentialDAO.prototype.modifyById = async function (object, id) {
    let result;
    let sql = `update credentials set ${object.key}=$1, modified=$2 where id=$3`;
    // console.log(sql);
    let tmp = [object.value, new Date().toISOString(), id];
    try{
        let execution: any = await this.connection.connect();
        await execution.query(sql, tmp);
        this.ConnectionOBJ.endConnect(execution);
        // await this.connection.query(sql, tmp);
        result = await this.findById(id);
    }catch (e) {
        throw e;
    }

    // @ts-ignore
    return result;

};


CredentialDAO.prototype.findByCondition = async function(condition){
    let result;
    let sql = `select*from credentials where ${condition}`;
    try{
        let execution: any = await this.connection.connect();
        result = await execution.query(sql);
        this.ConnectionOBJ.endConnect(execution);
    }catch (e) {
        throw e;

    }
    if(result.rows.length == 0){
        return null;
    }
    else{
        let websiteList = [];
        for(let credential of result.rows){
            // @ts-ignore
            websiteList.push(new Credential(credential.id,
                credential.credentialname,
                credential.password,
                credential.email,
                credential.phone,
                credential.created,
                credential.modified,
                credential.deleted,
                credential.token,
                credential.status));
        };

        return websiteList;
    }
};

module.exports = CredentialDAO;