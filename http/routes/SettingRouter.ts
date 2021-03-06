// @ts-ignore
const Middleware = require('../middlewares/Middleware');
// @ts-ignore
const Controller = require('../contollers/Controller');

// @ts-ignore
const router = require('express').Router();


// cai dat webSite
// @ts-ignore
router.post(`/addWebsite`, Middleware.verifyToken,  Middleware.SettingMid.beforeAddWebsite, Controller.SettingCon.addWebSite);
// @ts-ignore
router.put(`/monitoredWebsite/:id`, Middleware.verifyToken, Middleware.SettingMid.beforeChangeConfig, Controller.SettingCon.changeConfig, Middleware.SettingMid.afterChangeConfig);
// @ts-ignore
router.post(`/monitoredWebsite/:id`, Middleware.verifyToken, Middleware.SettingMid.beforeAddAdvanceConfig, Controller.SettingCon.addAdvanceConfig, Middleware.SettingMid.afterAddAdvanceConfig);

router.delete(`/monitoredWebsite/:id`, Middleware.verifyToken, Middleware.SettingMid.beforeRemoveWebsite, Controller.SettingCon.removeWebsite);


module.exports = router;