
function MonitoredWebsite(siteName, url, connectionTimeout, frequently, subSites, created, modified, parent) {
    this.siteName = siteName;
    this.url = url;
    this.connectionTimeout=connectionTimeout;
    this.frequently = frequently;
    this.subSites = subSites;
    this.created  = created;
    this.modified = modified;
    this.parrent   = parent;
}

module.exports = MonitoredWebsite;


