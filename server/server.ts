import* as express from 'express';
const server = express();
const Constants = require('../utils/Constants');

// console.log(process.env.SERVER_PORT);
server.get('/', (req, res)=>{ res.send('Hello world')});
server.listen(Constants.CONFIGS.SERVER_PORT,()=> console.log(`Server listenning ${Constants.CONFIGS.SERVER_PORT}`));
