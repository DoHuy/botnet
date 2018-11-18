// @ts-ignore
const util = require('util');
const CONSTANT = require('../../commons/Constants');
// @ts-ignore
let fs: any = require('fs');
// fs = util.promisify(fs);
// @ts-ignore
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const fork = require('child_process').fork;
// @ts-ignore
let SubProcManager: any = {};

/**
 *  ham nay xoa toan bo cac child_process cua  nghiep vu
 */
SubProcManager.killAllSubProc = async ()=>{
    try{
        let tmp: any = await fs.readFile('../../tmp/procIdtmp/procId.txt', 'utf8');
        let procIds: any = tmp.split("\n");
        procIds.forEach( async (e)=>{
           await exec(`pkill ${e}`);
        });
    }catch (e) {
        throw e;
    }
};

SubProcManager.initNormalUpDownCheckingProc = async (frequently, connectionTimeout, webId, url)=>{
    let proc: any = spawn('node', ['./NormalUpDownCheckingProc.js', frequently, connectionTimeout, webId, url],{
        detached: true,
        stdio: ['ignore']
    });

    await fs.writeFile(`../../tmp/procIdtmp/procId.txt`, `${proc.pid}\n`, 'utf8');
};

SubProcManager.initAdvanceUpDownCheckingProc = async (frequently, connectionTimeout, webId, url, previousProcIdList)=>{
    try{
        let proc: any = spawn('node', ['./AdvanceUpDownCheckingProcess.js', frequently, connectionTimeout, webId, url],{
            detached: true,
            stdio: ['ignore']
        });
        let data: any = `${previousProcIdList}${proc.pid}\n`;
        await fs.writeFile('../../tmp/procIdtmp/procId.txt', data, 'utf8');
        return data;
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
}


module.exports = SubProcManager;