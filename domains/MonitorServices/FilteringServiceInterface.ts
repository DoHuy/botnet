import *as util from "util";
// @ts-ignore
import*as ServiceInterface from './ServiceIneterface';

function FilteringServiceInterface(){
    ServiceInterface.call(this);
}

// implement ServiceInterface
util.inherits(FilteringServiceInterface, ServiceInterface);
//

FilteringServiceInterface.prototype.filter = async ()=>{};


module.exports = FilteringServiceInterface;