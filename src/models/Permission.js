const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
    name: {type: String, required: true, unique: true, trim: true},
    title: {type: String, required: true, unique: true, trim: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

module.exports = mongoose.model('Permission', PermissionSchema);