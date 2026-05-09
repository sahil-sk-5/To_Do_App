const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sahilk050802:Sahil%40mongodb5@cluster0.itck2ww.mongodb.net/");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos',todoSchema);

module.exports = {
    todo
}