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
const Domains = require('../data/entities/Domains');
function DomainsDAO() {
    DAO.call(this);
}
util.inherits(DomainsDAO, DAO);
DomainsDAO.prototype.create = function (newDomains) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `insert into domains(domains,ip, created, modified, deleted, webid)
                values($1, $2, $3, $4, $5, $6) RETURNING *`;
        let values = [newDomains.domains != undefined ? newDomains.domains : null,
            newDomains.ip != undefined ? newDomains.ip : null,
            newDomains.created != undefined ? newDomains.created : null,
            newDomains.modified != undefined ? newDomains.modified : null,
            newDomains.deleted != undefined ? newDomains.deleted : null,
            newDomains.webId != undefined ? newDomains.webId : null
        ];
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql, values);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
        let domains = result.rows[0];
        return new Domains(domains.id, domains.domains, domains.ip, domains.created, domains.modified, domains.deleted, domains.webid);
    });
};
DomainsDAO.prototype.findByCondition = function (condition) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from domains where ${condition}`;
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
            let domainsList = [];
            for (let domains of result.rows) {
                domainsList.push(new Domains(domains.id, domains.domains, domains.ip, domains.created, domains.modified, domains.deleted, domains.webid));
            }
            ;
            return domainsList;
        }
    });
};
DomainsDAO.prototype.deleteById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        let deleted = new Date().toISOString();
        let sql = `UPDATE domains SET deleted=$2 WHERE id = $1`;
        try {
            let execution = yield this.connection.connect();
            yield execution.query(sql, [id, deleted]);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
    });
};
module.exports = DomainsDAO;
//# sourceMappingURL=DomainsDAO.js.map