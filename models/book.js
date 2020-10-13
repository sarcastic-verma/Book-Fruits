const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required:true},
    readers: {type:Number, required: true}
});

module.exports = mongoose.model('Book', bookSchema);
