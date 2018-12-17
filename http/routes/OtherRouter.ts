// @ts-ignore
const Middleware = require('../middlewares/Middleware');
// @ts-ignore
const Controller = require('../contollers/Controller');

// @ts-ignore
const router = require('express').Router();


// api
// @ts-ignore
router.get('/countries', Middleware.verifyToken, Controller.OtherCon.getCountries);
router.get('/monitoredWebsites/:id', Middleware.verifyToken, Middleware.OtherMid.beforeGetMonitoredWebSite, Controller.OtherCon.getMonitoredWebsite);
router.get('/monitoredWebsites', Middleware.verifyToken, Middleware.OtherMid.beforeGetAllParentMonitoredWebSite, Controller.OtherCon.getAllParentMonitoredWebsite);
router.get('/domains/monitoredWebsites/:id', Middleware.verifyToken, Middleware.OtherMid.beforeGetDomainsOfWebsite, Controller.OtherCon.getDomainsOfWebsite);
// router.get('/count/sub/monitoredwebsites/:id')
//
module.exports = router;