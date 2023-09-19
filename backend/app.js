const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const childRouter = require('./controllers/children')
// const userRouter = require('./controllers/users')

const app = express()

mongoose.set('strictQuery', false)
// review why I'm doing this

// connect to MongoDB

app.use(cors())// what does the function cors() return?
app.use(express.static('build'))// what does the static method do?
app.use(express.json())// what does the json method return?

// app.use the router - to direct requests
app.use('/api/child', childRouter)
// app.use('/api/user', userRouter)

module.exports = app
