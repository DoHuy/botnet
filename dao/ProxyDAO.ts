// @ts-ignore
const DAO = require('./DAO');
// @ts-ignore
const util  = require('util');
// @ts-ignore
const Proxy = require('../data/entities/Proxy');
// @ts-ignore
function ProxyDAO(proxy=null) {
    DAO.call(this); // supper()
}
// ProxyDAO extends DAO
util.inherits(ProxyDAO, DAO);

ProxyDAO.prototype.findById = async function (id) {
    let result;
    let sql = `select*from proxies where id=${id}`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;
    }
    // @ts-ignore
    let proxy = result.rows[0];
    // @ts-ignore
    return new Proxy(proxy.id, proxy.ip, proxy.port, proxy.proxytype, proxy.responsetime, proxy.details, proxy.status);
}

ProxyDAO.prototype.findAll = async function (limit=null) {
    let result;
    let sql = `select*from proxies limit ${limit}`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;

    }
    let proxyList = [];
    for(let proxy of result.rows){
        // @ts-ignore
        proxyList.push(new Proxy(proxy.id, proxy.ip, proxy.port, proxy.proxytype, proxy.responsetime, proxy.details, proxy.status));
    }

    return proxyList;
}

ProxyDAO.prototype.create = async function (proxy) {
    let result;
    let sql = `insert into proxies (ip, port, proxytype, responsetime, details, status)
                values ($1, $2, $3, $4, $5, $6) RETURNING *`;
    let values = [proxy.ip, proxy.port, proxy.proxyType, proxy.responseTime, proxy.details, proxy.status];
    try{
        result = await this.connection.query(sql, values);
    }catch(e){
        throw e;
    }
    let newProxy = result.rows[0];
    // @ts-ignore
    return new Proxy(newProxy.id, newProxy.ip, newProxy.port, newProxy.proxytype, newProxy.responsetime, newProxy.details, newProxy.status);
}


ProxyDAO.prototype.delete = async function () {

}

ProxyDAO.prototype.modifyById = async function (id, key, value) {
    let result;

    let sql = `update proxies set ${key}=$1 where id=$2`;
    let tmp = [value, id];
    try{
      await this.connection.query(sql, tmp);
      result = await this.findById(id);
    }catch (e) {
        throw e;
    }

    // @ts-ignore
    return result;

}



ProxyDAO.prototype.modifyByIpAndPort = async function (ip, port, key, value) {
    let result;

    let sql = `update proxies set ${key}=$1 where ip=$2 and port=$3`;
    let tmp = [value, ip, port];
    try{
        await this.connection.query(sql, tmp);
        result = await this.findById();
    }catch (e) {
        throw e;
    }

    // @ts-ignore
    return result;

}

ProxyDAO.prototype.findByCondition = async function(condition){
    let result;
    let sql = `select*from proxies where ${condition}`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;

    }
    let proxyList = [];
    for(let proxy of result.rows){
        // @ts-ignore
        proxyList.push(new Proxy(proxy.id, proxy.ip, proxy.port, proxy.proxytype, proxy.responsetime, proxy.details, proxy.status));
    }

    return proxyList;
}
module.exports = ProxyDAO;
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
