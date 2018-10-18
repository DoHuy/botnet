// @ts-ignore
const router = require('express').Router();
// @ts-ignore
const Middleware = require('../middlewares/Middleware');
// @ts-ignore
const Controller = require('../contollers/Controller');


// @ts-ignore
router.get(`/register`, Middleware.MonitoredWebsiteMid.checkRegister);
module.exports = router;