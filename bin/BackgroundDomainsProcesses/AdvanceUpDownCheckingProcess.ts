// @ts-ignore
import *as MonitoredWebsiteDAO from "../../dao/MonitoredWebsiteDAO";
// @ts-ignore
import *as ProxyDAO from '../../dao/ProxyDAO';
import *as Lib from "../../commons/Libs";
import *as CONFIG from "../../commons/Configs";
import *as CONSTANT from "../../commons/Constants";
import *as util from "util";
import {NOTICE_RULE} from "../../commons/Configs";

const exec = util.promisify(require('child_process').exec);


// 4 argument : frequently, connectionTimeout, webId, url
let AdvanceUpDownCheckingProcess: any = {};
let monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let proxyDAO = new ProxyDAO();
AdvanceUpDownCheckingProcess.frequently = process.argv[2] || 1;
AdvanceUpDownCheckingProcess.connectionTimeout = process.argv[3] || 30;
AdvanceUpDownCheckingProcess.webId = process.argv[4] || 10;
AdvanceUpDownCheckingProcess.url = process.argv[5] || "http://xxx.com:8080";
/**
 *
 *
 * {created: {DNSLookup..., averageResponseTime, minResponseTime, maxResponseTime, upTotal, downTotal, location:{}, multipleCountry:[], multipleIsp:[]}}
 //{notification: {server, status, level, message, state, img, multipleCountry:[], multipleIsp:[]}
 * @return void
 */
AdvanceUpDownCheckingProcess.run = async function () {

};