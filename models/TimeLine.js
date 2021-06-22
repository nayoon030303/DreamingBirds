const mongoose = require('mongoose');

let TimeLineSchema = new mongoose.Schema({
    subject: String,
    startTime: {type: Number, default: 0},
    endTime: {type: Number, default: 0},
    date: {type: String, default:''}
})

const timeLine = mongoose.model('timeLine',TimeLineSchema)

module.exports = { timeLine }
