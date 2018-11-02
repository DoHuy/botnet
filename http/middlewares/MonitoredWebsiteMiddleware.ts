
let MonitoredWebsiteMiddleware={};

// @ts-ignore
MonitoredWebsiteMiddleware.checkRegister = function(req, res, next){
    next();
}

module.exports = MonitoredWebsiteMiddleware;