const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    _id: { type: Number, required:true},
    title: { type: String, required:true},
    price: { type: Number, required:true},
    genre: { type: Array, required:true},
    author: { type: String, required:true},
    stock: { type: Number, required:true},
    purchased: { type: String, required:true},
})

const BookModel = mongoose.model('Book', BookSchema)

module.exports = BookModel