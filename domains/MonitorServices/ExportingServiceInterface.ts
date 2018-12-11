// @ts-ignore
import*as ServiceInterface from './ServiceIneterface';
import*as util from 'util';

function ExportingServiceInterface() {
    ServiceInterface.call(this);
}

//implement ServiceInterface
util.inherits(ExportingServiceInterface, ServiceInterface);

ExportingServiceInterface.prototype.doExporting = ()=>{};

module.exports = ExportingServiceInterface;