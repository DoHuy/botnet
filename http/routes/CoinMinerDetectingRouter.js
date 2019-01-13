const Middleware = require('../middlewares/Middleware');
const Controller = require('../contollers/Controller');
const router = require('express').Router();
router.get(`/detect/coinMiner/monitoredWebsite/:id`, Middleware.verifyToken, Middleware.CoinMinerDetectingMid.beforeDetect, Controller.CoinMinerDetectingCon.detect);
router.post('/detect/coinMiner/monitoredWebsite/:id', Middleware.verifyToken, Middleware.CoinMinerDetectingMid.beforeRegisterService, Controller.CoinMinerDetectingCon.registerService);
router.delete(`/detect/coinMiner/monitoredWebsite/:id`, Middleware.verifyToken, Middleware.SearchingMid.beforeSearchByDate, Controller.CoinMinerDetectingCon.deleteService);
module.exports = router;
//# sourceMappingURL=CoinMinerDetectingRouter.js.map