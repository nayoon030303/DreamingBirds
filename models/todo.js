var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    date: { type: Date },
    contents : { type: String, default: '' },
    completed: false
})

const todo = mongoose.model('todo', todoSchema)

module.exports = { todo }