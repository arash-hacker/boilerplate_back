const  mongoo=require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ProductSchema=new mongoo.Schema({
	fa_name:String,
	en_name:String,
	baseFormId:{
		type:mongoo.Schema.Types.ObjectId,
		ref:'Form',
	},
	description:String,
	tags:[{
		type:mongoo.Schema.Types.ObjectId,
		ref:'Tag',
	}],
	category:[{
		type:mongoo.Schema.Types.ObjectId,
		ref:'Category',
	}],
	image: {type: mongoo.Schema.Types.ObjectId, ref: 'File'},
})
ProductSchema.plugin(mongoosePaginate);
module.exports= mongoo.model('Product',ProductSchema)
