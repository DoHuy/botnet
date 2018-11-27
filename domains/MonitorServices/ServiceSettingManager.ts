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
 * cho phep sua siteName, connectionTimeout, frequently, countries
 * @return {subId: subId}
 */
ServiceSettingManager.prototype.modifyConfigWebsite = async function (input, credentialId) {

    let countries = input.countries;
    delete input.countries;
    let modifiedKeys = Object.keys(input);
    try{
        let list: any = await monitoredWebSiteDAO.findByCondition(`parent=${input.parent} AND credentialid = ${credentialId}`);
        if(modifiedKeys.length == 0){ // neu ko co truong nao muon update
            // remove all advance child_proc
            // @ts-ignore
            SubProcManager.killAllAdvanceProc(input.parent);

            // init advance child_process for all site
            for(let i=0 ; i< list.length ; i++){
                let procPath = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${list[i].id}.json`);
                let data: any = {
                    cmd: CMD[1],
                    data: {
                        frequently: list[i].frequently,
                        connectionTimeout: list[i].connectionTimeout,
                        webId: list[i].id,
                        url: list[i].url,
                        countries: countries,
                        parentId: list[i].parent
                    }

                };
                data = JSON.stringify(data);
                await writeFile(procPath, data, 'utf8');
            }

            return list;
        }
        else{
            let updatedList = []; // luu tru lai cac site da duoc update
            let modifiedValues = [];
            modifiedKeys.forEach(e=>{
               modifiedValues.push(input[e]);
            });
            modifiedKeys = modifiedKeys.map(e=>e.toLowerCase());
            // uodate lai all site of credential
            for(let i=0 ; i<list.length ; i++){
                let tmp: any = await monitoredWebSiteDAO.modifyById(list[i].id, modifiedKeys, modifiedValues );
                updatedList.push(tmp);
                modifiedValues.pop();
            }

            // remove all advance child_proc
            // @ts-ignore
            SubProcManager.killAllAdvanceProc(input.parent);

            // init advance child_process for all site
            for(let i=0 ; i< updatedList.length ; i++){
                let procPath = path.join(__dirname, '..', '..', 'tmp', 'activeProcs', `${updatedList[i].id}.json`);
                let data: any = {
                    cmd: CMD[1],
                    data: {
                        frequently: updatedList[i].frequently,
                        connectionTimeout: updatedList[i].connectionTimeout,
                        webId: updatedList[i].id,
                        url: updatedList[i].url,
                        countries: countries,
                        parentId: updatedList[i].parent
                    }

                };
                data = JSON.stringify(data);
                await writeFile(procPath, data, 'utf8');
            }
            //
            return updatedList;
        }
    }catch (e) {
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

