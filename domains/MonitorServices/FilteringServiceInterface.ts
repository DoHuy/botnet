import *as util from "util";
// @ts-ignore
import*as ServiceInterface from './ServiceIneterface';

function FilteringServiceInterface(){
    ServiceInterface.call(this);
}

// implement ServiceInterface
util.inherits(FilteringServiceInterface, ServiceInterface);
//

FilteringServiceInterface.prototype.doFiltering = async ()=>{};


module.exports = FilteringServiceInterface;