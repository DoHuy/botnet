// @ts-ignore
const Middleware = require('../middlewares/Middleware');
// @ts-ignore
const Controller = require('../contollers/Controller');

// @ts-ignore
const router = require('express').Router();


// api
// @ts-ignore
router.patch('/resetAccount', Middleware.CredentialManagerMid.beforeResetAccount, Controller.CredentialManagerCon.resetAccount);
router.patch('/changePassword', Middleware.verifyToken, Middleware.CredentialManagerMid.beforeChangePassword, Controller.CredentialManagerCon.changePassword);
//
module.exports = router;