

function Monitor(service) {
    this.service = service;
}

Monitor.prototype.executeMonitoringService = async function (jsonData)  {
    let data: any = await this.service.doOperation(jsonData);
    return data;
};

Monitor.prototype.executeFilteringService = async function (jsonData) {
    let data: any = await  this.service.doFiltering(jsonData);
    return data;
};

Monitor.prototype.executeDetectingService = async function (jsonData){
  let data: any = await this.service.doDetection(jsonData);
  return data;
};

Monitor.prototype.executeExportingService = async function (jsonData){
    let data: any = await this.service.doExporting(jsonData);
    return data;
};
module.exports = Monitor;
