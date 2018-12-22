const Middleware = require('../middlewares/Middleware');
const Controller = require('../contollers/Controller');
const router = require('express').Router();
router.post(`/addWebsite`, Middleware.verifyToken, Middleware.SettingMid.beforeAddWebsite, Controller.SettingCon.addWebSite);
router.put(`/monitoredWebsite/:id`, Middleware.verifyToken, Middleware.SettingMid.beforeChangeConfig, Controller.SettingCon.changeConfig, Middleware.SettingMid.afterChangeConfig);
router.post(`/monitoredWebsite/:id`, Middleware.verifyToken, Middleware.SettingMid.beforeAddAdvanceConfig, Controller.SettingCon.addAdvanceConfig, Middleware.SettingMid.afterAddAdvanceConfig);
router.delete(`/monitoredWebsite/:id`, Middleware.verifyToken, Middleware.SettingMid.beforeRemoveWebsite, Controller.SettingCon.removeWebsite);
module.exports = router;
//# sourceMappingURL=SettingRouter.js.map