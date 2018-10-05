import  mongoo  from 'mongoose';

module.exports=  mongoo.model('RecentlyChatroom',mongoo.Schema({
	chatroomId:{
		type:mongoo.Schema.Types.ObjectId,
		ref:'Chatroom',
	},
	title: String,
	description:String,

},{timestamps:true}))
