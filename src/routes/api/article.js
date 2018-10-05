const express = require('express');
const router = express.Router();

const Controller = require(`${config.path.controller}/content/ArticleController`);
const acl = require(`${config.path.middleware}/acl`);

router.get('/', acl('view_articles_list'), Controller.index.bind(Controller));
router.get('/:_id', acl('view_article_data'), Controller.get.bind(Controller));
router.post('/', acl('create_article'), Controller.create.bind(Controller));
router.put('/', acl('edit_article'), Controller.update.bind(Controller));
router.delete('/', acl('delete_article'), Controller.delete.bind(Controller));

module.exports = router;