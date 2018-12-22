const Middleware = require('../middlewares/Middleware');
const Controller = require('../contollers/Controller');
const router = require('express').Router();
router.get('/export/dataBetweenParentAndChild/monitoredWebsite/:id', Middleware.verifyToken, Middleware.SearchingMid.beforeSearchComparison, Controller.ExportingCon.exportComparisonData);
module.exports = router;
//# sourceMappingURL=ExportingRouter.js.map