const express = require('express');
const router = express.Router();

router.use('/', require('./auth'));
router.use('/person', require('./user'));
router.use('/permission', require('./permission'));
router.use('/access', require('./access'));
router.use('/role', require('./role'));

module.exports = router;