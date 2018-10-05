const express = require('express');
const router = express.Router();

const Controller = require(`${config.path.controller}/content/CategoryController`);
const acl = require(`${config.path.middleware}/acl`);

router.get('/', acl('view_categories_list'), Controller.index.bind(Controller));
router.get('/:_id', acl('view_category_data'), Controller.get.bind(Controller));
router.post('/', acl('create_category'),    Controller.create.bind(Controller));
router.put('/', acl('edit_category'),       Controller.update.bind(Controller));
router.delete('/', acl('delete_category'),  Controller.delete.bind(Controller));

module.exports = router;