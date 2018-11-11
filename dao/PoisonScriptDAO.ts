import*as DAO from './DAO';
import*as util from 'util';
// @ts-ignore
import*as PoisonScript from '../data/entities/PoisonScript';
function PoisonScriptDAO() {
    // @ts-ignore
    DAO.call(this);

}

util.inherits(PoisonScriptDAO, DAO);

// ProxyDAO extends DAO id=null, script=null, created=null, modified=null, deleted=null, webId=null
util.inherits(ProxyDAO, DAO);

PoisonScriptDAO.prototype.findById = async function (id) {
    let result;
    let sql = `select*from poisonscripts where id=${id}`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;
    }
    // @ts-ignore
    let poisonScript = result.rows[0];
    // @ts-ignore
    return new PoisonScript(poisonScript.id, poisonScript.script, poisonScript.created, poisonScript.modified, poisonScript.deleted, poisonScript.webId);
}

PoisonScriptDAO.prototype.findAll = async function (limit=null) {
    let result;
    let sql = `select*from poisonscripts limit ${limit}`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;

    }
    let poisonScriptList = [];
    for(let poisonScript of result.rows){
        // @ts-ignore
        poisonScriptList.push(new PoisonScript(poisonScript.id, poisonScript.script, poisonScript.created, poisonScript.modified, poisonScript.deleted, poisonScript.webId));
    }

    return poisonScriptList;
}

PoisonScriptDAO.prototype.create = async function (poisonScript) {
    let result;
    let sql = `insert into poisonscripts (script, created, modified, deleted, webid)
                values ($1, $2, $3, $4, $5) RETURNING *`;
    let values = [poisonScript.script, poisonScript.created, poisonScript.modified, poisonScript.deleted, poisonScript.webId];
    try{
        result = await this.connection.query(sql, values);
    }catch(e){
        throw e;
    }
    let newPoisonScript = result.rows[0];
    // @ts-ignore
    return new PoisonScript(newPoisonScript.id, newPoisonScript.script, newPoisonScript.created, newPoisonScript.modified, newPoisonScript.deleted, newPoisonScript.webId);
}


ProxyDAO.prototype.delete = async function () {

}

ProxyDAO.prototype.modifyById = async function (id, key, value) {
    let result;

    let sql = `update poisonscripts set ${key}=$1 where id=$2`;
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


ProxyDAO.prototype.findCondition = async function(condition){
    let result;
    let sql = `select*from poisonscripts where ${condition}`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;

    }
    let proxyList = [];
    for(let proxy of result.rows){
        // @ts-ignore
        proxyList.push(new PoisonScript(newPoisonScript.id, newPoisonScript.script, newPoisonScript.created, newPoisonScript.modified, newPoisonScript.deleted, newPoisonScript.webId));
    }

    return proxyList;
}
module.exports = PoisonScriptDAO;
