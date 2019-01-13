import *as SubProcManager from './SubProcManager';
import *as fs from 'fs';
// @ts-ignore
import *as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';

const CMD = ['normal', 'advance', 'dns',  'detectMiner'];
const monitoredWebsiteDAO = new MonitoredWebsiteDAO();
let counter=0;
setInterval(() => {
    console.log("Bắt đầu kiểm tra việc thêm các luồng lần ", ++counter);
    monitoredWebsiteDAO.findAll().then(rs => {
        // console.log(rs);
        for (let i = 0; i < rs.length; i++) {
            let path = `../../tmp/activeProcs/${rs[i].id}.json`;
            fs.exists(path, (exists) => {
                if (exists) {
                    console.log("init child_process of web has id is ", rs[i].id);
                    fs.readFile(path, 'utf8', (err, chanvl: any) => {
                        if (err) throw err;
                        chanvl = JSON.parse(chanvl);
                        console.log(chanvl);
                        switch (chanvl.cmd) {
                            case CMD[0]:
                                // @ts-ignore frequently, connectionTimeout, webId, url, parentId
                                SubProcManager.initNormalUpDownCheckingProc(chanvl.data.frequently, chanvl.data.connectionTimeout, chanvl.data.webId, chanvl.data.url, chanvl.data.parentId);
                                break;
                            case CMD[1]:
                                // @ts-ignore frequently, connectionTimeout, webId, url, parentId, countries
                                SubProcManager.initAdvanceUpDownCheckingProc(chanvl.data.frequently, chanvl.data.connectionTimeout, chanvl.data.webId, chanvl.data.url, chanvl.data.parentId, chanvl.data.countries);
                                break;
                            case CMD[2]:
                                // @ts-ignore
                                SubProcManager.initHackedDNSDetectingProcess(chanvl.data.frequently, chanvl.data.domainsList, chanvl.data.ip, chanvl.data.domainsId);
                                break;
                            case CMD[3]:
                                // @ts-ignore
                                SubProcManager.initCoinminerDetectingProcess(chanvl.data.webId);
                        }
                        fs.unlink(path, (err)=>{
                            if(err) throw err;
                        });
                    });
                }
            });
        }
    });

}, 50000);