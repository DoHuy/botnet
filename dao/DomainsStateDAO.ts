// @ts-ignore
const DAO = require('./DAO');
// @ts-ignore
const util  = require('util');
// @ts-ignore
const DomainsState = require('../data/entities/DomainsState');
// @ts-ignore
function DomainsStateDAO() {
    DAO.call(this); // supper()
}
// ProxyDAO extends DAO
util.inherits(DomainsStateDAO, DAO);


DomainsStateDAO.prototype.create = async function (newDomainsState) {
    let result;
    let sql = `insert into domainsstates(notification, created, domainsid)
                values($1, $2, $3) RETURNING *`;
    let values = [newDomainsState.notification!=undefined?newDomainsState.notification:null,
        newDomainsState.created!=undefined?newDomainsState.created:null,
        newDomainsState.domainsId!=undefined?newDomainsState.domainsId:null
    ];
    try{
        let execution: any = await this.connection.connect();
        result = await execution.query(sql, values);
        this.ConnectionOBJ.endConnect(execution);
        // result = await this.connection.query(sql, values);
    }catch(e){
        throw e;
    }
    let domainsState = result.rows[0];
    // @ts-ignore
    return new DomainsState(
        domainsState.id,
        domainsState.notification,
        domainsState.created,
        domainsState.domainsid
    );
};

DomainsStateDAO.prototype.findByCondition = async function(condition){
    let result;
    let sql = `select*from domainsstates where ${condition}`;
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
        let domainsStateList = [];
        for(let domainsState of result.rows){
            // @ts-ignore
            domainsStateList.push(new DomainsState(
                domainsState.id,
                domainsState.notification,
                domainsState.created,
                domainsState.domainsid
            ));
        };

        return domainsStateList;
    }
};


module.exports = DomainsStateDAO;
// done
// let t = new DomainsDAO();
// t.findByCondition('1=1').then(rs=>{
//     console.log(rs);
// })