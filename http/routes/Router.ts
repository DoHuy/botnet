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
const CredentialManagerRouter = require('./CredentialManagerRouter');
const CoinMinerDetectingRouter = require('./CoinMinerDetectingRouter');

router.use('/api/v1/', UpDownCheckingRouter);
router.use('/api/v1/', AuthRouter);
router.use('/api/v1/', SettingRouter);
router.use('/api/v1/', SearchingRouter);
router.use('/api/v1/', HackedDNSDetectingRouter);
router.use('/api/v1/', ExportingRouter);
router.use('/api/v1/', OtherRouter);
router.use('/api/v1/', CredentialManagerRouter);
router.use('/api/v1/', CoinMinerDetectingRouter);

module.exports = router;