const  mongoo=require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
let Chatroom = new mongoo.Schema({
	users:[{
		type: mongoo.Schema.Types.ObjectId,
		ref:'User',
	}],
	status:String,
	productId:{
		type:mongoo.Schema.Types.ObjectId,
		ref:'Product',
	},
	statusHash:{
 		initial:           { type:String, default : "" },
		inprogress:        { type:String, default : "" },
		paid:              { type:String, default : "" },
 		withdrawn:         { type:String, default : "" },
 		stopped:           { type:String, default : "" },
 		completed:         { type:String, default : "" },
 		checked:           { type:String, default : "" },
 		todo:              { type:String, default : "" },
 		terminated:        { type:String, default : "" },
	}
},{timestamps: true})

Chatroom.plugin(mongoosePaginate);
module.exports= mongoo.model('Chatroom',Chatroom)
