const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const TagSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	product: {type: Schema.Types.ObjectId, ref: 'Products'},
}, {timestamps: true});

TagSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Favorite', TagSchema);
