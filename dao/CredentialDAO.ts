// @ts-ignore
const DAO = require('./DAO');
// @ts-ignore
const util = require('util');
// @ts-ignore
const Credential = require('../data/entities/Credential');

// @ts-ignore
function CredentialDAO(newCredential=null) {
    DAO.call(this);
    this.newCredential = newCredential;
}

// ProxyDAO extends DAO
util.inherits(CredentialDAO, DAO);

CredentialDAO.prototype.findById = async function (id) {
    let result;
    let sql = `select*from credential where id=$1`;
    try{
        result = await this.connection.query(sql, [id]);
    }catch (e) {
        throw e;
    }
    // @ts-ignore
    let person = result.rows[0];
    // @ts-ignore
    return new Credential(person.username, person.password, person.tokenid);
};

CredentialDAO.prototype.findByUsernameAndPassword = async function (username, password) {
    let result;
    let sql = `select*from credentials
                where username=$1 and password=$2`;
    try{
        result = await this.connection.query(sql, [username, password]);
    }catch (e) {
        throw e;
    }
    // @ts-ignore
    let person = result.rows[0];
    // @ts-ignore
    return new Credential(person.username, person.password, person.token);
}

CredentialDAO.prototype.findAll = async function (limit=null) {
    let result;
    let sql = `select*from credentials
                limit ${limit}`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;

    }
    let credentialList = [];
    for(let person of result.rows){
        // @ts-ignore
        credentialList.push(new Credential(person.username, person.password, person.tokenId));
    }

    return credentialList;
}

CredentialDAO.prototype.create = async function (credential) {
    let result;
    let sql = `insert into credentials(username, password, tokenid)
                values($1, $2, $3) RETURNING *`;
    let values = [];
    try{
        result = await this.connection.query(sql, values);
    }catch(e){
        throw e;
    }
    let newUser = result.rows[0];
    // @ts-ignore
    return new Credential(newUser.username, newUser.password, newUser.tokenid);
}


CredentialDAO.prototype.deleteById = async function (id) {
    let sql = `update credentials set deleted=$1 where id=$2`;
    let values = [new Date(), id];
    let flag;
    try{
        await this.connection.query(sql, values);
        flag=true;
    }catch (e) {
        throw e;
    }

    return flag;
}

CredentialDAO.prototype.modifyById = async function (id, key, value) {
    let result;
    let sql = `update credentials set ${key}=$1 where id=$2`;
    let tmp = [value, id];
    try{
        await this.connection.query(sql, tmp);
        result = await this.findById(id);
    }catch (e) {
        throw e;
    }

    // @ts-ignore
    return result;

}

module.exports = CredentialDAO;