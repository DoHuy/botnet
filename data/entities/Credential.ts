
// @ts-ignore
function Credential(id=null, credentialname=null, password=null,email=null, phone=null, created=null, modified=null, deleted=null, token=null, status=null) {
    this.credentialname = credentialname;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.created = created;
    this.modified = modified;
    this.token    = token;
    this.status = status;
    this.deleted = deleted;
    this.id = id;
}

module.exports = Credential;

