const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    _id: { type: Number, required:true},
    name: { type: String, required:true},
    gender: { type: String, required:true},
    age: { type: Number, required:true}
})

const AuthorModel = mongoose.model('Author', AuthorSchema)

module.exports = AuthorModel