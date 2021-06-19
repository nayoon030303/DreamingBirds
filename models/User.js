const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    date: { type: Date },
    content: { type: String, default: '' },
    completed: false
})

const userSchema = mongoose.Schema({
    id: String,
    email:String,
    name: String,
    nickname: String,
    profile_src: String,
    intro: { type: String, default: '' },
    all_focus_time:{ type: String, default: '00:00:00' },
    todos : [todoSchema]
})

const User = mongoose.model('User', userSchema)

module.exports = { User }