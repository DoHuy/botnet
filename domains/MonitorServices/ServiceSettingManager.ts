// @ts-ignore
import*as ServiceSettingManagerInterface from './ServiceSettingManagerInterface';
import*as util from 'util';
// @ts-ignore
import*as Killer from '../../bin/BackgroundDomainsProcesses/SubProcManager';
// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
import {spawn} from "child_process";
import*as CONSTANT from '../../commons/Constants';

let fs = util.promisify(require('fs'));
let monitoredWebSiteDAO = new MonitoredWebsiteDAO();
function ServiceSettingManager() {
    ServiceSettingManagerInterface.call(this);
}
// implements
util.inherits(ServiceSettingManager, ServiceSettingManagerInterface);

/**
 * done
 * input: {siteName, url}
 * ham nay tao 1 website de giam sat
 * @param web la thong tin
 * @return 1 doi tuong website
 */
ServiceSettingManager.prototype.createWebsite = async function (input, credentialId) {
    input.credentialId = credentialId;
    input.created = new Date();
    try {
        await monitoredWebSiteDAO.transactionBegin();
        let rs: any = await monitoredWebSiteDAO.create(input);
        rs = await monitoredWebSiteDAO.modifyById(rs.id, ['parent', 'modified'], [rs.id, rs.created]);
        await monitoredWebSiteDAO.transactionCommit();

        // init child_process monitor_web // 4 argument : frequently, connectionTimeout, webId, url
        // init
        // let proc = spawn('node', [CONSTANT.PATH.CURRENT_IP_PROC, rs.frequently, rs.connectionTimeout, rs.id, rs.url],{
        //     detached: true,
        //     stdio: 'ignore'
        // });
        // //
        // // save procId
        // // @ts-ignore
        // await fs.writeFile(CONSTANT.PATH.PROC_ID_FILE_PATH, 'utf8');
        return rs;
    }catch (e) {
        await monitoredWebSiteDAO.transactionRollback();
        throw e;
    }

};

/**
 * @param config: {parent, frequently, connectiontimeout, subList:[{siteName, url}]}
 * @return {tra ve mang cac subsite}
 */
ServiceSettingManager.prototype.addAdvanceConfigWebsite = async function (config, credentialId) {
    let result: any=[];
    let keys = ['frequently', 'connectiontimeout', 'modified'];
    let values=[config.frequently, config.connectionTimeout, new Date().toISOString()];

    try{
        await monitoredWebSiteDAO.transactionBegin();

        let rs = await monitoredWebSiteDAO.modifyById(config.parent, keys, values);
        for(let i=0 ; i<config.subList.length ; i++){
            let sub = config.subList[i];
            try{
               let tmp =  await monitoredWebSiteDAO.create({
                    siteName: sub.siteName,
                    url: sub.url,
                    connectionTimeout: config.connectionTimeout,
                    frequently: config.frequently,
                    parent: config.parent,
                    created: new Date(),
                    credentialId: credentialId
                });
               result.push(tmp);
            }catch (e) {
                console.log("huy test: ", e);
                throw e;
            }
        }
        await monitoredWebSiteDAO.transactionCommit();
        return result;
    }catch (e) {
        await monitoredWebSiteDAO.transactionRollback();
        throw e;
    }
}

/**
 * input: {webId, updatedData:{frequently, connectionTimeout}}
 * cho phep sua siteName, connectionTimeout, frequently
 * @return {subId: subId}
 */
ServiceSettingManager.prototype.modifyConfigWebsite = async function(input, credentialId){
    let result;
    let keys = [];
    let webId;
    for(let key in input){
        if(key == "webId"){
            webId = input[key];
            delete input[key];
            break;
        }
    }
    keys = Object.keys(input);
    keys = keys.map(e=>e.toLowerCase());
    let updateDataList = [];
    for(let key in input){
        updateDataList.push(input[key]);
    }
    try{
        await monitoredWebSiteDAO.transactionBegin();

        // cap nhat lai config cua cac subsite
        let list: any = await monitoredWebSiteDAO.findByCondition(` parent=${webId} AND credentialid=${credentialId}`);
        for(let i=0 ; i<list.length ; i++){
            updateDataList=[];
            for(let key in input){
                updateDataList.push(input[key]);
            }
            await monitoredWebSiteDAO.modifyById(list[i].id, keys, updateDataList);

        }
        await monitoredWebSiteDAO.transactionCommit();
        return true;
    }catch (e) {
        await monitoredWebSiteDAO.transactionRollback();
        throw e;
    }
};


/**
 * input: {id cua websiteParent}
 * xoa di site chinh va toan bo site con cua no web day
 * @param id web muon xoa
 * @return true or false
 */
ServiceSettingManager.prototype.removeWebsite = async function(id){
    let result;
    try{
        await monitoredWebSiteDAO.transactionBegin();
        await monitoredWebSiteDAO.deleteById(id);
        let sub: any = await monitoredWebSiteDAO.findByCondition(` parent = ${id}`);
        for(let i=0 ; i<sub.length ; i++){
            await monitoredWebSiteDAO.deleteById(sub[i].id);
        }
        await monitoredWebSiteDAO.transactionCommit();
        return true;

    }catch (e) {
        await monitoredWebSiteDAO.transactionRollback();
        throw e;
    }
};



module.exports = ServiceSettingManager;

