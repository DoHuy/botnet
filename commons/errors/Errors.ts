
// @ts-ignore
let CustomizeErrors: any = {};

CustomizeErrors.createHttpError = function (httpCode, errCode, message, details) {
    return {
        httpCode, errCode, message, details
    }
}

CustomizeErrors.createDomainError = function (errCode, message, details) {
    return {
        errCode, message, details
    }
}

module.exports = CustomizeErrors;

// console.log(CustomizeErrors.createDomainError(500, 'A', 'aaaaa', 'Aaaaaaaa'));