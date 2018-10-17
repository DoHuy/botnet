const {Client}  = require('pg');
const CONFIG = require('../utils/Configs');


function createConnectionDb() {
    let client: any;
    try{
        client = new Client({
            user: CONFIG['DB_CONFIG'].PG_USER,
            host: CONFIG['DB_CONFIG'].PG_HOST,
            database: CONFIG['DB_CONFIG'].PG_DATABASE,
            password: CONFIG['DB_CONFIG'].PG_PASSWORD,
            port: CONFIG['DB_CONFIG'].PG_PORT,
        });

        client.connect();
    }catch(e){
        throw e;
    }
    return client;
}


// @ts-ignore
function DAO () {
    let self = this;
    self.connection = createConnectionDb();
}


DAO.prototype.findAll = async function (limit=null) {

}

DAO.prototype.findById = async function (id) {

}

DAO.prototype.create = async function () {

}

DAO.prototype.deleteById = function(){

}



DAO.prototype.modifyById = function () {

}

module.exports = DAO;
