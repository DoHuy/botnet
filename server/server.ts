import* as express from 'express';
const server = express();
const Constants = require('../utils/Constants');
const config    = require('../utils/Configs');

// console.log(process.env.SERVER_PORT);
server.get('/', (req, res)=>{ res.send('Hello world')});
server.listen(config.SERVER.SERVER_PORT,()=> console.log(`Server listenning ${config.SERVER.SERVER_PORT}`));
