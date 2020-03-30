const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const UserSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        require: false,
    },
}, {
    collection: 'authUserModel',
    versionKey: false,
}, );

module.exports = connections.model('AuthUserModel', UserSchema);
