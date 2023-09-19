const mongoose = require('mongoose')

const BookshelvesSchema = new mongoose.Schema({
    name: { type: String, required:true},
    description: { type: String, required:true},
    book: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
})

const BookshelvesModel = mongoose.model('Bookshelves', BookshelvesSchema)

module.exports = BookshelvesModel