
// @ts-ignore
function Credential(username, password=null, token=null) {
    this.username = username;
    this.password = password;
    this.token    = token;
}

module.exports = Credential;
