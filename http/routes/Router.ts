// @ts-ignore
const express = require('express');
// @ts-ignore
const router  = express.Router();

// const MonitoredWebsiteRouter = require('./MonitoredWebsiteRouter');
const AuthRouter = require('./AuthRouter');

// router.use('/monitoredWebsite', MonitoredWebsiteRouter);
router.use('/', AuthRouter);
module.exports = router;