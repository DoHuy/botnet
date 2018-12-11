// @ts-ignore
import*as MonitoredWebsiteDAO from '../../dao/MonitoredWebsiteDAO';
const monitoredWebsiteDAO = new MonitoredWebsiteDAO();
function Other() {}

Other.prototype.getMonitoredWebsite = async (id)=>{
    let kq: any = {parent:{}, sub:[]};
    try{
        let webs = await monitoredWebsiteDAO.findByCondition(`parent=${id}`);
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
module.exports = Other;