const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const TagSchema = new Schema({
	title: {type: String, required: true, trim: true, unique: true},
	text: {type: String, trim: true},
	user: {type: Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });

TagSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Tag', TagSchema);