const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    content: { type: String, default: '' },
    date: {type: String, default:''}
})


var timeSchema = new mongoose.Schema({
    hour: { type: Number, default: 0 },
    min : { type: Number, default: 0 },
    sec : { type: Number, default: 0 }
})



const userSchema = mongoose.Schema({
    id: String,
    email:String,
    name: String,
    nickname: String,
    profile_src: String,
    intro: { type: String, default: '' },
    timer: {
        type: [timeSchema]
    },
    todos: {
        type: [todoSchema]
    },
})

const User = mongoose.model('User', userSchema)

module.exports = { User }