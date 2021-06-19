const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    content: { type: String, default: '' },
    date: {type: String, default:''}
})

module.exports = mongoose.model('todo', todoSchema);