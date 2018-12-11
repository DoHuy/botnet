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
        let respState: any = await responseStateDAO.findByCondition(`webid=${jsonData.webId} AND created between '${jsonData.start}' and '${jsonData.end}'`);
        respState.forEach(e=>{

            // console.log(e.notification.notification.img);
            let obj = {
                created: e.created,
                img: e.notification.notification.img
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