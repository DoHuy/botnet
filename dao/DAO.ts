import*as Connection from '../commons/Connection';
// @ts-ignore
function DAO () {
    let self = this;
    // @ts-ignore
    self.connection = Connection.connectDb();
    // console.log(self.connection);
}


DAO.prototype.findAll = async function (limit=null) {

}

DAO.prototype.findById = async function (id) {

}

DAO.prototype.create = async function () {

}

DAO.prototype.deleteById = function(){

}

DAO.prototype.deleteByCondition = ()=>{};

DAO.prototype.modifyById = function () {

}

DAO.prototype.findByCondition = function(){}
DAO.prototype.count = (webId)=>{};

DAO.prototype.finished = async function(){
    // @ts-ignore
    await Connection.closeDb();
}


DAO.prototype.transactionBegin = async function(){
    await this.connection.query('BEGIN');
}

DAO.prototype.transactionCommit = async function(){
    await this.connection.query('COMMIT');
}


DAO.prototype.transactionRollback = async function(){
    await this.connection.query('ROLLBACK');
}

module.exports = DAO;
