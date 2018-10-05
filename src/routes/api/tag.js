const express = require('express');
const router = express.Router();

const Controller = require(`${config.path.controller}/content/TagController`);
const acl = require(`${config.path.middleware}/acl`);

router.get('/', acl('view_tags_list'), Controller.index.bind(Controller));
router.get('/:_id', acl('view_tag_data'), Controller.get.bind(Controller));
router.post('/', acl('create_tag'), Controller.create.bind(Controller));
router.put('/', acl('edit_tag'), Controller.update.bind(Controller));
router.delete('/', acl('delete_tag'), Controller.delete.bind(Controller));

module.exports = router;