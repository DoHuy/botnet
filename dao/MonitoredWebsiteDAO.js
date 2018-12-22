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
const MonitoredWebsite = require('../data/entities/MonitoredWebsite');
const ResponseState = require('../data/entities/ResponseState');
function MonitoredWebsiteDAO() {
    DAO.call(this);
}
util.inherits(MonitoredWebsiteDAO, DAO);
MonitoredWebsiteDAO.prototype.findById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from monitoredwebsites where id=${id}`;
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql);
            this.ConnectionOBJ.endConnect(execution);
            if (result.rows.length == 0) {
                return null;
            }
        }
        catch (e) {
            throw e;
        }
        let site = result.rows[0];
        return new MonitoredWebsite(site.id, site.sitename, site.url, site.frequently, site.connectiontimeout, site.parent, site.created, site.modified, site.deleted, site.credentialid);
    });
};
MonitoredWebsiteDAO.prototype.findAll = function (limit = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from monitoredwebsites limit ${limit}`;
        try {
            let execution = yield this.connection.connect();
            result = yield execution.query(sql);
            this.ConnectionOBJ.endConnect(execution);
        }
        catch (e) {
            throw e;
        }
        let websiteList = [];
        for (let site of result.rows) {
            websiteList.push(new MonitoredWebsite(site.id, site.sitename, site.url, site.frequently, site.connectiontimeout, site.parent, site.created, site.modified, site.deleted, site.credentialid));
        }
        return websiteList;
    });
};
MonitoredWebsiteDAO.prototype.create = function (website) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `insert into monitoredwebsites(sitename, url, frequently, connectiontimeout,
               parent, created, modified, deleted, credentialid)
                values($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
        let values = [website.siteName != undefined ? website.siteName : null,
            website.url != undefined ? website.url : null,
            website.frequently != undefined ? website.frequently : null,
            website.connectionTimeout != undefined ? website.connectionTimeout : null,
            website.parent != undefined ? website.parent : null,
            website.created != undefined ? website.created.toISOString() : null,
            website.modified != undefined ? website.modified.toISOString() : null,
            website.deleted != undefined ? website.deleted.toISOString() : null,
            website.credentialId != undefined ? website.credentialId : null
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
        return new MonitoredWebsite(site.id, site.sitename, site.url, site.frequently, site.connectiontimeout, site.parent, site.created, site.modified, site.deleted, site.credentialid);
    });
};
MonitoredWebsiteDAO.prototype.deleteById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        let flag;
        let sql = `update monitoredwebsites set deleted=$1 where id=$2`;
        try {
            let execution = yield this.connection.connect();
            yield execution.query(sql, [new Date().toISOString(), id]);
            this.ConnectionOBJ.endConnect(execution);
            flag = true;
        }
        catch (e) {
            throw e;
        }
        return flag;
    });
};
MonitoredWebsiteDAO.prototype.findDataJoinWithResponseStates = (id) => __awaiter(this, void 0, void 0, function* () {
    let sql = `SELECT* FROM monitoredwebsites JOIN responsestates
                ON monitoredwebsites.id = responsestates.webid
                WHERE id=$1`;
    try {
        let execution = yield this.connection.connect();
        let rs = yield execution.query(sql, [id]);
        this.ConnectionOBJ.endConnect(execution);
        return rs.rows;
    }
    catch (e) {
        throw e;
    }
});
MonitoredWebsiteDAO.prototype.modifyById = function (id, keys, values) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let string = "";
        if (keys.length !== values.length)
            throw new Error("number of key must equal value");
        for (let i = 0; i < keys.length; i++) {
            if (i === keys.length - 1) {
                string += `${keys[i]}=$${i + 1} where id=$${i + 2}`;
            }
            else
                string += `${keys[i]}=$${i + 1}, `;
        }
        let sql = `update monitoredwebsites set ${string}`;
        try {
            let tmp = values;
            tmp.push(id);
            let execution = yield this.connection.connect();
            let rs = yield execution.query(sql, tmp);
            this.ConnectionOBJ.endConnect(execution);
            result = yield this.findById(id);
        }
        catch (e) {
            throw e;
        }
        return result;
    });
};
MonitoredWebsiteDAO.prototype.deleteByCondition = (condition) => __awaiter(this, void 0, void 0, function* () {
    let flag;
    let sql = `update monitoredwebsites set deleted=$1 where ${condition}`;
    try {
        let execution = yield this.connection.connect();
        yield execution.query(sql);
        this.ConnectionOBJ.endConnect(execution);
        flag = true;
    }
    catch (e) {
        throw e;
    }
    return flag;
});
MonitoredWebsiteDAO.prototype.findByCondition = function (condition) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `select*from monitoredwebsites where ${condition}`;
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
                websiteList.push(new MonitoredWebsite(site.id, site.sitename, site.url, site.frequently, site.connectiontimeout, site.parent, site.created, site.modified, site.deleted, site.credentialid));
            }
            ;
            return websiteList;
        }
    });
};
MonitoredWebsiteDAO.prototype.findDataJoinWithResponseState = function (condition) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        let sql = `SELECT monitoredwebsites.id as monitoredwebid,
                monitoredwebsites.sitename as sitename,
                monitoredwebsites.url as url,
                monitoredwebsites.frequently,
                monitoredwebsites.connectiontimeout,
                monitoredwebsites.parent,
                monitoredwebsites.created as webcreated,
                monitoredwebsites.modified,
                monitoredwebsites.deleted,
                monitoredwebsites.credentialid,
                responsestates.id as respid,
                responsestates.response,
                responsestates.notification,
                responsestates.created as respcreated,
                responsestates.webid FROM monitoredwebsites
                JOIN responsestates ON monitoredwebsites.id = responsestates.webid
                WHERE ${condition}`;
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
        let kq = [];
        result.rows.forEach(e => {
            let web = new MonitoredWebsite(e.monitoredwebid, e.sitename, e.url, e.frequently, e.connectiontimeout, e.parent, e.webcreated, e.modified, e.deleted, e.credentialid);
            let responseState = new ResponseState(e.respid, e.response, e.notification, e.respcreated, e.webid);
            kq.push({ monitoredWeb: web, responseState: responseState });
        });
        return kq;
    });
};
module.exports = MonitoredWebsiteDAO;
//# sourceMappingURL=MonitoredWebsiteDAO.js.map