// @ts-ignore
const express = require('express');
const server = express();
const Router = require('./http/routes/Router');
const Config = require('./commons/Configs');
const bodyParser = require('body-parser');
const path = require('path');

server.use(express.static(path.join(__dirname, 'data/store/snapshot')));
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
server.use(bodyParser.json());

server.use(Router);
server.listen(Config.SERVER.SERVER_PORT, ()=>{
    console.log(`${Config.SERVER.HOST_SERVER} listenning on ${Config.SERVER.SERVER_PORT}`);
});