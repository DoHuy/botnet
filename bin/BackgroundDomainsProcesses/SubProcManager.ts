// @ts-ignore
const util = require('util');
// @ts-ignore
const fs = require('fs');
const CONSTANT = require('../../commons/Constants');
// @ts-ignore
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const fork = require('child_process').fork;
let writeFile: any = util.promisify(fs.writeFile);
let readFile: any = util.promisify(fs.readFile);
let unlink: any = util.promisify(fs.unlink);
// @ts-ignore
let SubProcManager: any = {};

/**
 *  ham nay xoa toan bo cac child_process cua  nghiep vu cua web khi goi ham xoa
 */
SubProcManager.killAllProc = async (webId)=>{

    try{
        let data: any = await readFile(`../../tmp/procIdtmp/${webId}_procs.json`, 'utf8');
        data = JSON.parse(data);

        // kill all process
        data["advance_proc_id"].forEach(async (e)=>{
            await exec(`kill ${e}`);
        });

        data["normal_proc_id"].forEach(async (e)=>{
            await exec(`kill ${e}`);
        });
        await fs.unlink(`../../tmp/procIdtmp/${webId}_procs.json`);
    }catch (e) {
        throw e;
    }

};

/**
 *  khoi tao process,
 * @param frequently
 * @param connectionTimeout
 * @param webId
 * @param url
 */
SubProcManager.initNormalUpDownCheckingProc = async (frequently, connectionTimeout, webId, url)=>{
    let proc: any = spawn('node', ['./NormalUpDownCheckingProc.js', frequently, connectionTimeout, webId, url],{
        detached: true,
        stdio: ['ignore']
    });
    // init file tmp_proc
    let data = {
        "advance_proc_id":[],
        "normal_proc_id":[proc.pid]
    }
    await writeFile(`../../tmp/procIdtmp/${webId}_procs.json`, data, 'utf8');
};

SubProcManager.initAdvanceUpDownCheckingProc = async (frequently, connectionTimeout, webId, url, previousProcIdList)=>{
    try{
        let proc: any = spawn('node', ['./AdvanceUpDownCheckingProcess.js', frequently, connectionTimeout, webId, url],{
            detached: true,
            stdio: ['ignore']
        });
        let data: any =  await readFile(`../../tmp/procIdtmp/${webId}_procs.json`, 'utf8');
        data = JSON.parse(data);
        data["advance_proc_id"].push(proc.pid);
        await writeFile(`../../tmp/procIdtmp/${webId}_procs.json`,data, 'utf8');
    }catch (e) {
        throw e;
    }

};

/**
 *  khoi tao 1 child_process excute file CurrentIpCheckingProc.js
 * @param connectionTimeout
 * @param webId
 * @param url
 * @return  instance of this child_process
 */
SubProcManager.initCurrentIpCheckingProc = (connectionTimeout, webId, url)=>{
    try{
        let proc = fork(`CurrentIpCheckingProc.js`, [connectionTimeout, webId, url]);
        return proc;
    }catch (e) {
        throw e;
    }
};

SubProcManager.initMultipleCountryCheckingProc = (connectionTimeout, url, countriesList)=>{
    countriesList = JSON.stringify(countriesList);
    try{
        let proc = fork(`MultipleCountryCheckingProc.js`, [connectionTimeout, url, countriesList]);
        return proc;
    }catch (e) {
        throw e;
    }
};

SubProcManager.initMultipleIspCheckingProc = (connectionTimeout, url)=>{
    try{
        let proc = fork(`MultipleIspCheckingProc.js`, [connectionTimeout, url]);
        return proc;
    }catch (e) {
        throw e;
    }
};

SubProcManager.initCalculateCountryProc = (arr, connectionTimeout, url)=>{
    arr = JSON.stringify(arr);
    try{
        let proc = fork(`calculateCountryMetric.js`, [arr, connectionTimeout, url]);
        return proc;
    }catch (e) {
        throw e;
    }
};

//
// SubProcManager.initCalculateIspProc = (arr, connectionTimeout, url)=>{
//     arr = JSON.stringify(arr);
//     try{
//         let proc = fork(`calculateIspMetric.js`, [arr, connectionTimeout, url]);
//         return proc;
//     }catch (e) {
//         throw e;
//     }
// };

module.exports = SubProcManager;