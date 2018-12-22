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
const ResponseState = require('../data/entities/ResponseState');
function ResponseStateDAO() {
    DAO.call(this);
}
util.inherits(ResponseStateDAO, DAO);
ResponseStateDAO.prototype.create = function (newResponseState) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `insert into responsestates(response, notification, created, webid)
                values($1, $2, $3, $4) RETURNING *`;
        let values = [newResponseState.response != undefined ? newResponseState.response : null,
            newResponseState.notification != undefined ? newResponseState.notification : null,
            newResponseState.created != undefined ? newResponseState.created : null,
            newResponseState.webId != undefined ? newResponseState.webId : null
        ];
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql, values);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
        let site = result.rows[0];
        return new ResponseState(site.id, site.response, site.notification, site.created, site.webid);
    });
};
ResponseStateDAO.prototype.findByCondition = function (condition) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from responsestates where ${condition}`;
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
            for (let site of result.rows) {
                websiteList.push(new ResponseState(site.id, site.response, site.notification, site.created, site.webid));
            }
            ;
            return websiteList;
        }
    });
};
module.exports = ResponseStateDAO;
//# sourceMappingURL=ResponseStateDAO.js.map