const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {type: String, required: true, unique: true, trim: true},
    title: {type: String, required: true, unique: true, trim: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    permissions: [{type: Schema.Types.ObjectId, ref: 'Permission'}],
    accesses: [{type: Schema.Types.ObjectId, ref: 'Access'}]
}, {timestamps: true});

module.exports = mongoose.model('Role', RoleSchema);