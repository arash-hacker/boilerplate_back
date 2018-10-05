const express = require('express');
const router = express.Router();

const Controller = require(`${config.path.controller}/chatroom/ChatroomController`);

router.post('/status',                              Controller.put.bind(Controller))
router.get('/status/name/:_id',                     Controller.getStatusByName.bind(Controller))
router.get('/status/:_id',                          Controller.get.bind(Controller))
router.get('/:_id',                                 Controller.index.bind(Controller))
router.get('/user/:userid',                         Controller.allUserChatrooms.bind(Controller))
router.patch(['/','/:chatroomId'],                  Controller.patch.bind(Controller))

module.exports=router
