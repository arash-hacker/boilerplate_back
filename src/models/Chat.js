const  mongoo=require('mongoose');
//import User from './User'

module.exports=  mongoo.model('Chat',mongoo.Schema({
	sender: {
		type: mongoo.Schema.Types.ObjectId,
		ref:'User',
	},
	chatroomId:{
		type: mongoo.Schema.Types.ObjectId,
		ref:'Chatroom',
	},
	type:{
		type: String,
		enum: ['Form', 'Message'],
	},
	mode:String,
	createdAt:String,
	text:mongoo.Schema.Types.Mixed,
	data:mongoo.Schema.Types.Mixed,
},{timestamps:true}))
