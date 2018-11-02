// @ts-ignore
const Middleware = require('../middlewares/Middleware');
// @ts-ignore
const Controller = require('../contollers/Controller');

// @ts-ignore
const router = require('express').Router();

// @ts-ignore
router.post(`/login`, Middleware.AuthMiddleware.beforeLogin, Controller.AuthController.login);
// @ts-ignore
router.post(`/signUp`, Middleware.AuthMiddleware.beforeSignUp, Controller.AuthController.signUp);
// @ts-ignore
router.get(`/resetToken`, Middleware.AuthMiddleware.beforeResetToken, Controller.AuthController.resetToken);
// @ts-ignore
router.get(`/verifyAccount/:id/:credentialname`, Middleware.AuthMiddleware.beforeVerifyAccount, Controller.AuthController.verifyAccount);

module.exports = router;