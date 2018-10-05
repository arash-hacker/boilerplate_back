const express = require('express');
const router = express.Router();

const Controller = require(`${config.path.controller}/form/FormItemController`);

router.get('/',Controller.index.bind(Controller))
router.post('/',Controller.post.bind(Controller))

module.exports=router
