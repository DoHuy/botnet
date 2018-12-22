"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const path = require('path');
const CONSTANT = require('../../commons/Constants');
const child_process_1 = require("child_process");
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const fork = require('child_process').fork;
let SubProcManager = {};
SubProcManager.killAllProc = (webId) => {
    let procIdPath = path.join(__dirname, '..', '..', 'tmp', 'procIdtmp', `procs_${webId}.json`);
    let rs = fs.readFileSync(procIdPath, 'utf8');
    rs = JSON.parse(rs);
    if (rs["normal_proc_id"].length > 0) {
        rs["normal_proc_id"].forEach(e => {
            child_process_1.execSync(`kill ${e}`);
        });
    }
    if (rs["advance_proc_id"].length > 0) {
        rs["advance_proc_id"].forEach(e => {
            child_process_1.execSync(`kill ${e}`);
        });
    }
    fs.unlinkSync(procIdPath);
};
SubProcManager.killAllNormalProc = (webId) => {
    let procIdPath = path.join(__dirname, '..', '..', 'tmp', 'procIdtmp', `procs_${webId}.json`);
    try {
        let rs = fs.readFileSync(procIdPath, 'utf8');
        rs = JSON.parse(rs);
        if (rs["normal_proc_id"].length > 0) {
            rs["normal_proc_id"].forEach(e => {
                exec(`kill ${e}`);
            });
        }
        let data = {
            "normal_proc_id": [],
            "advance_proc_id": []
        };
        fs.writeFileSync(procIdPath, JSON.stringify(data), 'utf8');
    }
    catch (e) {
        throw e;
    }
};
SubProcManager.killAllAdvanceProc = (webId) => {
    let procIdPath = path.join(__dirname, '..', '..', 'tmp', 'procIdtmp', `procs_${webId}.json`);
    try {
        let rs = fs.readFileSync(procIdPath, 'utf8');
        rs = JSON.parse(rs);
        if (rs["advance_proc_id"].length > 0) {
            rs["advance_proc_id"].forEach(e => {
                child_process_1.execSync(`kill ${e}`);
            });
        }
        let data = {
            "normal_proc_id": [],
            "advance_proc_id": []
        };
        fs.writeFileSync(procIdPath, JSON.stringify(data), 'utf8');
    }
    catch (e) {
        throw e;
    }
};
SubProcManager.initNormalUpDownCheckingProc = (frequently, connectionTimeout, webId, url, parentId) => {
    let proc = spawn('node', ['NormalUpDownCheckingProcess.js', frequently, connectionTimeout, webId, url], { detached: true, stdio: 'ignore' });
    proc.unref();
    let data = {
        "advance_proc_id": [],
        "normal_proc_id": [proc.pid]
    };
    let procIdPath = path.join(__dirname, '..', '..', 'tmp', 'procIdtmp', `procs_${parentId}.json`);
    fs.writeFileSync(procIdPath, JSON.stringify(data), 'utf8');
    return proc;
};
SubProcManager.initAdvanceUpDownCheckingProc = (frequently, connectionTimeout, webId, url, parentId, countries) => {
    countries = JSON.stringify(countries);
    try {
        let proc = spawn('node', ['AdvanceUpDownCheckingProcess.js', frequently, connectionTimeout, webId, url, countries], { detached: true, stdio: 'ignore' });
        proc.unref();
        let procPath = path.join(__dirname, '..', '..', 'tmp', 'procIdtmp', `procs_${parentId}.json`);
        let data = fs.readFileSync(procPath, 'utf8');
        data = JSON.parse(data);
        console.log(data, '\n');
        console.log(proc.pid, '\n');
        data["advance_proc_id"].push(proc.pid);
        fs.writeFileSync(procPath, JSON.stringify(data), 'utf8');
        return proc;
    }
    catch (e) {
        throw e;
    }
};
SubProcManager.initCurrentIpCheckingProc = (connectionTimeout, webId, url) => {
    try {
        let proc = fork(`CurrentIpCheckingProc.js`, [connectionTimeout, webId, url]);
        return proc;
    }
    catch (e) {
        throw e;
    }
};
SubProcManager.initMultipleCountryCheckingProc = (connectionTimeout, url, countriesList) => {
    countriesList = JSON.stringify(countriesList);
    try {
        let proc = fork(`MultipleCountryCheckingProc.js`, [connectionTimeout, url, countriesList]);
        return proc;
    }
    catch (e) {
        throw e;
    }
};
SubProcManager.initMultipleIspCheckingProc = (connectionTimeout, url) => {
    try {
        let proc = fork(`MultipleIspCheckingProc.js`, [connectionTimeout, url]);
        return proc;
    }
    catch (e) {
        throw e;
    }
};
SubProcManager.initCalculateCountryProc = (arr, connectionTimeout, url) => {
    arr = JSON.stringify(arr);
    try {
        let proc = fork(`calculateCountryMetric.js`, [arr, connectionTimeout, url]);
        return proc;
    }
    catch (e) {
        throw e;
    }
};
SubProcManager.initHackedDNSDetectingProcess = (frequently, domainsList, ip, domainsId) => {
    try {
        let proc = spawn('node', ['HackedDNSDetectingProcess.js', frequently, domainsList, ip, domainsId], { detached: true, stdio: 'ignore' });
        proc.unref();
        let procPath = path.join(__dirname, '..', '..', 'tmp', 'procDNSTmp', `procs_${domainsId}.txt`);
        fs.writeFileSync(procPath, proc.pid, 'utf8');
        return proc;
    }
    catch (e) {
        throw e;
    }
};
SubProcManager.destroyHackedDNSDetectingProcess = (domainsId) => {
    let procPath = path.join(__dirname, '..', '..', 'tmp', 'procDNSTmp', `procs_${domainsId}.txt`);
    try {
        let pid = fs.readFileSync(procPath, 'utf8');
        child_process_1.execSync(`kill ${pid}`);
        fs.unlinkSync(procPath);
    }
    catch (e) {
        throw e;
    }
};
module.exports = SubProcManager;
//# sourceMappingURL=SubProcManager.js.map