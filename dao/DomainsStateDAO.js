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
const DomainsState = require('../data/entities/DomainsState');
function DomainsStateDAO() {
    DAO.call(this);
}
util.inherits(DomainsStateDAO, DAO);
DomainsStateDAO.prototype.create = function (newDomainsState) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `insert into domainsstates(notification, created, domainsid)
                values($1, $2, $3) RETURNING *`;
        let values = [newDomainsState.notification != undefined ? newDomainsState.notification : null,
            newDomainsState.created != undefined ? newDomainsState.created : null,
            newDomainsState.domainsId != undefined ? newDomainsState.domainsId : null
        ];
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql, values);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
        let domainsState = result.rows[0];
        return new DomainsState(domainsState.id, domainsState.notification, domainsState.created, domainsState.domainsid);
    });
};
DomainsStateDAO.prototype.findByCondition = function (condition) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from domainsstates where ${condition}`;
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
            let domainsStateList = [];
            for (let domainsState of result.rows) {
                domainsStateList.push(new DomainsState(domainsState.id, domainsState.notification, domainsState.created, domainsState.domainsid));
            }
            ;
            return domainsStateList;
        }
    });
};
module.exports = DomainsStateDAO;
//# sourceMappingURL=DomainsStateDAO.js.map