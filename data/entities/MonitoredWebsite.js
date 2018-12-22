function MonitoredWebsite(id = null, siteName = null, url = null, frequently = null, connectionTimeout = null, parent = null, created = null, modified = null, deleted = null, credentialId = null) {
    this.id = id;
    this.siteName = siteName;
    this.url = url;
    this.connectionTimeout = connectionTimeout;
    this.frequently = frequently;
    this.parent = parent;
    this.created = created;
    this.modified = modified;
    this.deleted = deleted;
    this.credentialId = credentialId;
}
module.exports = MonitoredWebsite;
//# sourceMappingURL=MonitoredWebsite.js.map