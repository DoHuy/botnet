// @ts-ignore
const DAO = require('./DAO');
// @ts-ignore
const util  = require('util');
// @ts-ignore
const ResponseState = require('../data/entities/ResponseState');
// @ts-ignore
function ResponseStateDAO() {
    DAO.call(this); // supper()
}
// ProxyDAO extends DAO
util.inherits(ResponseStateDAO, DAO);


ResponseStateDAO.prototype.create = async function (newResponseState) {
    let result;
    let sql = `insert into responsestates(response, notification, created, webid)
                values($1, $2, $3, $4) RETURNING *`;
    let values = [newResponseState.response!=undefined?newResponseState.response:null,
        newResponseState.notification!=undefined?newResponseState.notification:null,
        newResponseState.created!=undefined?newResponseState.created:null,
        newResponseState.webId!=undefined?newResponseState.webId:null
    ];
    try{
        result = await this.connection.query(sql, values);
    }catch(e){
        throw e;
    }
    let site = result.rows[0];
    // @ts-ignore
    return new ResponseState(
        site.id,
        site.response,
        site.notification,
        site.created,
        site.webid
    );
};

ResponseStateDAO.prototype.findByCondition = async function(condition){
    let result;
    let sql = `select*from responsestates where ${condition}`;
    try{
        result = await this.connection.query(sql);
    }catch (e) {
        throw e;

    }
    if(result.rows.length == 0){
        return null;
    }
    else{
        let websiteList = [];
        for(let site of result.rows){
            // @ts-ignore
            websiteList.push(new ResponseState(
                site.id,
                site.response,
                site.notification,
                site.created,
                site.webid

            ));
        };

        return websiteList;
    }
};


module.exports = ResponseStateDAO;
// done
// let t = new ResponseStateDAO();
// t.count(8).then(rs=>{
//     console.log(rs);
// })