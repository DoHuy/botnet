"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Connection = require("../commons/Connection");
function DAO() {
    let self = this;
    self.connection = Connection.connectDb();
    self.ConnectionOBJ = Connection;
}
DAO.prototype.findAll = function (limit = null) {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
DAO.prototype.findById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
DAO.prototype.create = function () {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
DAO.prototype.deleteById = function () {
};
DAO.prototype.deleteByCondition = () => { };
DAO.prototype.modifyById = function () {
};
DAO.prototype.findByCondition = function () { };
DAO.prototype.count = (webId) => { };
DAO.prototype.transactionBegin = function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.connection.query('BEGIN');
    });
};
DAO.prototype.transactionCommit = function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.connection.query('COMMIT');
    });
};
DAO.prototype.transactionRollback = function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.connection.query('ROLLBACK');
    });
};
module.exports = DAO;
//# sourceMappingURL=DAO.js.map