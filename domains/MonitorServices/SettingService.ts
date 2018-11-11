// @ts-ignore
import*as SettingServiceInterface from './SettingServiceInterface';
import*as util from 'util';
// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
let monitoredWebSiteDAO = new MonitoredWebsiteDAO();
function SettingService() {
    SettingServiceInterface.call(this);
}
// implements
util.inherits(SettingService, SettingServiceInterface);

/**
 * done
 * input: {siteName, url}
 * ham nay tao 1 website de giam sat
 * @param web la thong tin
 * @return 1 doi tuong website
 */
SettingService.prototype.createWebsite = async function (input, credentialId) {
    input.credentialId = credentialId;
    input.created = new Date();
    try {
        await monitoredWebSiteDAO.transactionBegin();
        let rs: any = await monitoredWebSiteDAO.create(input);
        rs = await monitoredWebSiteDAO.modifyById(rs.id, ['parent', 'modified'], [rs.id, rs.created]);
        await monitoredWebSiteDAO.transactionCommit();
        return rs;
    }catch (e) {
        await monitoredWebSiteDAO.transactionRollback();
        throw e;
    }
}

/**
 *
 * @param config: {parent, frequently, connectiontimeout, subList:[{siteName, url}]}
 * @return {tra ve mang cac subsite}
 */
SettingService.prototype.addAdvanceConfigWebsite = async function (config, credentialId) {
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
 * input: {webId, updatedData:{siteName, frequently, connectionTimeout}, subSite:[{url, isDelete, isCreate}]}
 * cho phep sua siteName, connectionTimeout, frequently, subSite
 * sua subSite o day la them hoac xoa bot subSite
 * @return {subId: subId}
 */
SettingService.prototype.modifyConfigWebsite = async function(input){
    let result;
    let keys = Object.keys(input.updatedData);
    let values = [];
    for(let k in input.updatedData){
        values.push(input.updatedData[k]);
    }
    try{
        await monitoredWebSiteDAO.transactionBegin();

        // cap nhat lai config cua cac subsite
        let list: any = await monitoredWebSiteDAO.findByCondition(` parent=${input.webId}`);
        for(let i=0 ; i<list.length ; i++){
            await monitoredWebSiteDAO.modifyById(list[i].id, keys, values);

        }

        // them hoac xoa di subsite
        for(let i=0 ; i<input.subSite.length ; i++){
            let sub = input.subSite[i];
            if(sub.isDelete == true){
                await monitoredWebSiteDAO.deleteByCondition(`url=${sub.url} AND parent=${input.webId}`);
            }
            if(sub.isCreate == true){
                let parent = await monitoredWebSiteDAO.findByCondition(`parent=${input.webId}`);
                await monitoredWebSiteDAO.create({
                    url: parent.url,
                    frequently: parent.frequently,
                    connectionTimeout: parent.connectionTimeout,
                    parent: parent.id,
                    created: new Date(),
                    credentialId: parent.credentialId
                });

            }
        }

        result = await monitoredWebSiteDAO.findByCondition(`parent=${input.webId}`);

        await monitoredWebSiteDAO.transactionCommit();
        return result;
    }catch (e) {
        await monitoredWebSiteDAO.transactionRollback();
        throw e;
    }
}


/**
 * input: {id cua websiteParent}
 * xoa di site chinh va toan bo site con cua no web day
 * @param id web muon xoa
 * @return true or false
 */
SettingService.prototype.removeWebsite = async function(id){
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


module.exports = SettingService;

