"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const CONFIG = require("./Configs");
const redis = require("redis");
const Connection = {};
Connection.pool = null;
Connection.clientRedis = null;
Connection.connectDb = function () {
    try {
        if (Connection.pool === null) {
            Connection.pool = new pg_1.Pool({
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
    }
    catch (e) {
        throw e;
    }
    return Connection.pool;
};
Connection.endConnect = (clientInstance) => {
    clientInstance.release(true);
};
Connection.connectRedis = () => {
    if (Connection.clientRedis == null) {
        Connection.clientRedis = redis.createClient(`redis://${CONFIG.REDIS_CONFIG.HOST}:${CONFIG.REDIS_CONFIG.PORT}`);
    }
    return Connection.clientRedis;
};
module.exports = Connection;
//# sourceMappingURL=Connection.js.map