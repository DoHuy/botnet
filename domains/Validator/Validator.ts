
function Validator() {}

Validator.prototype.validateLogin = function (rawData){
    if(rawData.credentialname == undefined){
        return {flag: false, message: "thiếu credentialname"};
    }
    if(rawData.password == undefined){
        return {flag: false, message: "thiếu password"};
    }

    return {flag: true, message: "OK"};
}

Validator.prototype.validateSignUp = function (rawData){
    if(rawData.credentialname == undefined){
         return {flag: false, message: "thiếu credentialname"};
    }
    if(rawData.password == undefined){
        return {flag: false, message: "thiếu password"};
    }
    if(rawData.email == undefined){
        return {flag: false, message: "thiếu email"};
    }
    if(rawData.phone == undefined){
        return {flag: false, message: "thiếu phone"};
    }

    return {flag: true, message: "OK"};
}

module.exports = Validator;