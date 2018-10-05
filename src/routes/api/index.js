const express = require('express');
const router = express.Router();

router.use('/', require('./auth'));
router.use('/chat', require('./chat'));
router.use('/chatroom', require('./chatroom'));
router.use('/recently', require('./recently'));
router.use('/formMaker', require('./form'));
router.use('/formItem', require('./formItem'));
router.use('/product', require('./product'));
router.use('/person', require('./user'));
router.use('/permission', require('./permission'));
router.use('/access', require('./access'));
router.use('/role', require('./role'));
router.use('/article', require('./article'));
router.use('/category', require('./category'));
router.use('/tag', require('./tag'));
router.use('/file', require('./file'));
router.use('/favorite', require('./favorite'));

module.exports = router;