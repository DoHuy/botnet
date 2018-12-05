// @ts-ignore
import*as ServiceInterface from './ServiceIneterface';
import*as util from 'util';

function DetectingServiceInterface() {
    ServiceInterface.call(this);
}

//implement ServiceInterface
util.inherits(DetectingServiceInterface, ServiceInterface);

DetectingServiceInterface.prototype.doDetection = ()=>{};

module.exports = DetectingServiceInterface;