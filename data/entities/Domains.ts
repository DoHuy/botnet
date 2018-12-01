function Domains(id=null, domains=null, created=null, modified=null, deleted=null, webId=null) {
    this.id=id;
    this.domains = domains;
    this.created = created;
    this.modified = modified;
    this.deleted = deleted;
    this.webId = webId;
}

module.exports = Domains;