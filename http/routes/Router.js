const express = require('express');
const router = express.Router();
const AuthRouter = require('./AuthRouter');
const SettingRouter = require('./SettingRouter');
const UpDownCheckingRouter = require('./UpDownCheckingRouter');
const SearchingRouter = require('./SearchingRouter');
const ExportingRouter = require('./ExportingRouter');
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
//# sourceMappingURL=Router.js.map