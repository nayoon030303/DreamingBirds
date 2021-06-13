const mongoose = require('mongoose');
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    id: String,
    name: String
})

const User = mongoose.model('User', userSchema)

module.exports = { User }