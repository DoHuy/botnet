export const DB_CONFIG = {
    "PG_HOST": 'localhost',
    "PG_USER": "postgres",
    "PG_PASSWORD": "postgres",
    "PG_DATABASE": "webix",
    "PG_PORT": 5432,
}

export const SERVER = {
    "SERVER_PORT": 8080,
    "HOST_SERVER": "localhost"
}
export const CHECK_PROXY_TIME = 3*60 * 60 * 1000 // default 3 hours

export const DEFAULT_TIMEOUT = 30 * 1000; // nguoi dung khong truyen thi default = 100000

export const FREQUENTLY_DEFAULT = 3 * 60 * 1000 // 1 phut // khoang thoi gian sau khi check xong trang web nay toi luc bat dau chek trang ke tiep

export const MAX_FREQUENTLY = 24*60*60*1000;

export const MIN_FREQUENTLY = 3*60*1000;

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