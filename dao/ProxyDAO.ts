const DAO = require('./DAO');
util.inherits(ProxyDAO, DAO);
export function ProxyDAO(proxy) {
    DAO.call(this); // supper()
    this.proxy = proxy;
}
// ProxyDAO extends DAO
util.inherits(ProxyDAO, DAO);

ProxyDAO.prototype.insert = async function () {
}

ProxyDAO.prototype.select = async function () {
    return this.connection.query('SELECT*FROM proxies');
}

ProxyDAO.prototype.delete = async function () {

}

ProxyDAO.prototype.update = function () {

}

// @ts-ignore
let a = new ProxyDAO(new Proxy());
a.select().then(rs=>{
    console.log(rs);
})

