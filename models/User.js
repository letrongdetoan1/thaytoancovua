const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true}, 
    status: {type: String, enum: ['active', 'banned'], default:'active'},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    description: String,
    token: String,
    avatar: {type: String, default: 'publics/statics/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg'}
}, {collection: 'users', timestamps: true});

module.exports.User = mongoose.model('users', UserSchema);

