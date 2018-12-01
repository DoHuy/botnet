// @ts-ignore
const Middleware = require('../middlewares/Middleware');
// @ts-ignore
const Controller = require('../contollers/Controller');

// @ts-ignore
const router = require('express').Router();


// api
// @ts-ignore
router.get(`/search/images/monitoredWebsite/:id`, Middleware.verifyToken,  Middleware.SearchingMid.beforeSearchByDate, Controller.SearchingCon.searchByDate);
//
module.exports = router;