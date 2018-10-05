const express = require('express');
const router = express.Router();


const Controller = require(`${config.path.controller}/chatroom/ChatController`);

router.post('/',                            Controller.post.bind(Controller))
router.get('/:chatroomId',                  Controller.get.bind(Controller))

router.post('/form_client/:id',             Controller.formSend2Client.bind(Controller))
router.post('/form_admin/:id',              Controller.formSend2Admin.bind(Controller))

module.exports=router
