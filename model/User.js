// model/User.js

const { type } = require("express/lib/response");
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    created: { 
        type: Date
    }
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User)