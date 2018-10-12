const {Client}  = require('pg');
const CONFIGS = require('../utils/Configs');

function createConnectionDb() {
    let client: any;
    try{
        client = new Client({
            user: CONFIGS.db_config.PG_USER,
            host: CONFIGS.db_config.PG_HOST,
            database: CONFIGS.db_config.PG_DATABASE,
            password: CONFIGS.db_config.PG_PASSWORD,
            port: CONFIGS.db_config.PG_PORT,
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