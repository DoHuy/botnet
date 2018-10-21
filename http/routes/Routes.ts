// @ts-ignore
const express = require('express');
// @ts-ignore
const router  = express.Router();

const MonitoredWebsiteRouter = require('./MonitoredWebsiteRoute');

router.use('/monitoredWebsite', MonitoredWebsiteRouter);

module.exports = router;