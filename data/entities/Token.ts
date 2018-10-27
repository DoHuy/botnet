// @ts-ignore
function Token(token, created, expired) {
    this.token = token;
    this.created = created;
    this.expired  = expired;
}

module.exports = Token;