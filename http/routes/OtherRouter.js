const Middleware = require('../middlewares/Middleware');
const Controller = require('../contollers/Controller');
const router = require('express').Router();
router.get('/countries', Middleware.verifyToken, Controller.OtherCon.getCountries);
router.get('/monitoredWebsites/:id', Middleware.verifyToken, Middleware.OtherMid.beforeGetMonitoredWebSite, Controller.OtherCon.getMonitoredWebsite);
router.get('/monitoredWebsites', Middleware.verifyToken, Middleware.OtherMid.beforeGetAllParentMonitoredWebSite, Controller.OtherCon.getAllParentMonitoredWebsite);
router.get('/domains/monitoredWebsites/:id', Middleware.verifyToken, Middleware.OtherMid.beforeGetDomainsOfWebsite, Controller.OtherCon.getDomainsOfWebsite);
module.exports = router;
//# sourceMappingURL=OtherRouter.js.map