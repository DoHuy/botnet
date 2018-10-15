
// @ts-ignore
function Proxy(ip=null, port=null, proxyType=null, responseTime=null, country=null, status=null) {
    this.ip = ip;
    this.port = port;
    this.proxyType=proxyType;
    this.responseTime = responseTime;
    this.country = country;
    this.status = status;
}

module.exports = Proxy;


