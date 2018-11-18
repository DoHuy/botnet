// @ts-ignore
const DAO = require('./DAO');
// @ts-ignore
const util = require('util');
// @ts-ignore
const Token = require('../data/entities/Token');
// @ts-ignore
const CONFIG = require('../../commons/utils/Configs');
function TokenDAO() {
    DAO.call(this);
}

util.inherits(TokenDAO, DAO);


TokenDAO.prototype.findAll = async function (limit=null) {
    let result;
    let sql = `select*from tokens`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;
    }
    // @ts-ignore
    let token = result.rows[0];
    // @ts-ignore
    return new Token(token.token, token.created, token.expired);
}


TokenDAO.prototype.findById = async function (id) {

    try{
        let result = await this.connection.query(`select*from tokens where token=$1`, [id]);
        if(result.rows.length == 0) return null;
        else {
            result = result.rows[0];
            return new Token(result.token, result.created, result.expired);
        }
    } catch (e) {
        throw e;
    }
}

TokenDAO.prototype.create = async function (newToken) {
    try{
        let sql   = `insert into tokens (token, created, expired)
                     values ($1, $2, $3) RETURNING *`;
        let value = [newToken.token, newToken.created.toISOString(), ""+CONFIG.EXPIRED_TOKEN*24*60*60*1000];
        let result = await this.connection.query(sql, value);
        result = result.rows[0];

        return new Token(result.token, result.created, result.expired);

    }catch (e) {
        throw e;
    }
}

TokenDAO.prototype.deleteById = async function(id){
    let sql = `DELETE FROM tokens WHERE token = $1`;
    try{
        await this.connection.query(sql, [id.trim()]);

    }catch (e) {
        throw e;
    }
}


module.exports=TokenDAO;

