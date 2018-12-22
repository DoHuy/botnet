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
const Proxy = require('../data/entities/Proxy');
function ProxyDAO(proxy = null) {
    DAO.call(this);
}
util.inherits(ProxyDAO, DAO);
ProxyDAO.prototype.findById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from proxies where id=${id}`;
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
        let proxy = result.rows[0];
        return new Proxy(proxy.id, proxy.ip, proxy.port, proxy.proxytype, proxy.responsetime, proxy.details, proxy.status);
    });
};
ProxyDAO.prototype.findAll = function (limit = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from proxies limit ${limit}`;
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
        let proxyList = [];
        for (let proxy of result.rows) {
            proxyList.push(new Proxy(proxy.id, proxy.ip, proxy.port, proxy.proxytype, proxy.responsetime, proxy.details, proxy.status));
        }
        return proxyList;
    });
};
ProxyDAO.prototype.create = function (proxy) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `insert into proxies (ip, port, proxytype, responsetime, details, status)
                values ($1, $2, $3, $4, $5, $6) RETURNING *`;
        let values = [proxy.ip, proxy.port, proxy.proxyType, proxy.responseTime, proxy.details, proxy.status];
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql, values);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
        let newProxy = result.rows[0];
        return new Proxy(newProxy.id, newProxy.ip, newProxy.port, newProxy.proxytype, newProxy.responsetime, newProxy.details, newProxy.status);
    });
};
ProxyDAO.prototype.delete = function () {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
ProxyDAO.prototype.modifyById = function (id, key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `update proxies set ${key}=$1 where id=$2`;
        let tmp = [value, id];
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
ProxyDAO.prototype.modifyByIpAndPort = function (ip, port, key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `update proxies set ${key}=$1 where ip=$2 and port=$3`;
        let tmp = [value, ip, port];
        try {
            let execution = yield this.connection.connect();
            yield execution.query(sql, tmp);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
    });
};
ProxyDAO.prototype.findByCondition = function (condition) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from proxies where ${condition}`;
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
        let proxyList = [];
        for (let proxy of result.rows) {
            proxyList.push(new Proxy(proxy.id, proxy.ip, proxy.port, proxy.proxytype, proxy.responsetime, proxy.details, proxy.status));
        }
        return proxyList;
    });
};
module.exports = ProxyDAO;
//# sourceMappingURL=ProxyDAO.js.map