// @ts-ignore
const DAO = require('./DAO');
// @ts-ignore
const util = require('util');
// @ts-ignore
const Token = require('../data/entities/Token');
function TokenDAO(token=null) {
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
    return new Token(token.token, token.existedTime);
}

TokenDAO.prototype.findById = async function (id) {

}

TokenDAO.prototype.create = async function () {

}

TokenDAO.prototype.deleteById = function(){

}



DAO.prototype.modifyById = function () {

}



module.exports=TokenDAO;

