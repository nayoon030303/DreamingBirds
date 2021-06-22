const mongoose = require('mongoose');

let TimeLineSchema = new mongoose.Schema({
    subject: String,
    startTime: {type: String, default: 0},
    endTime: {type: String, default: 0},
    date: {type: String, default:''}
})

const timeLine = mongoose.model('timeLine',TimeLineSchema)