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
util.inherits(ProxyDAO, DAO);

ProxyDAO.prototype.findById = async function (id) {
    let result;
    let sql = `select*from monitoredwebsite where id=${id}`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;
    }
    // @ts-ignore
    let site = result.rows[0];
    // @ts-ignore
    return new MonitoredWebsite(
        site.sitename,
        site.url,
        site.connectiontimeout,
        site.frequently,
        site.parent,
        site.created,
        site.modified,
        site.deleted,
        site.responseTime,
        site.notification

    );
}

ProxyDAO.prototype.findAll = async function (limit=null) {
    let result;
    let sql = `select*from monitoredwebsite limit ${limit}`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;

    }
    let websiteList = [];
    for(let site of result.rows){
        // @ts-ignore
        websiteList.push(new MonitoredWebsite(
            site.sitename,
            site.url,
            site.connectiontimeout,
            site.frequently,
            site.parent,
            site.created,
            site.modified,
            site.deleted,
            site.responseTime,
            site.notification

        ));
    }

    return websiteList;
}

ProxyDAO.prototype.create = async function (website) {
    let result;
    let sql = `insert into monitoredwebsite(sitename, url, connectiontimeout, frequently,
               parent, created, modified, deleted, responsetime, noification)
                values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    let values = [website.siteName, website.url, website.connectionTimeout, website.frequently,
                  website.parent, website.created, website.modified, website.deleted,
                  website.responseTime, website.notification];
    try{
        result = await this.connection.query(sql, values);
    }catch(e){
        throw e;
    }
    let site = result.rows[0];
    // @ts-ignore
    return new MonitoredWebsite(
        site.sitename,
        site.url,
        site.connectiontimeout,
        site.frequently,
        site.parent,
        site.created,
        site.modified,
        site.deleted,
        site.responseTime,
        site.notification

    );
}


ProxyDAO.prototype.deleteById = async function (id) {
    let flag;
    let sql = `update monitoredwebsite set deleted=$1 where id=$2`;
    try{
        await this.connection.query(sql, [new Date(), id]);
        flag=true;
    }catch (e) {
        throw e;
    }

    return flag;
}

ProxyDAO.prototype.modifyById = async function (id, [...key], [...value]) {
    let result;
    let string="";
    if(key.length !== value.length) throw new Error("number of key must equal value");

    for(let i=1 ; i<=key.length ; i++){
       if(i === key.length){
           string+=`${key[i]}=$${i} where id=$${i}`;
       }else string+=`${key[i]}=$${i},`;
    }
    let sql = `update monitoredwebsite set ${string}`;
    try{
        await this.connection.query(sql, [...value].push(id));
        result = await this.findById(id);
    }catch (e) {
        throw e;
    }
    // @ts-ignore
    return result;

}

module.exports = MonitoredWebsiteDAO;
//
// // // @ts-ignore
// // const Proxy = require('../data/entities/Proxy');
// console.log(Proxy);
// // @ts-ignore
// let proxydao = new ProxyDAO(new Proxy());
//
// proxydao.modifyById(55, 'status', 'inactive').then(rs=>{
//     console.log(rs);
// })
