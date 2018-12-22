const Middleware = require('../middlewares/Middleware');
const Controller = require('../contollers/Controller');
const router = require('express').Router();
router.get(`/search/images/monitoredWebsite/:id`, Middleware.verifyToken, Middleware.SearchingMid.beforeSearchByDate, Controller.SearchingCon.searchByDate);
router.get('/search/dataBetweenParentAndChild/monitoredWebsite/:id', Middleware.verifyToken, Middleware.SearchingMid.beforeSearchComparison, Controller.SearchingCon.searchComparison);
module.exports = router;
//# sourceMappingURL=SearchingRouter.js.map