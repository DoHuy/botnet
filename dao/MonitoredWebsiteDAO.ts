// @ts-ignore
const DAO = require('./DAO');
// @ts-ignore
const util  = require('util');
// @ts-ignore
const MonitoredWebsite = require('../data/entities/MonitoredWebsite');
// @ts-ignore
const ResponseState = require('../data/entities/ResponseState');
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
        let execution = await this.connection.connect();
        result = await execution.query(sql);
        this.ConnectionOBJ.endConnect(execution);

        if(result.rows.length == 0){
            return null;
        }
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
        site.credentialid

    );
};

MonitoredWebsiteDAO.prototype.findAll = async function (limit=null) {
    let result;
    let sql = `select*from monitoredwebsites limit ${limit}`;
    try{
        let execution = await this.connection.connect();
        result = await execution.query(sql);
        this.ConnectionOBJ.endConnect(execution);
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
            site.credentialid

        ));
    }

    return websiteList;
};

MonitoredWebsiteDAO.prototype.create = async function (website) {
    let result;
    let sql = `insert into monitoredwebsites(sitename, url, frequently, connectiontimeout,
               parent, created, modified, deleted, credentialid)
                values($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    let values = [website.siteName!=undefined?website.siteName:null,
                  website.url!=undefined?website.url:null,
                  website.frequently!=undefined?website.frequently:null,
                  website.connectionTimeout!=undefined?website.connectionTimeout:null,
                  website.parent!=undefined?website.parent:null,
                  website.created!=undefined?website.created.toISOString():null,
                  website.modified!=undefined?website.modified.toISOString():null,
                  website.deleted!=undefined?website.deleted.toISOString():null,
                  website.credentialId!=undefined?website.credentialId:null
                ];
    try{
        let execution = await this.connection.connect();
        result = await execution.query(sql, values);
        this.ConnectionOBJ.endConnect(execution);
        // result = await this.connection.query(sql, values);
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
        site.credentialid

    );
};


MonitoredWebsiteDAO.prototype.deleteById = async function (id) {
    let flag;
    let sql = `update monitoredwebsites set deleted=$1 where id=$2`;
    try{
        let execution = await this.connection.connect();
        await execution.query(sql, [new Date().toISOString(), id]);
        this.ConnectionOBJ.endConnect(execution);
        // await this.connection.query(sql, [new Date().toISOString(), id]);
        flag=true;
    }catch (e) {
        throw e;
    }

    return flag;
};

MonitoredWebsiteDAO.prototype.findDataJoinWithResponseStates = async (id)=>{
    let sql = `SELECT* FROM monitoredwebsites JOIN responsestates
                ON monitoredwebsites.id = responsestates.webid
                WHERE id=$1`;
    try{
        let execution = await this.connection.connect();
        let rs:any = await execution.query(sql, [id]);
        this.ConnectionOBJ.endConnect(execution);
        return rs.rows;
    }catch (e) {
        throw e;
    }
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
        // values.push(id);
        let tmp: any = values;
        tmp.push(id);
        let execution = await this.connection.connect();
        let rs:any = await execution.query(sql, tmp);
        // let rs: any = await this.connection.query(sql, tmp);
        this.ConnectionOBJ.endConnect(execution);
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
        let execution = await this.connection.connect();
        await execution.query(sql);
        this.ConnectionOBJ.endConnect(execution);
        // await this.connection.query(sql);
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

        let execution = await this.connection.connect();
        result = await execution.query(sql);
        this.ConnectionOBJ.endConnect(execution);

    }catch (e) {
        throw e;

    }
    if(result.rows.length == 0){
        return null;
    }
    else{
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
                site.credentialid

            ));
        };

        return websiteList;
    }
};

MonitoredWebsiteDAO.prototype.findDataJoinWithResponseState = async function(condition){
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
    try{
        let execution = await this.connection.connect();
        result = await execution.query(sql);
        this.ConnectionOBJ.endConnect(execution);
    }catch (e) {
        throw e;

    }
    if(result.rows.length == 0){
        return null;
    }
    //
    let kq: any = [];
    result.rows.forEach(e=>{
        let web: any = new MonitoredWebsite(e.monitoredwebid, e.sitename, e.url, e.frequently, e.connectiontimeout, e.parent, e.webcreated, e.modified, e.deleted, e.credentialid);
        let responseState: any = new ResponseState(e.respid, e.response, e.notification, e.respcreated, e.webid);
        kq.push({monitoredWeb: web, responseState: responseState});
    });
    return kq;
};


module.exports = MonitoredWebsiteDAO;

// // @ts-ignore
// let tests = new MonitoredWebsiteDAO();
//
// tests.modifyById(5, ['frequently'], ['200000']).then(rs=>{
//     console.log(rs);
// });