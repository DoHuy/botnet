const path = require('path');
const childProcess = require('child_process');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

//khoi tao 2 luong con kiem tra status proxies va cordinator dieu phoi viec tao cac child_process nghiep vu
let cordinator = path.join(__dirname, 'bin', 'others', 'executeCordinator.sh');
childProcess.spawn('bash', [cordinator]);
let checkStatusProxy = path.join(__dirname, 'bin', 'others', 'executeCheckProxy.sh');
childProcess.spawn('bash', [checkStatusProxy]);
//

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    // @ts-ignore
    let express = require('express');
    let server = express();
    let Router = require('./http/routes/Router');
    let Config = require('./commons/Configs');
    let bodyParser = require('body-parser');

    server.use(express.static(path.join(__dirname, 'data/store/snapshot')));
// parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({extended: false}));

// parse application/json
    server.use(bodyParser.json());
    server.use(Router);

    server.listen(Config.SERVER.SERVER_PORT, () => {
        console.log(`${Config.SERVER.HOST_NAME} listenning on ${Config.SERVER.SERVER_PORT}`);
    });

    console.log(`Worker ${process.pid} started`);
}

