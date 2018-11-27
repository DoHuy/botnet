// @ts-ignore
const Middleware = require('../middlewares/Middleware');
// @ts-ignore
const Controller = require('../contollers/Controller');

// @ts-ignore
const UpDownCheckingRouter = require('express').Router();

//api
UpDownCheckingRouter.get('/normal/:id', Middleware.verifyToken, Middleware.UpDownCheckingMid.beforeGetNormalUpDownInfo, Controller.UpDownCheckingCon.getNormalUpDownInfo);
UpDownCheckingRouter.get(`/countries/:id`, Middleware.verifyToken, Middleware.UpDownCheckingMid.beforeGetCountriesInfo, Controller.UpDownCheckingCon.getCountriesInfo);
//

module.exports = UpDownCheckingRouter;