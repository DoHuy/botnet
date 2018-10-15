// @ts-ignore
const DAO = require('./DAO');
// @ts-ignore
const util  = require('util');
// @ts-ignore
const Proxy = require('../data/entities/Proxy');
function ProxyDAO(proxy) {
    DAO.call(this); // supper()
    this.proxy = proxy;
}
// ProxyDAO extends DAO
util.inherits(ProxyDAO, DAO);

ProxyDAO.prototype.insert = async function () {
}

ProxyDAO.prototype.select = async function () {

}

ProxyDAO.prototype.delete = async function () {

}

ProxyDAO.prototype.update = function () {

}

module.exports = ProxyDAO;
