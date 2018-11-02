// @ts-ignore
const express = require('express');
const server = express();
const Router = require('../http/routes/Router');
const Config = require('../utils/Configs');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
server.use(bodyParser.json());

server.use(Router);
server.listen(Config.SERVER.SERVER_PORT, ()=>{
    console.log(`${Config.SERVER.HOST_SERVER} listenning on ${Config.SERVER.SERVER_PORT}`);
});