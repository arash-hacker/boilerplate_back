const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerificationCodeSchema = new Schema({
    phone: {type: String, required: true, trim: true},
    code: {type: String, required: true, trim: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    used: {type: Boolean, default: false},
}, { timestamps: true });

module.exports = mongoose.model('VerificationCode', VerificationCodeSchema);