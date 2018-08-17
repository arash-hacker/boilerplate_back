const express = require('express');
const router = express.Router();

const Controller = require(`${config.path.controller}/auth/UserController`);
const acl = require(`${config.path.middleware}/acl`);

router.get('/', acl('view_users_list'), Controller.index.bind(Controller));
router.get('/:_id', acl('view_user_data'), Controller.get.bind(Controller));
router.post('/', acl('create_user'), Controller.create.bind(Controller));
router.put('/', acl('edit_user'), Controller.update.bind(Controller));
router.delete('/', acl('delete_user'), Controller.delete.bind(Controller));

module.exports = router;