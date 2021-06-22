const mongoose = require('mongoose');

let SubjectSchema = new mongoose.Schema({
    name: {type: String, default:''},
    time: {type: Number, default: 0},
    date: {type: String, default:''}
})
module.exports = mongoose.model('subject', SubjectSchema);


