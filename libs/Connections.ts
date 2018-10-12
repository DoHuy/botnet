const {Client}  = require('pg');
const Constants = require('../utils/Constants');

function createConnectionDb() {
    let client: any;
    try{
        client = new Client({
            user: Constants.CONFIGS.PG_USER,
            host: Constants.CONFIGS.PG_HOST,
            database: Constants.CONFIGS.PG_DATABASE,
            password: Constants.CONFIGS.PG_PASSWORD,
            port: Constants.CONFIGS.PG_PORT,
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