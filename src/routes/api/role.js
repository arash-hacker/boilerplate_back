const express = require('express');
const router = express.Router();

const Controller = require(`${config.path.controller}/auth/RoleController`);
const acl = require(`${config.path.middleware}/acl`);

router.get('/', acl('view_roles_list'), Controller.index.bind(Controller));
router.post('/', acl('create_role'), Controller.create.bind(Controller));
router.put('/', acl('edit_role'), Controller.update.bind(Controller));
router.patch('/add_permission', acl('change_permission'), Controller.addPermission.bind(Controller));
router.patch('/remove_permission', acl('change_permission'), Controller.removePermission.bind(Controller));
router.patch('/add_access', acl('change_access'), Controller.addAccess.bind(Controller));
router.patch('/remove_access', acl('change_access'), Controller.removeAccess.bind(Controller));
router.delete('/', acl('delete_permission'), Controller.delete.bind(Controller));

module.exports = router;