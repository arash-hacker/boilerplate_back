const express = require('express');
const router = express.Router();

const Controller = require(`${config.path.controller}/content/FavoriteController`);
const acl = require(`${config.path.middleware}/acl`);

router.get('/status', acl('favorite_status'), Controller.status.bind(Controller));
router.get('/toggle', acl('favorite_toggle'), Controller.toggle.bind(Controller));

module.exports = router;