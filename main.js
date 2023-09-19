require('dotenv').config()
const express = require('express')
// const basicAuth = require('express-basic-auth')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = express()
const routes = require('./route/routes')
const port = 4000

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/zettacamp-DBday2')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error'))
db.once('open', () => {
    console.log('Connected to MongoDB')
})

const secretKey = process.env.API_KEY

const user = process.env.USER
const pass = process.env.PASS
const duration = 3600
let index = 0

// GENERATE TOKEN BEFORE STARTING ALL PROCESS

app.post('/generate-token', (req, res) => {
    index++
    
    const { username, password} = req.body
    
    if(username === user && password === pass){
        const token = jwt.sign({username}, secretKey, {expiresIn: duration})
        res.json({token})
        // console.log(countdown(duration))

    } else {
        res.status(401).json({ message: 'Invalid credentials' })
    }

})

app.use('/', routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })