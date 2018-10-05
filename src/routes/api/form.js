const express = require('express');
const router = express.Router();

const Controller = require(`${config.path.controller}/form/FormController`);


router.post('/',Controller.post.bind(Controller))
router.get('/',Controller.get.bind(Controller))
router.get('/:id',Controller.index.bind(Controller))
router.put('/:id',Controller.put.bind(Controller))

module.exports=router
