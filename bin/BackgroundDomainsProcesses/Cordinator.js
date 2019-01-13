"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SubProcManager = require("./SubProcManager");
const fs = require("fs");
const CONFIG = require("../../commons/Configs");
const MonitoredWebsiteDAO = require("../../dao/MonitoredWebsiteDAO");
const CMD = ['normal', 'advance', 'dns', 'detectMiner'];
const monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let counter = 0;
setInterval(() => {
    console.log("Bắt đầu kiểm tra việc thêm các luồng lần ", ++counter);
    monitoredWebsiteDAO.findAll().then(rs => {
        for (let i = 0; i < rs.length; i++) {
            let path = `../../tmp/activeProcs/${rs[i].id}.json`;
            fs.exists(path, (exists) => {
                if (exists) {
                    console.log("init child_process of web has id is ", rs[i].id);
                    fs.readFile(path, 'utf8', (err, chanvl) => {
                        if (err)
                            throw err;
                        chanvl = JSON.parse(chanvl);
                        console.log(chanvl);
                        switch (chanvl.cmd) {
                            case CMD[0]:
                                SubProcManager.initNormalUpDownCheckingProc(chanvl.data.frequently, chanvl.data.connectionTimeout, chanvl.data.webId, chanvl.data.url, chanvl.data.parentId);
                                break;
                            case CMD[1]:
                                SubProcManager.initAdvanceUpDownCheckingProc(chanvl.data.frequently, chanvl.data.connectionTimeout, chanvl.data.webId, chanvl.data.url, chanvl.data.parentId, chanvl.data.countries);
                                break;
                            case CMD[2]:
                                SubProcManager.initHackedDNSDetectingProcess(chanvl.data.frequently, chanvl.data.domainsList, chanvl.data.ip, chanvl.data.domainsId);
                                break;
                            case CMD[3]:
                                SubProcManager.initCoinminerDetectingProcess(chanvl.data.webId);
                        }
                        fs.unlink(path, (err) => {
                            if (err)
                                throw err;
                        });
                    });
                }
            });
        }
    });
}, CONFIG.COORDINATOR_TIME);
//# sourceMappingURL=Cordinator.js.map