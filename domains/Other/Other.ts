// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
// @ts-ignore
import*as DomainsDAO from '../../dao/DomainsDAO';

const monitoredWebsiteDAO = new MonitoredWebsiteDAO();
const domainsDAO = new DomainsDAO();
function Other() {}

Other.prototype.getMonitoredWebsite = async (id)=>{
    let kq: any = {parent:{}, sub:[]};
    try{
        let webs = await monitoredWebsiteDAO.findByCondition(`parent=${id} AND deleted IS NULL`);
        //convert data
        webs.forEach(element=>{
            if(element.parent == element.id){
                kq.parent.id = element.id;
                kq.parent.siteName = element.siteName;
                kq.parent.url = element.url;
                kq.parent.frequently = element.frequently;
                kq.parent.connectionTimeout = element.connectionTimeout;
            }
            else{
                let tmp:any = {id: "", siteName:"", url: "", frequently:"", connectionTimeout: ""};
                tmp.id = element.id;
                tmp.siteName = element.siteName;
                tmp.url = element.url;
                tmp.frequently = element.frequently;
                tmp.connectionTimeout = element.connectionTimeout;
                kq.sub.push(tmp);
            }
        });
        //
        return kq;
    }catch (e) {
        throw e;
    }
};

Other.prototype.getAllParentMonitoredWebsite = async (credentialId)=>{
    let list=[];
    try{
        let webs = await monitoredWebsiteDAO.findByCondition(`credentialid=${credentialId} AND deleted IS NULL`);
        //convert data
        webs.forEach(element=>{
            if(element.parent == element.id){
                let tmp:any = {id: "", siteName:"", url: "", frequently:"", connectionTimeout: ""};
                tmp.id = element.id;
                tmp.siteName = element.siteName;
                tmp.url = element.url;
                tmp.frequently = element.frequently;
                tmp.connectionTimeout = element.connectionTimeout;
                list.push(tmp);
            }
        });
        return list;
    }catch (e) {
        throw e;
    }
};

Other.prototype.getDomainsOfWebsite = async (webId)=>{
    try{
        let domains: any = await domainsDAO.findByCondition(`webid=${webId} AND deleted IS NULL`);
        if(domains == null) return null;
        domains.forEach(e=>{
            delete e.webId;
            delete e.deleted;
            delete e.modified;
        });
        return domains;

    }catch (e) {
        throw e;
    }
};

module.exports = Other;