import {Pool} from  'pg';
import*as CONFIG from '../utils/Configs';


const Connection:any = {};
Connection.pool = null;
Connection.connectDb = function () {
    try{
        if(Connection.pool == null){
            Connection.pool = new Pool({
                user: CONFIG['DB_CONFIG'].PG_USER,
                host: CONFIG['DB_CONFIG'].PG_HOST,
                database: CONFIG['DB_CONFIG'].PG_DATABASE,
                password: CONFIG['DB_CONFIG'].PG_PASSWORD,
                port: CONFIG['DB_CONFIG'].PG_PORT,
            });

            Connection.pool.connect();
        }
    }catch(e){
        throw e;
    }
    return Connection.pool;
}

Connection.closeDb = async function(){
    await Connection.pool.end();
}

module.exports = Connection;
