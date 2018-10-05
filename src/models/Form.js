const  mongoo=require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Form=new mongoo.Schema({
	header:String,
	formItems:[{
		type: mongoo.Schema.Types.ObjectId,
		ref: 'FormItem'
	}]
})
Form.plugin(mongoosePaginate);
module.exports=mongoo.model('Form',Form)

