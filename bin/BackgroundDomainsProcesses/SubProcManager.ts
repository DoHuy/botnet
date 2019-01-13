// @ts-ignore
import {readFileSync, writeFileSync} from "fs";
// import {execSync} from "child_process";

const util = require('util');
// @ts-ignore
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const path = require('path');
const CONSTANT = require('../../commons/Constants');
// @ts-ignore
import {execSync} from "child_process";

const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const fork = require('child_process').fork;
// @ts-ignore
let SubProcManager: any = {};

/**
 *  ham nay xoa toan bo cac child_process cua  nghiep vu cua web khi goi ham xoa
 */
SubProcManager.killAllProc = (webId)=>{
    let procIdPath = path.join(__dirname, '..', '..', 'tmp', 'procIdtmp', `procs_${webId}.json`);

    let rs: any = fs.readFileSync(procIdPath, 'utf8');
    rs = JSON.parse(rs);
       if(rs["normal_proc_id"].length>0){
           rs["normal_proc_id"].forEach(e=>{
               execSync(`kill ${e}`);
           });
       }
        if(rs["advance_proc_id"].length>0){
            rs["advance_proc_id"].forEach(e=>{
                execSync(`kill ${e}`);
            });
        }

        fs.unlinkSync(procIdPath);

};

/**
 *  ham nay xoa toan bo cac normal child_process cua  nghiep vu cua web khi goi ham xoa
 */
SubProcManager.killAllNormalProc = (webId)=>{
    let procIdPath = path.join(__dirname, '..', '..', 'tmp', 'procIdtmp', `procs_${webId}.json`);

    try{
        let rs: any = fs.readFileSync(procIdPath, 'utf8');
        rs = JSON.parse(rs);
        if(rs["normal_proc_id"].length > 0){
            rs["normal_proc_id"].forEach( e=>{
                exec(`kill ${e}`);
            });
        }
        let data: any = {
            "normal_proc_id":[],
            "advance_proc_id":[]
        };
        fs.writeFileSync(procIdPath, JSON.stringify(data), 'utf8');

    }catch (e) {
        throw e;
    }

};

/**
 *  ham nay xoa toan bo cac advance child_process cua  nghiep vu cua web khi goi ham xoa
 */
SubProcManager.killAllAdvanceProc = (webId)=>{
    let procIdPath = path.join(__dirname, '..', '..', 'tmp', 'procIdtmp', `procs_${webId}.json`);

    try{
        let rs: any = fs.readFileSync(procIdPath, 'utf8');
        rs = JSON.parse(rs);
        if(rs["advance_proc_id"].length > 0){
            rs["advance_proc_id"].forEach( e=>{
                execSync(`kill ${e}`);
            });
        }
        let data: any = {
            "normal_proc_id":[],
            "advance_proc_id":[]
        };
        fs.writeFileSync(procIdPath, JSON.stringify(data), 'utf8');

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
SubProcManager.initNormalUpDownCheckingProc = (frequently, connectionTimeout, webId, url, parentId)=>{

    let proc: any = spawn('node', [ 'NormalUpDownCheckingProcess.js', frequently, connectionTimeout, webId, url],
        {detached: true, stdio: 'ignore'});
    // tach luong con chay doc lap so voi cha
    proc.unref();
    // init file tmp_proc muc dich la de luu lai pid cua process nay phuc vu cho viec quan li

    let data = {
        "advance_proc_id":[],
        "normal_proc_id":[proc.pid]
    };

    let procIdPath = path.join(__dirname, '..', '..', 'tmp', 'procIdtmp', `procs_${parentId}.json`);
    fs.writeFileSync(procIdPath, JSON.stringify(data), 'utf8');
    return proc;
};

SubProcManager.initAdvanceUpDownCheckingProc = (frequently, connectionTimeout, webId, url, parentId, countries)=>{
    countries = JSON.stringify(countries);
    try{
        let proc: any = spawn('node', ['AdvanceUpDownCheckingProcess.js', frequently, connectionTimeout, webId, url, countries],
            {detached: true, stdio: 'ignore'});
        proc.unref();

        let procPath = path.join(__dirname, '..', '..', 'tmp', 'procIdtmp', `procs_${parentId}.json`);
        let data: any =  fs.readFileSync(procPath, 'utf8');
        data = JSON.parse(data);
        console.log(data,'\n');
        console.log(proc.pid, '\n');
        data["advance_proc_id"].push(proc.pid);
        fs.writeFileSync(procPath,JSON.stringify(data), 'utf8');
        return proc;
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

// hackedDNS
SubProcManager.initHackedDNSDetectingProcess = (frequently, domainsList, ip, domainsId)=>{
    try{
        let proc: any = spawn('node', ['HackedDNSDetectingProcess.js', frequently, domainsList, ip, domainsId],
            {detached: true, stdio: 'ignore'});
        proc.unref();

        let procPath = path.join(__dirname, '..', '..', 'tmp', 'procDNSTmp', `procs_${domainsId}.txt`);
        fs.writeFileSync(procPath,proc.pid, 'utf8');
        return proc;
    }catch (e) {
        throw e;
    }

};

SubProcManager.destroyHackedDNSDetectingProcess = (domainsId)=>{
    let procPath = path.join(__dirname, '..', '..', 'tmp', 'procDNSTmp', `procs_${domainsId}.txt`);
    try{
        let pid = fs.readFileSync(procPath, 'utf8');
        execSync(`kill ${pid}`);
        fs.unlinkSync(procPath);
    }catch (e) {
        throw e;
    }
};

SubProcManager.initCoinminerDetectingProcess = (webId)=> {
    try{
        let proc: any = spawn('node', ['CoinminerDetectingProcess.js', webId],
            {detached: true, stdio: 'ignore'});
        proc.unref();

        let procPath = path.join(__dirname, '..', '..', 'tmp', 'coinMinerTmp', `${webId}.txt`);
        let procDir  = path.join(__dirname, '..', '..', 'tmp', 'coinMinerTmp');
        let checkPath = fs.existsSync(procDir);
        if(checkPath == false){
            fs.mkdirSync(procDir);
        }
        fs.writeFileSync(procPath,proc.pid, 'utf8');
        return proc;
    }catch (e) {
        throw e;
    }
}

SubProcManager.destroyCoinminerDetectingProcess = (webId)=>{
    let coinMinerProcPath = path.join(__dirname, '..', '..', 'tmp', 'coinMinerTmp', `${webId}.txt`);
    try{
        let pid = fs.readFileSync(coinMinerProcPath, 'utf8');
        execSync(`kill ${pid}`);
        fs.unlinkSync(coinMinerProcPath);
    }catch (e) {
        throw e;
    }
}
//
module.exports = SubProcManager;