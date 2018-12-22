const path = require('path');
const childProcess = require('child_process');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
let cordinator = path.join(__dirname, 'bin', 'others', 'executeCordinator.sh');
childProcess.spawn('bash', [cordinator]);
let checkStatusProxy = path.join(__dirname, 'bin', 'others', 'executeCheckProxy.sh');
childProcess.spawn('bash', [checkStatusProxy]);
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    let express = require('express');
    let server = express();
    let Router = require('./http/routes/Router');
    let Config = require('./commons/Configs');
    let bodyParser = require('body-parser');
    server.use(express.static(path.join(__dirname, 'data/store/snapshot')));
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use(Router);
    server.listen(Config.SERVER.SERVER_PORT, () => {
        console.log(`${Config.SERVER.HOST_NAME} listenning on ${Config.SERVER.SERVER_PORT}`);
    });
    console.log(`Worker ${process.pid} started`);
}
//# sourceMappingURL=server.js.map