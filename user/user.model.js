'use strict';
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: String,
    preferences : {
        latitude: Number,
        longitude: Number
    },
    created_at: { "type": Number, "default": Date.now },
    updated_at: { "type": Number, "default": Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports =  User;
