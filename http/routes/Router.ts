// @ts-ignore
const express = require('express');
// @ts-ignore
const router  = express.Router();

// const MonitoredWebsiteRouter = require('./MonitoredWebsiteRouter');
const AuthRouter = require('./AuthRouter');
const SettingRouter = require('./SettingRouter');
// @ts-ignore
const UpDownCheckingRouter = require('./UpDownCheckingRouter');

router.use('/monitoredWebsite/', UpDownCheckingRouter);
router.use('/', AuthRouter);
router.use('/credential/', SettingRouter);
module.exports = router;