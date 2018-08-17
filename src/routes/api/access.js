const express = require('express');
const router = express.Router();

const Controller = require(`${config.path.controller}/auth/AccessController`);
const acl = require(`${config.path.middleware}/acl`);

router.get('/', acl('view_accesses_list'), Controller.index.bind(Controller));
router.post('/', acl('create_access'), Controller.create.bind(Controller));
router.put('/', acl('edit_access'), Controller.update.bind(Controller));
router.delete('/', acl('delete_access'), Controller.delete.bind(Controller));

module.exports = router;