const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const childRouter = require('./controllers/children.js')
const { log } = require('console')
// const userRouter = require('./controllers/users')

const app = express()

mongoose.set('strictQuery', false)
// review why I'm doing this

// connect to MongoDB
mongoose.connect(config.MONGODB_URI)
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connected to', config.MONGODB_URI)
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })


app.use(cors())// what does the function cors() return?
app.use(express.static('build'))// what does the static method do?
app.use(express.json())// what does the json method return?

// app.use the router - to direct requests
app.use('/api/child', childRouter)
// app.use('/api/user', userRouter)

console.log('api using childRouter')

module.exports = app
