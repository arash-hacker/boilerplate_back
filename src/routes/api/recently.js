const express = require('express');
const router = express.Router();


const Controller = require(`${config.path.controller}/service/RecentlyChatroomController`);

router.post('/', Controller.index.bind(Controller))
router.put('/', Controller.put.bind(Controller))

module.exports=router
