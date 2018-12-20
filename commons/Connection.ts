import {Pool} from  'pg';
import*as CONFIG from './Configs';
import*as redis from 'redis';

const Connection:any = {};
Connection.pool = null;
Connection.connectDb = function () {
    try{
        if(Connection.pool === null){
            Connection.pool = new Pool({
                user: CONFIG['DB_CONFIG'].PG_USER,
                host: CONFIG['DB_CONFIG'].PG_HOST,
                database: CONFIG['DB_CONFIG'].PG_DATABASE,
                password: CONFIG['DB_CONFIG'].PG_PASSWORD,
                port: CONFIG['DB_CONFIG'].PG_PORT,
                max: 1000,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000,
            });

        }
    }catch(e){
        throw e;
    }
    return Connection.pool;
}

Connection.connectRedis = ()=>{

}

Connection.endConnect = (clientInstance:any)=>{
    clientInstance.release(true);
}

module.exports = Connection;
