var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const DAO = require('./DAO');
const util = require('util');
const Credential = require('../data/entities/Credential');
function CredentialDAO() {
    DAO.call(this);
}
util.inherits(CredentialDAO, DAO);
CredentialDAO.prototype.findById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from credentials where id=$1`;
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql, [id]);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
        let credential = result.rows[0];
        if (credential == undefined)
            return null;
        console.log(credential);
        return new Credential(credential.id, credential.credentialname, credential.password, credential.email, credential.phone, credential.created, credential.modified, credential.deleted, credential.token, credential.status);
    });
};
CredentialDAO.prototype.findForLogin = function (credentialname, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from credentials
                where credentialname=$1 and password=$2`;
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql, [credentialname, password]);
            this.ConnectionOBJ.endConnect(execution);
            if (result.rows.length == 0)
                return null;
        }
        catch (e) {
            throw e;
        }
        let credential = result.rows[0];
        return new Credential(credential.id, credential.credentialname, credential.password, credential.email, credential.phone, credential.created, credential.modified, credential.deleted, credential.token, credential.status);
    });
};
CredentialDAO.prototype.create = function (newCredential) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `insert into credentials(credentialname, password, email, phone, created, modified, deleted, token, status)
                values($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
        let values = [newCredential.credentialname, newCredential.password,
            newCredential.email, newCredential.phone, new Date().toISOString(),
            null, null, null, 'inactive'
        ];
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql, values);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
        let credential = result.rows[0];
        return new Credential(credential.id, credential.credentialname, credential.password, credential.email, credential.phone, credential.created, credential.modified, credential.deleted, credential.token, credential.status);
        ;
    });
};
CredentialDAO.prototype.modifyById = function (object, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `update credentials set ${object.key}=$1, modified=$2 where id=$3`;
        let tmp = [object.value, new Date().toISOString(), id];
        try {
            let execution = yield this.connection.connect();
            yield execution.query(sql, tmp);
            this.ConnectionOBJ.endConnect(execution);
            result = yield this.findById(id);
        }
        catch (e) {
            throw e;
        }
        return result;
    });
};
CredentialDAO.prototype.findByCondition = function (condition) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from credentials where ${condition}`;
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
        if (result.rows.length == 0) {
            return null;
        }
        else {
            let websiteList = [];
            for (let credential of result.rows) {
                websiteList.push(new Credential(credential.id, credential.credentialname, credential.password, credential.email, credential.phone, credential.created, credential.modified, credential.deleted, credential.token, credential.status));
            }
            ;
            return websiteList;
        }
    });
};
module.exports = CredentialDAO;
//# sourceMappingURL=CredentialDAO.js.map