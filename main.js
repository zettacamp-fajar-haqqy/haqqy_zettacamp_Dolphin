const express = require('express')
const basicAuth = require('express-basic-auth')
const mongoose = require('mongoose')
const app = express()
const routes = require('./routes')
const port = 4000

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/book_purchasing')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error'))
db.once('open', () => {
    console.log('Connected to MongoDB')
})

const username = 'haki'
const password = 'zettacamp'

// FUNGSI UNTUK AUTENTIKASI

app.use(basicAuth({
    users: { [username] : password},
    challenge: true,
    unauthorizedResponse: 'Username atau password salah'
})) 

app.use('/', routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })