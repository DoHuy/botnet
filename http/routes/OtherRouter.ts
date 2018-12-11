// @ts-ignore
const Middleware = require('../middlewares/Middleware');
// @ts-ignore
const Controller = require('../contollers/Controller');

// @ts-ignore
const router = require('express').Router();


// api
// @ts-ignore
router.get('/countries', Middleware.verifyToken, Controller.OtherCon.getCountries);
router.get('/monitoredWebsite/:id', Middleware.verifyToken, Middleware.OtherMid.beforeGetMonitoredWebSite, Controller.OtherCon.getMonitoredWebsite);
//
module.exports = router;