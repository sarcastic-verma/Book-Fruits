const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required:true},
    releaseDate: {type:Date, required: true}
});

module.exports = mongoose.model('Book', bookSchema);
