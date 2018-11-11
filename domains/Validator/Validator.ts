
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


Validator.prototype.validateUrl = (url)=>{
    let reg = /((http|https):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if(reg.test(url)) return true;
    return false;
}

module.exports = Validator;