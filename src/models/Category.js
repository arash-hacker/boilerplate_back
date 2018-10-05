const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const CategorySchema = new Schema({
	title: {type: String, required: true, trim: true, unique: true},
	text: {type: String, required: true, trim: true},
	image: {type: Schema.Types.ObjectId, ref: 'File'},
	user: {type: Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });

CategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Category', CategorySchema);