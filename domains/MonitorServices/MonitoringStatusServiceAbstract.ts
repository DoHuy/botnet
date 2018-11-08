
// interface
function MonitoringStatusServiceAbstract(url, opts=null) {
    this.url  = url;
    this.opts = opts || null;
}

MonitoringStatusServiceAbstract.prototype.setting = function(){};
MonitoringStatusServiceAbstract.prototype.registerWebsite = function(){};


module.exports = MonitoringStatusServiceAbstract;