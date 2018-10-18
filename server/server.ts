import* as express from 'express';
const server = express();
const Constants = require('../utils/Constants');
const config    = require('../utils/Configs');
const Router    = require('../http/routes/Routes');

server.use(Router);
server.listen(8000);