

function Monitor(service) {
    this.service = service;
}

Monitor.prototype.executeMonitoringService = async function (jsonData)  {
    let data: any = await this.service.doOperation(jsonData);
    return data;
};

Monitor.prototype.executeFilteringService = async function (jsonData) {
    let data: any = await  this.service.filter(jsonData);
    return data;
}

module.exports = Monitor;
