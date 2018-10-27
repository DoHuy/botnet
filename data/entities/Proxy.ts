
// @ts-ignore
function Proxy(ip=null, port=null, proxyType=null, responseTime=null, details=null, status=null) {
    this.ip = ip;
    this.port = port;
    this.proxyType=proxyType;
    this.responseTime = responseTime;
    this.details = details;
    this.status = status;
}

module.exports = Proxy;


