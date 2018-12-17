// @ts-ignore
const DAO = require('./DAO');
// @ts-ignore
const util  = require('util');
// @ts-ignore
const Log = require('../data/entities/Log');
// @ts-ignore
function LogDAO() {
    DAO.call(this); // supper()
}
// ProxyDAO extends DAO
util.inherits(LogDAO, DAO);


LogDAO.prototype.create = async function (newLog) {
    let result;
    let sql = `insert into logs(log, created, credentialid)
                values($1, $2, $3) RETURNING *`;
    let values = [newLog.log!=undefined?newLog.log:null,
        newLog.created!=undefined?newLog.created:null,
        newLog.credentialId!=undefined?newLog.credentialId:null
    ];
    try{
        let execution: any = await this.connection.connect();
        result = await execution.query(sql, values);
        this.ConnectionOBJ.endConnect(execution);
        // result = await this.connection.query(sql, values);
    }catch(e){
        throw e;
    }
    let log = result.rows[0];
    // @ts-ignore
    return new Log(
        log.id,
        log.log,
        log.created,
        log.credentialid
    );
};

LogDAO.prototype.findByCondition = async function(condition){
    let result;
    let sql = `select*from logs where ${condition}`;
    try{
        let execution: any = await this.connection.connect();
        result = await execution.query(sql);
        this.ConnectionOBJ.endConnect(execution);
    }catch (e) {
        throw e;

    }
    if(result.rows.length == 0){
        return null;
    }
    else{
        let logList = [];
        for(let log of result.rows){
            // @ts-ignore
            logList.push(new Log(
                log.id,
                log.log,
                log.created,
                log.credentialid
            ));
        };

        return logList;
    }
};


module.exports = LogDAO;
// done
// let t = new DomainsDAO();
// t.findByCondition('1=1').then(rs=>{
//     console.log(rs);
// })