const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');


const ArticleSchema = new Schema({
	title: {type: String, required: true, trim: true},
	text: {type: String, required: true, trim: true},
	image: {type: Schema.Types.ObjectId, ref: 'File'},
	category: {type: Schema.Types.ObjectId, ref: 'Category'},
	tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
	user: {type: Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });

ArticleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Article', ArticleSchema);