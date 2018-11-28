// @ts-ignore
const Middleware = require('../middlewares/Middleware');
// @ts-ignore
const Controller = require('../contollers/Controller');

// @ts-ignore
const UpDownCheckingRouter = require('express').Router();

//api
UpDownCheckingRouter.get('/currentLocation/monitoredWebsite/:id', Middleware.verifyToken, Middleware.UpDownCheckingMid.beforeGetNormalUpDownInfo, Controller.UpDownCheckingCon.getNormalUpDownInfo);
UpDownCheckingRouter.get(`/multipleCountries/monitoredWebsite/:id`, Middleware.verifyToken, Middleware.UpDownCheckingMid.beforeGetCountriesInfo, Controller.UpDownCheckingCon.getCountriesInfo);
UpDownCheckingRouter.get(`/multipleIsps/monitoredWebsite/:id`, Middleware.verifyToken, Middleware.UpDownCheckingMid.beforeGetIspsInfo, Controller.UpDownCheckingCon.getIspsInfo);
//

module.exports = UpDownCheckingRouter;