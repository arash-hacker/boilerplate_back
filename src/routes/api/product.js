const express = require('express');
const router = express.Router();


const Controller = require(`${config.path.controller}/product/Product`);

router.get('/',   Controller.index.bind(Controller))
router.get('/:id',Controller.get.bind(Controller))
router.put('/:id',Controller.put.bind(Controller))
router.post('/',Controller.create.bind(Controller))
module.exports=router
