// @ts-ignore
const Middleware = require('../middlewares/Middleware');
// @ts-ignore
const Controller = require('../contollers/Controller');

// @ts-ignore
const router = require('express').Router();

// @ts-ignore
router.post(`/addWebsite`, Middleware.verifyToken,  Middleware.SettingMid.beforeAddWebsite, Controller.SettingCon.addWebSite);
// @ts-ignore
router.post(`/changeConfig`, Middleware.verifyToken, Middleware.SettingMid.beforeChangeConfig, Controller.SettingCon.changeConfig, Middleware.SettingMid.afterChangeConfig);
// @ts-ignore
router.post(`/addAdvanceConfig`, Middleware.verifyToken, Middleware.SettingMid.beforeAddAdvanceConfig, Controller.SettingCon.addAdvanceConfig, Middleware.SettingMid.afterAddAdvanceConfig);

module.exports = router;