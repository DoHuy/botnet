import*as Connection from '../commons/Connection';
// @ts-ignore
function DAO () {
    let self = this;
    // @ts-ignore
    self.connection = Connection.connectDb();
}


DAO.prototype.findAll = async function (limit=null) {

}

DAO.prototype.findById = async function (id) {

}

DAO.prototype.create = async function () {

}

DAO.prototype.deleteById = function(){

}



DAO.prototype.modifyById = function () {

}

module.exports = DAO;

let dao = new DAO();
console.log(dao);
