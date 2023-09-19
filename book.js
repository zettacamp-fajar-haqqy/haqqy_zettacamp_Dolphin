const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookTitle: String,
    quantiy: Number,
    totalPrice: Number,
    totalBill: Number
})

const BookModel = mongoose.model('Book', bookSchema)

module.exports = BookModel