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
const Log = require('../data/entities/Log');
function LogDAO() {
    DAO.call(this);
}
util.inherits(LogDAO, DAO);
LogDAO.prototype.create = function (newLog) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `insert into logs(log, created, credentialid)
                values($1, $2, $3) RETURNING *`;
        let values = [newLog.log != undefined ? newLog.log : null,
            newLog.created != undefined ? newLog.created : null,
            newLog.credentialId != undefined ? newLog.credentialId : null
        ];
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql, values);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
        let log = result.rows[0];
        return new Log(log.id, log.log, log.created, log.credentialid);
    });
};
LogDAO.prototype.findByCondition = function (condition) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from logs where ${condition}`;
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
            let logList = [];
            for (let log of result.rows) {
                logList.push(new Log(log.id, log.log, log.created, log.credentialid));
            }
            ;
            return logList;
        }
    });
};
module.exports = LogDAO;
//# sourceMappingURL=LogDAO.js.map