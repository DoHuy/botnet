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
const Token = require('../data/entities/Token');
const CONFIG = require('../commons/Configs');
function TokenDAO() {
    DAO.call(this);
}
util.inherits(TokenDAO, DAO);
TokenDAO.prototype.findAll = function (limit = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from tokens`;
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
        let token = result.rows[0];
        return new Token(token.token, token.created, token.expired);
    });
};
TokenDAO.prototype.findById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let execution = yield this.connection.connect();
            let result = yield execution.query(`select*from tokens where token=$1`, [id]);
            this.ConnectionOBJ.endConnect(execution);
            if (result.rows.length == 0)
                return null;
            else {
                result = result.rows[0];
                return new Token(result.token, result.created, result.expired);
            }
        }
        catch (e) {
            throw e;
        }
    });
};
TokenDAO.prototype.create = function (newToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let sql = `insert into tokens (token, created, expired)
                     values ($1, $2, $3) RETURNING *`;
            let value = [newToken.token, newToken.created.toISOString(), "" + CONFIG.EXPIRED_TOKEN * 24 * 60 * 60 * 1000];
            let execution = yield this.connection.connect();
            let result = yield execution.query(sql, value);
            this.ConnectionOBJ.endConnect(execution);
            result = result.rows[0];
            return new Token(result.token, result.created, result.expired);
        }
        catch (e) {
            throw e;
        }
    });
};
TokenDAO.prototype.deleteById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = `DELETE FROM tokens WHERE token = $1`;
        try {
            let execution = yield this.connection.connect();
            yield execution.query(sql, [id.trim()]);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
    });
};
module.exports = TokenDAO;
//# sourceMappingURL=TokenDAO.js.map