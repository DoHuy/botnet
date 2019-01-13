"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONFIG = {
    "PG_HOST": 'localhost',
    "PG_USER": "postgres",
    "PG_PASSWORD": "postgres",
    "PG_DATABASE": "webix",
    "PG_PORT": 5432,
};
exports.REDIS_CONFIG = {
    "PORT": 6379,
    "HOST": 'localhost'
};
exports.SERVER = {
    "SERVER_PORT": 8080,
    "HOST_NAME": "localhost"
};
exports.DEPLOY = `http://localhost:8080`;
exports.CHECK_PROXY_TIME = 3 * 60 * 60 * 1000;
exports.DEFAULT_TIMEOUT = 30 * 1000;
exports.DEFAULT_DETECT_COINMINER_TIME = 2 * 1000 * 60;
exports.FREQUENTLY_DEFAULT = 1 * 60 * 1000;
exports.MAX_FREQUENTLY = 24 * 60 * 60 * 1000;
exports.MIN_FREQUENTLY = 1 * 60 * 1000;
exports.MAX_CONNECTION_TIMEOUT = 3 * 60 * 1000;
exports.MIN_CONNECTION_TIMEOUT = 30 * 1000;
exports.SECRET_KEY = 'huy_dep_zai';
exports.PAY_LOAD_FIELD = ['id', 'credentialname', 'created'];
exports.EXPIRED_TOKEN = 3;
exports.NOTICE_RULE = {
    "connectionTimeout": {
        "threshold": {
            "success": 15000,
        }
    },
    "levels": ["success", "warning", "error"],
    "state": ["up", "down"]
};
exports.MAIL_SERVER = {
    user: 'huy.dv146328@sis.hust.edu.vn',
    pass: 'anhhuy12'
};
//# sourceMappingURL=Configs.js.map