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
const ExportingRouter = require('./ExportingRouter');
// @ts-ignore
const HackedDNSDetectingRouter = require('./HackedDNSDetectingRouter');
const OtherRouter = require('./OtherRouter');

router.use('/', UpDownCheckingRouter);
router.use('/', AuthRouter);
router.use('/', SettingRouter);
router.use('/', SearchingRouter);
router.use('/', HackedDNSDetectingRouter);
router.use('/', ExportingRouter);
router.use('/', OtherRouter);

module.exports = router;