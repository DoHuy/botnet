// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
import*as Libs from '../../commons/Libs';
import*as CONSTANT from '../../utils/Constants';
import*as CONFIG from '../../utils/Configs';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
function UpDownCheckingService() {

}

/**
 *
 * @param webId la  id website da dang ki dich vu
 * @return {responseTime: {DNSLookUp,..,}, analysisTime: {averageResponseTime, maxResponseTime, minResponseTime},
 * notification: {status, server, location, notificationLevel, message, snapshotPath}}
 */
UpDownCheckingService.prototype.checkAtCurrentLocation = async (webId)=>{

};

UpDownCheckingService.prototype.checkWithMultipleLocation = async (condition)=>{

};

// let obj = new UpDownCheckingService();
// obj.checkAtCurrentLocation(10).then((rs)=>{
//     console.log(rs);
// });

module.exports = UpDownCheckingService;

