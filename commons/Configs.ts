export const DB_CONFIG = {
    "PG_HOST": 'localhost',
    "PG_USER": "postgres",
    "PG_PASSWORD": "postgres",
    "PG_DATABASE": "webix",
    "PG_PORT": 5432,
}

export const REDIS_CONFIG = {
    "PORT":6379,
    "HOST":'localhost'
}

export const SERVER = {
    "SERVER_PORT": 8080,
    "HOST_NAME": "localhost"
}


export const DEPLOY = `http://localhost:8080`; // cai nay de sua khi deploy

export const COORDINATOR_TIME = 10000; // thoi gian kiem tra viec tao tien trinh con moi

export const CHECK_PROXY_TIME = 3*60 * 60 * 1000 // default 3 hours

export const DEFAULT_TIMEOUT = 30 * 1000; // nguoi dung khong truyen thi default = 100000

export const DEFAULT_DETECT_COINMINER_TIME = 1*1000*60; // 1 phut

export const FREQUENTLY_DEFAULT = 1 * 60 * 1000 // 1 phut // khoang thoi gian sau khi check xong trang web nay toi luc bat dau chek trang ke tiep

export const MAX_FREQUENTLY = 24*60*60*1000;

export const MIN_FREQUENTLY = 1*60*1000;

export const MAX_CONNECTION_TIMEOUT = 3*60*1000;

export const MIN_CONNECTION_TIMEOUT = 30*1000;

export const SECRET_KEY = 'huy_dep_zai'; // secretKey cho JWT

export const PAY_LOAD_FIELD = ['id', 'credentialname', 'created']; // created-la ngay tao token cac tu khoa ta truyen vao trong payload cua json web token

export const EXPIRED_TOKEN = 3 // day

export const NOTICE_RULE = {
    "connectionTimeout": {
        "threshold": {
            "success": 15000, // (s) <= 15s thi success
        }
    },
    "levels": ["success", "warning", "error"],
    "state": ["up", "down"]
}

export const MAIL_SERVER = {
    user: 'huy.dv146328@sis.hust.edu.vn',
    pass: 'anhhuy12'
}