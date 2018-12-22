const Middleware = require('../middlewares/Middleware');
const Controller = require('../contollers/Controller');
const router = require('express').Router();
router.post(`/getToken`, Middleware.AuthMiddleware.beforeLogin, Controller.AuthController.login);
router.post(`/signUp`, Middleware.AuthMiddleware.beforeSignUp, Controller.AuthController.signUp);
router.get(`/verifyAccount/:id/:credentialname`, Middleware.AuthMiddleware.beforeVerifyAccount, Controller.AuthController.verifyAccount);
module.exports = router;
//# sourceMappingURL=AuthRouter.js.map