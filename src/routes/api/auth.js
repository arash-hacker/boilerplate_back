const express = require('express');
const router = express.Router();

const Controller = require(`${config.path.controller}/auth/AuthController`);

router.get('/login', Controller.login.bind(Controller));
router.post('/register', Controller.register.bind(Controller));
router.get('/user', Controller.user.bind(Controller));
router.put('/user', Controller.update.bind(Controller));
router.put('/change_password', Controller.changePassword.bind(Controller));
router.post('/reset_password', Controller.resetPassword.bind(Controller));
router.post('/verification_code', Controller.verificationCode.bind(Controller));

module.exports = router;