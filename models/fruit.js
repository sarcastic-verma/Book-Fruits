const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required:true},
    taste: {type:String, required: true}
});

module.exports = mongoose.model('Fruit', fruitSchema);
