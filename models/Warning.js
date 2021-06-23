const mongoose = require('mongoose');

var warningSchema = new mongoose.Schema({
    date: {type: String, default:''},
    focus_out: { type: Number, default: 0 },
    phone : { type: Number, default: 0 },
    sleep : { type: Number, default: 0 },
    leave : { type: Number, default: 0 }
})

const Warning = mongoose.model('Warning', warningSchema)

module.exports = { Warning }