const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Bookshelves', required:true },
    title: { type: String, required:true},
    price: { type: Number, required:true},
    genre: { type: Array, required:true},
    author: { type: String, required:true},
    stock: { type: Number, required:true},
    purchased: { type: Number, required:true},
})

const BookModel = mongoose.model('Book', BookSchema)

module.exports = BookModel