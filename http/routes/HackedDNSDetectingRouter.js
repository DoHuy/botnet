const Middleware = require('../middlewares/Middleware');
const Controller = require('../contollers/Controller');
const HackedDNSDetectingRouter = require('express').Router();
HackedDNSDetectingRouter.post('/DNS/monitoredWebsite/:id', Middleware.verifyToken, Middleware.HackedDNSDetectingMid.beforeAddConfigDNS, Controller.HackedDNSDetectingCon.addConfigDNS);
HackedDNSDetectingRouter.delete('/DNS/monitoredWebsite/:id', Middleware.verifyToken, Middleware.HackedDNSDetectingMid.beforeDelete, Controller.HackedDNSDetectingCon.delete);
HackedDNSDetectingRouter.get('/DNS/monitoredWebsite/:id', Middleware.verifyToken, Middleware.HackedDNSDetectingMid.beforeCheckDNS, Controller.HackedDNSDetectingCon.checkDNS);
module.exports = HackedDNSDetectingRouter;
//# sourceMappingURL=HackedDNSDetectingRouter.js.map