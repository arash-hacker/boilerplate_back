const express = require('express');
const router = express.Router();

const Controller = require(`${config.path.controller}/auth/PermissionController`);
const acl = require(`${config.path.middleware}/acl`);

router.get('/', acl('view_permissions_list'), Controller.index.bind(Controller));
router.post('/', acl('create_permission'), Controller.create.bind(Controller));
router.put('/', acl('edit_permission'), Controller.update.bind(Controller));
router.delete('/', acl('delete_permission'), Controller.delete.bind(Controller));

module.exports = router;