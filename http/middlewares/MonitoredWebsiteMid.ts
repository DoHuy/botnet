
let MonitoredWebsiteMid={};

// @ts-ignore
MonitoredWebsiteMid.checkRegister = function(req, res, next){
    res.status(200).send("heeloo");
}

module.exports = MonitoredWebsiteMid;