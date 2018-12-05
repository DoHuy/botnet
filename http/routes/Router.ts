// @ts-ignore
const express = require('express');
// @ts-ignore
const router  = express.Router();

// const MonitoredWebsiteRouter = require('./MonitoredWebsiteRouter');
const AuthRouter = require('./AuthRouter');
const SettingRouter = require('./SettingRouter');
// @ts-ignore
const UpDownCheckingRouter = require('./UpDownCheckingRouter');
const SearchingRouter = require('./SearchingRouter');
// @ts-ignore
const HackedDNSDetectingRouter = require('./HackedDNSDetectingRouter');

router.use('/', UpDownCheckingRouter);
router.use('/', AuthRouter);
router.use('/', SettingRouter);
router.use('/', SearchingRouter);
router.use('/', HackedDNSDetectingRouter);

module.exports = router;