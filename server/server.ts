// @ts-ignore
const express = require('express');
const server = express();
const Router = require('../http/routes/Routes');
const Config = require('../utils/Configs');


server.use(Router);
server.listen(Config.SERVER.SERVER_PORT, ()=>{
    console.log(`${Config.SERVER.HOST_SERVER} listenning on ${Config.SERVER.SERVER_PORT}`);
})