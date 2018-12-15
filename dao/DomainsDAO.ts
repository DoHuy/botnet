// @ts-ignore
const DAO = require('./DAO');
// @ts-ignore
const util  = require('util');
// @ts-ignore
const Domains = require('../data/entities/Domains');
// @ts-ignore
function DomainsDAO() {
    DAO.call(this); // supper()
}
// ProxyDAO extends DAO
util.inherits(DomainsDAO, DAO);


DomainsDAO.prototype.create = async function (newDomains) {
    let result;
    let sql = `insert into domains(domains,ip, created, modified, deleted, webid)
                values($1, $2, $3, $4, $5, $6) RETURNING *`;
    let values = [newDomains.domains!=undefined?newDomains.domains:null,
        newDomains.ip!=undefined?newDomains.ip:null,
        newDomains.created!=undefined?newDomains.created:null,
        newDomains.modified!=undefined?newDomains.modified:null,
        newDomains.deleted!=undefined?newDomains.deleted:null,
        newDomains.webId!=undefined?newDomains.webId:null
    ];
    try{
        let execution: any = await this.connection.connect();
        result = await execution.query(sql, values);
        this.ConnectionOBJ.endConnect(execution);
        // result = await this.connection.query(sql, values);
    }catch(e){
        throw e;
    }
    let domains = result.rows[0];
    // @ts-ignore
    return new Domains(
        domains.id,
        domains.domains,
        domains.ip,
        domains.created,
        domains.modified,
        domains.deleted,
        domains.webid
    );
};

DomainsDAO.prototype.findByCondition = async function(condition){
    let result;
    let sql = `select*from domains where ${condition}`;
    try{
        let execution: any = await this.connection.connect();
        result = await execution.query(sql);
        this.ConnectionOBJ.endConnect(execution);
    }catch (e) {
        throw e;

    }
    // // destroy this connection db
    // this.ConnectionOBJ.endConnectDb(this.connection);
    // //
    if(result.rows.length == 0){
        return null;
    }
    else{
        let domainsList = [];
        for(let domains of result.rows){
            // @ts-ignore
            domainsList.push(new Domains(
                domains.id,
                domains.domains,
                domains.ip,
                domains.created,
                domains.modified,
                domains.deleted,
                domains.webid
            ));
        };

        return domainsList;
    }
};

DomainsDAO.prototype.deleteById = async function(id){
    let deleted = new Date().toISOString();
    let sql = `UPDATE domains SET deleted=$2 WHERE id = $1`;
    try{
        let execution: any = await this.connection.connect();
        await execution.query(sql, [id, deleted]);
        this.ConnectionOBJ.endConnect(execution);
        // await this.connection.query(sql, [id, deleted]);

    }catch (e) {
        throw e;
    }
}


module.exports = DomainsDAO;
// done
// let t = new DomainsDAO();
// t.findByCondition('1=1').then(rs=>{
//     console.log(rs);
// })