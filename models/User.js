const mongoose = require('mongoose');


var todoSchema = new mongoose.Schema({
    content: { type: String, default: '' },
    date: {type: String, default:''},
    checked: {type: Boolean, default: false}
})


var timeSchema = new mongoose.Schema({
    date: {type: String, default:''},
    hour: { type: Number, default: 0 },
    min : { type: Number, default: 0 },
    sec : { type: Number, default: 0 }
})

let SubjectSchema = new mongoose.Schema({
    name: {type: String, default:''},
    time: {type: Number, default: 0},
    date: {type: String, default:''}
})

let TimeLineSchema = new mongoose.Schema({
    subject: String,
    startTime: {type: String, default: 0},
    endTime: {type: String, default: 0},
    date: {type: String, default:''}
})

let warningSchema = new mongoose.Schema({
    date: {type: String, default:''},
    focus_out: { type: Number, default: 0 },
    phone : { type: Number, default: 0 },
    sleep : { type: Number, default: 0 },
    leave : { type: Number, default: 0 }
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
    subjects: {
        type: [SubjectSchema]
    },
    timeLines:{
        type: [TimeLineSchema]
    },
    warning: {
        type: [warningSchema]
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }