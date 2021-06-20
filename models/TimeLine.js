const mongoose = require('mongoose');

let TimeLineSchema = new mongoose.Schema({
    subject: {
        type: [Subject]
    },
    startTime: {type: Number, default: 0},
    endTime: {type: Number, default: 0}
})

const timeLine = mongoose.model('timeLine',TimeLineSchema)

module.exports = { timeLine }
