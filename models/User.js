const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}, 
    status: {type: String, enum: ['active', 'banned'], default:'active'},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    description: String,
    token: String,
    avatar: {type: String, default: '/bundles/web/images/v5-index/computer.99763360.png'}
}, {collection: 'users', timestamps: true});

module.exports.User = mongoose.model('users', UserSchema);

