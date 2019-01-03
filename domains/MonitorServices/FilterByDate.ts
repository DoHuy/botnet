import *as util from "util";
// @ts-ignore
import*as FilteringServiceInterface from './FilteringServiceInterface';
// @ts-ignore
import*as MonitoredWebssiteDAO from '../../dao/MonitoredWebsiteDAO';
// @ts-ignore
import*as ResponseStateDAO from '../../dao/ResponseStateDAO';

const monitoredWebsiteDAO = new MonitoredWebssiteDAO();
const responseStateDAO = new ResponseStateDAO();

function FilterByDate(){
    // @ts-ignore
    FilteringServiceInterface.call(this);
}

// implement ServiceInterface
util.inherits(FilterByDate, FilteringServiceInterface);
//

FilterByDate.prototype.doFiltering = async (jsonData)=>{
    let rs: any = {siteName:"", url:"", images:[]}

    try{
        let site: any = await monitoredWebsiteDAO.findById(jsonData.webId);
        let condition;
        if(jsonData.start != null && jsonData.end != null){
            condition = `webid=${jsonData.webId} AND created between '${jsonData.start}' and '${jsonData.end}'`;
        }
        else {
            condition = `webid=${jsonData.webId}`;
        }
        let respState: any = await responseStateDAO.findByCondition(condition);
        respState.forEach((e, index)=>{
            let obj;
            if(e.notification.notification != undefined){
                obj = {
                    created: e.created,
                    img: e.notification.notification.img
                }
            }
            else{
                obj = {
                    created: e.created,
                    img: e.notification.img
                }
            }
            rs.images.push(obj);
        });

        rs.siteName = site.siteName;
        rs.url = site.url;

    }catch (e) {
        throw e;
    }

    return rs;

};

module.exports = FilterByDate;