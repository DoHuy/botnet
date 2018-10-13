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
module.exports = {createConnectionDb};
// let client = createConnectionDb()
//
// client.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     client.end()
// })