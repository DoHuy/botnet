// @ts-ignore
const DAO = require('./DAO');
// @ts-ignore
const util  = require('util');
// @ts-ignore
const MonitoredWebsite = require('../data/entities/MonitoredWebsite');
// @ts-ignore
function MonitoredWebsiteDAO() {
    DAO.call(this); // supper()
}
// ProxyDAO extends DAO
util.inherits(MonitoredWebsiteDAO, DAO);

MonitoredWebsiteDAO.prototype.findById = async function (id) {
    let result;
    let sql = `select*from monitoredwebsites where id=${id}`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;
    }
    // @ts-ignore
    let site = result.rows[0];
    // @ts-ignore
    return new MonitoredWebsite(
        site.id,
        site.sitename,
        site.url,
        site.frequently,
        site.connectiontimeout,
        site.parent,
        site.created,
        site.modified,
        site.deleted,
        site.responsetime,
        site.notification,
        site.credentialid

    );
};

MonitoredWebsiteDAO.prototype.findAll = async function (limit=null) {
    let result;
    let sql = `select*from monitoredwebsites limit ${limit}`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;

    }
    let websiteList = [];
    for(let site of result.rows){
        // @ts-ignore
        websiteList.push(new MonitoredWebsite(
            site.id,
            site.sitename,
            site.url,
            site.frequently,
            site.connectiontimeout,
            site.parent,
            site.created,
            site.modified,
            site.deleted,
            site.responsetime,
            site.notification,
            site.credentialid

        ));
    }

    return websiteList;
};

MonitoredWebsiteDAO.prototype.create = async function (website) {
    let result;
    let sql = `insert into monitoredwebsites(sitename, url, frequently, connectiontimeout,
               parent, created, modified, deleted, responsetime, notification, credentialid)
                values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
    let values = [website.siteName!=undefined?website.siteName:null,
                  website.url!=undefined?website.url:null,
                  website.frequently!=undefined?website.frequently:null,
                  website.connectionTimeout!=undefined?website.connectionTimeout:null,
                  website.parent!=undefined?website.parent:null,
                  website.created!=undefined?website.created.toISOString():null,
                  website.modified!=undefined?website.modified.toISOString():null,
                  website.deleted!=undefined?website.deleted.toISOString():null,
                  website.responseTime!=undefined?website.responseTime:null,
                  website.notification!=undefined?website.notification:null,
                  website.credentialId!=undefined?website.credentialId:null
                ];
    try{
        result = await this.connection.query(sql, values);
    }catch(e){
        throw e;
    }
    let site = result.rows[0];
    // @ts-ignore
    return new MonitoredWebsite(
        site.id,
        site.sitename,
        site.url,
        site.frequently,
        site.connectiontimeout,
        site.parent,
        site.created,
        site.modified,
        site.deleted,
        site.responseTime,
        site.notification,
        site.credentialid

    );
};


MonitoredWebsiteDAO.prototype.deleteById = async function (id) {
    let flag;
    let sql = `update monitoredwebsites set deleted=$1 where id=$2`;
    try{
        await this.connection.query(sql, [new Date().toISOString(), id]);
        flag=true;
    }catch (e) {
        throw e;
    }

    return flag;
};

/**
 *
 * @param id
 * @param keys mảng các cột
 * @param values mảng các giá trị tương ứng với mỗi cột
 */
MonitoredWebsiteDAO.prototype.modifyById = async function (id, keys, values) {
    let result;
    let string="";
    if(keys.length !== values.length) throw new Error("number of key must equal value");

    for(let i=0 ; i<keys.length ; i++){
       if(i === keys.length-1){
           string+=`${keys[i]}=$${i+1} where id=$${i+2}`;
       }else string+=`${keys[i]}=$${i+1}, `;
    }
    let sql = `update monitoredwebsites set ${string}`;
    try{
        values.push(id);
        await this.connection.query(sql, values);
        result = await this.findById(id);
    }catch (e) {
        throw e;
    }
    // @ts-ignore
    return result;

};

MonitoredWebsiteDAO.prototype.deleteByCondition = async (condition)=>{
    let flag;
    let sql = `update monitoredwebsites set deleted=$1 where ${condition}`;
    try{
        await this.connection.query(sql, [new Date().toISOString()]);
        flag=true;
    }catch (e) {
        throw e;
    }

    return flag;
};

MonitoredWebsiteDAO.prototype.findByCondition = async function(condition){
    let result;
    let sql = `select*from monitoredwebsites where ${condition}`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;

    }
    let websiteList = [];
    for(let site of result.rows){
        // @ts-ignore
        websiteList.push(new MonitoredWebsite(
            site.id,
            site.sitename,
            site.url,
            site.frequently,
            site.connectiontimeout,
            site.parent,
            site.created,
            site.modified,
            site.deleted,
            site.responsetime,
            site.notification,
            site.credentialid

        ));
    };

    return websiteList;
};

module.exports = MonitoredWebsiteDAO;
