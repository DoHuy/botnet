// @ts-ignore
const express = require('express');
// @ts-ignore
const router  = express.Router();

// const MonitoredWebsiteRouter = require('./MonitoredWebsiteRouter');
const AuthRouter = require('./AuthRouter');
const SettingRouter = require('./SettingRouter');

// router.use('/monitoredWebsite', MonitoredWebsiteRouter);
router.use('/', AuthRouter);
router.use('/credential/', SettingRouter);
module.exports = router;