// @ts-ignore
const Libs = require('../../commons/Libs');
let MonitoredWebsiteCon={};

// @ts-ignore
MonitoredWebsiteCon.register = function(req, res){

}

// @ts-ignore
MonitoredWebsiteCon.checkStatusWebsite = async function(req, res){
    let result;
    try{
        result = await Libs.requestCurl('https://news.zidng.vn',{ip: '117.103.2.254', port: '58276'}, 55)
        res.status(200).send(result);
    }catch (e) {
        res.status(500).send(e);
    }


}

module.exports = MonitoredWebsiteCon;