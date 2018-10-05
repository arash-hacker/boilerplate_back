const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
	name: {type: String, trim: true},
	path: {type: String, required: true, trim: true},
	mimtype: {type: String, trim: true},
	size: {type: Number},
	user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

module.exports = mongoose.model('File', FileSchema);