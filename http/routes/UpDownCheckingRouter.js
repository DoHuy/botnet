const Middleware = require('../middlewares/Middleware');
const Controller = require('../contollers/Controller');
const UpDownCheckingRouter = require('express').Router();
UpDownCheckingRouter.get('/currentLocation/monitoredWebsite/:id', Middleware.verifyToken, Middleware.UpDownCheckingMid.beforeGetNormalUpDownInfo, Controller.UpDownCheckingCon.getNormalUpDownInfo);
UpDownCheckingRouter.get(`/multipleCountries/monitoredWebsite/:id`, Middleware.verifyToken, Middleware.UpDownCheckingMid.beforeGetCountriesInfo, Controller.UpDownCheckingCon.getCountriesInfo);
UpDownCheckingRouter.get(`/multipleIsps/monitoredWebsite/:id`, Middleware.verifyToken, Middleware.UpDownCheckingMid.beforeGetIspsInfo, Controller.UpDownCheckingCon.getIspsInfo);
module.exports = UpDownCheckingRouter;
//# sourceMappingURL=UpDownCheckingRouter.js.map