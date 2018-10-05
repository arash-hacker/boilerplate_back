const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new Schema({
	name: {type: String, required: true, trim: true},
	email: {type: String, required: true, unique: true, trim: true},
	phone: {type: String, required: true, unique: true, trim: true},
	password: {type: String, required: true},
	status: {type: Number, default: 1},
	loginAt : { type : Date},
	accessAt : { type : Date},
	roles: [{type: Schema.Types.ObjectId, ref: 'Role', default: ['authenticated']}]
}, {timestamps: true});


UserSchema.pre('save', function (next) {

	if (!this.isModified('password')) return next();

	bcrypt.hash(this.password, 10, (err, hash) => {
		this.password = hash;
		next();
	});
	
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);