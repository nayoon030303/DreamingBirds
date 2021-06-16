const mongoose = require('mongoose');
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    id: String,
    name: String,
    nickname: String,
    profile_src: String,
    intro: { type: String, default: '' }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }