const express = require('express');
const router = express.Router();

const api = require('../src/routes/api');

router.use('/api', api);

module.exports = router;