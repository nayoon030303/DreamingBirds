const mongoose = require('mongoose');

var timeSchema = new mongoose.Schema({
    date: {type: String, default:''},
    hour: { type: Number, default: 0 },
    min : { type: Number, default: 0 },
    sec : { type: Number, default: 0 }
})

const Timer = mongoose.model('Timer', timeSchema)

module.exports = { Timer }