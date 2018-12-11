// @ts-ignore
const Middleware = require('../middlewares/Middleware');
// @ts-ignore
const Controller = require('../contollers/Controller');

// @ts-ignore
const router = require('express').Router();


// api
// @ts-ignore
router.get('/export/dataBetweenParentAndChild/monitoredWebsite/:id', Middleware.verifyToken,  Middleware.SearchingMid.beforeSearchComparison, Controller.ExportingCon.exportComparisonData);
//
module.exports = router;