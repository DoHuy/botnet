// @ts-ignore
import *as ServiceSettingManagerInterface from './ServiceSettingManagerInterface';
import *as util from 'util';
// @ts-ignore
import*as SubProcManager from '../../bin/BackgroundDomainsProcesses/SubProcManager';
// @ts-ignore
import *as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
import *as CONSTANT from '../../commons/Constants';

const path = require('path');
const fs = require('fs');
const writeFile = util.promisify(fs.writeFile);
const CMD = ["normal", "advance"];
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
    //bo sung credentialId vao input
    input.credentialId = credentialId;
    input.created = new Date();
    try {
        await monitoredWebSiteDAO.transactionBegin();
        let rs: any = await monitoredWebSiteDAO.create(input);
        rs = await monitoredWebSiteDAO.modifyById(rs.id, ['parent', 'modified'], [rs.id, rs.created]);

        // init child_process by way save data to file id.json , purpose create new child_process
        let data: any = {
            cmd: CMD[0],
            data:{
                frequently: rs.frequently,
                connectionTimeout: rs.connectionTimeout,
                webId: rs.id,
                url: rs.url,
                parentId: rs.id
            }
        };

        data = JSON.stringify(data);
        let pathProc = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${rs.id}.json`);
        await writeFile(pathProc, data, 'utf8');
        //
        await monitoredWebSiteDAO.transactionCommit();
        return rs;
    } catch (e) {
        await monitoredWebSiteDAO.transactionRollback();
        throw e;
    }

};

/**
 * done
 * @param config: {parent, frequently, connectiontimeout, subList:[{siteName, url}]}
 * @return {tra ve mang cac subsite}
 */
ServiceSettingManager.prototype.addAdvanceConfigWebsite = async function (config, credentialId) {
    let result: any = [];
    let keys = ['frequently', 'connectiontimeout', 'modified'];
    let values = [config.frequently, config.connectionTimeout, new Date().toISOString()];

    try {
        await monitoredWebSiteDAO.transactionBegin();

        let rs = await monitoredWebSiteDAO.modifyById(config.parent, keys, values);
        for (let i = 0; i < config.subList.length; i++) {
            let sub = config.subList[i];
            try {
                let tmp = await monitoredWebSiteDAO.create({
                    siteName: sub.siteName,
                    url: sub.url,
                    connectionTimeout: config.connectionTimeout,
                    frequently: config.frequently,
                    parent: config.parent,
                    created: new Date(),
                    credentialId: credentialId
                });
                result.push(tmp);
                // delete all normalUpDownCheckingProc of parentSite
                // @ts-ignore
                SubProcManager.killAllNormalProc(config.parent);
                // init child_process AdvanceUpDownChecheckingProc for parentSite and all subSite
                let pathParentProc = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${rs.id}.json`);
                let parentData: any = {
                  cmd: CMD[1],
                  data: {
                      frequently: rs.frequently,
                      connectionTimeout: rs.connectionTimeout,
                      webId: rs.id,
                      url: rs.url,
                      countries: config.countries,
                      parentId: rs.id
                  }
                };
                parentData = JSON.stringify(parentData);
                await writeFile(pathParentProc, parentData, 'utf8');
                //
                //
                result.forEach(async (e) => {
                   let subPath = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${e.id}.json`);
                   let subData: any = {
                       cmd: CMD[1],
                       data: {
                           frequently: e.frequently,
                           connectionTimeout: e.connectionTimeout,
                           webId: e.id,
                           url: e.url,
                           countries: config.countries,
                           parentId: rs.id
                       }
                   };
                   subData = JSON.stringify(subData);
                   await writeFile(subPath, subData, 'utf8');
                });

                //
            } catch (e) {
                console.log("huy test: ", e);
                throw e;
            }
        }
        await monitoredWebSiteDAO.transactionCommit();
        return result;
    } catch (e) {
        await monitoredWebSiteDAO.transactionRollback();
        throw e;
    }
}

/**
 * input: {webId, updatedData:{siteName, frequently, connectionTimeout}}
 * cho phep sua siteName, connectionTimeout, frequently, subList, countries
 * @return {subId: subId}
 */
ServiceSettingManager.prototype.modifyConfigWebsite = async function (input, credentialId) {

    try{
        let frequently = input.frequently;
        let connectionTimeout = input.connectionTimeout;
        let siteName = input.siteName;
        let subList: any = input.subList;
        let parentSite: any;
        // update lai config cho cha
        await monitoredWebSiteDAO.transactionBegin();
        let siteList: any = await monitoredWebSiteDAO.findByCondition(`parent = ${input.parent} AND credentialid=${input.credentialId} AND deleted IS NULL`);
        for(let i=0 ; i<siteList.length ; i++){
            if(siteList.id == input.parent){
                parentSite = await monitoredWebSiteDAO.modifyById(input.parent, ['sitename', 'frequently', 'connectiontimeout'], [siteName, frequently, connectionTimeout]);
            }
            else{
                await monitoredWebSiteDAO.deleteById(siteList.id);
            }
        }

        // tao lai child_process cho cha
        // @ts-ignore
        SubProcManager.killAllAdvanceProc(input.parent);
        let parentPath = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${input.parent}.json`);
        let parentData: any = {
            frequently: frequently,
            connectionTimeout: connectionTimeout,
            webId: input.parent,
            url: parentSite.url,
            parentId: input.parent,
            countries: input.countries
        };
        parentData = JSON.stringify(parentData);
        await writeFile(parentPath, parentData, 'utf8');
        // tao cac site con cho cha va tao child_process cho moi site
        for(let i=0 ; i<subList.length ; i++){
            let subSite: any = await monitoredWebSiteDAO.create({
                siteName: subList[i].siteName,
                url: subList[i].url,
                connectionTimeout: connectionTimeout,
                frequently: frequently,
                parent: input.parent,
                created: new Date(),
                credentialId: input.credentialId
            });

            let subData: any = {
                frequently: frequently,
                connectionTimeout: connectionTimeout,
                webId: subSite.id,
                url: subSite.url,
                parentId: input.parent,
                countries: input.countries
            };
            subData = JSON.stringify(subData);
            let subPath = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${subSite.id}.json`);
            await writeFile(subPath, subData, 'utf8');

        }
        await monitoredWebSiteDAO.transactionCommit();
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
ServiceSettingManager.prototype.removeWebsite = async function (id) {
    let result;
    try {
        await monitoredWebSiteDAO.transactionBegin();
        await monitoredWebSiteDAO.deleteById(id);
        let sub: any = await monitoredWebSiteDAO.findByCondition(` parent = ${id}`);
        for (let i = 0; i < sub.length; i++) {
            await monitoredWebSiteDAO.deleteById(sub[i].id);
        }
        await monitoredWebSiteDAO.transactionCommit();
        // delete all child_process of this web and sub_web of this web
        // @ts-ignore
        SubProcManager.killAllProc(id);
        //
        return true;

    } catch (e) {
        await monitoredWebSiteDAO.transactionRollback();
        throw e;
    }
};


module.exports = ServiceSettingManager;

