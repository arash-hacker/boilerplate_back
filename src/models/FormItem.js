const  mongoo=require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const FormItem=new mongoo.Schema({
	itemType:String,
	placeholder:String,
	value:String,
	title:String,
})

FormItem.plugin(mongoosePaginate);
module.exports=mongoo.model('FormItem',FormItem)