

function Monitor(service) {
    this.service = service;
}

Monitor.prototype.executeStratergy = async function (jsonData)  {
    let data: any = await this.service.doOperation(jsonData);
    return data;
}

module.exports = Monitor;
