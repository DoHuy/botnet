export const DB_CONFIG = {
        "PG_HOST":'localhost',
        "PG_USER":"postgres",
        "PG_PASSWORD":"postgres",
        "PG_DATABASE":"webix",
        "PG_PORT":5432,
    }

export const SERVER = {
    "SERVER_PORT":8080,
    "HOST_SERVER":"localhost"
}
export const CHECK_PROXY_TIME = 60*60*1000 // default 3 hours

export const DEFAULT_TIMEOUT = 30000; // nguoi dung khong truyen thi default = 100000

export const SECRET_KEY = 'huy_dep_zai'; // secretKey cho JWT

export const PAY_LOAD_FIELD = ['id', 'credentialname', 'created']; // created-la ngay tao token cac tu khoa ta truyen vao trong payload cua json web token

export const EXPIRED_TOKEN = 3 // day