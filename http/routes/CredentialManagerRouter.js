const Middleware = require('../middlewares/Middleware');
const Controller = require('../contollers/Controller');
const router = require('express').Router();
router.patch('/resetAccount', Middleware.CredentialManagerMid.beforeResetAccount, Controller.CredentialManagerCon.resetAccount);
router.patch('/changePassword', Middleware.verifyToken, Middleware.CredentialManagerMid.beforeChangePassword, Controller.CredentialManagerCon.changePassword);
module.exports = router;
//# sourceMappingURL=CredentialManagerRouter.js.map