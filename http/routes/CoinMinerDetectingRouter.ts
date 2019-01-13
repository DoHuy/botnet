// @ts-ignore
const Middleware = require('../middlewares/Middleware');
// @ts-ignore
const Controller = require('../contollers/Controller');

// @ts-ignore
const router = require('express').Router();


// api
// @ts-ignore
router.get(`/detect/coinMiner/monitoredWebsite/:id`, Middleware.verifyToken,  Middleware.CoinMinerDetectingMid.beforeDetect, Controller.CoinMinerDetectingCon.detect);
router.post('/detect/coinMiner/monitoredWebsite/:id', Middleware.verifyToken,  Middleware.CoinMinerDetectingMid.beforeRegisterService, Controller.CoinMinerDetectingCon.registerService);
router.delete(`/detect/coinMiner/monitoredWebsite/:id`, Middleware.verifyToken,  Middleware.SearchingMid.beforeSearchByDate, Controller.CoinMinerDetectingCon.deleteService);

//
module.exports = router;