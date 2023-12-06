const express = require('express')
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const kidRouter = require('./controllers/kids.js')
const exposureRouter = require('./controllers/exposures.js')
const outcomeTipRouter = require('./controllers/outcomeTips.js')
// const userRouter = require('./controllers/users')
const logger = require('./utils/logger')
const {  
  requestLogger,
  unknownEndpoint,
  errorHandler, 
  tokenExtractor,
  userExtractor
} = require('./utils/middleware.js')
const userRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')

const app = express()
app.use(express.static('build'))// what does the static method do?
app.use(express.json())// what does the json method return?
app.use(requestLogger)
app.use(tokenExtractor)

mongoose.set('strictQuery', false)
// review why I'm doing this
  
  mongoose.connect(config.MONGODB_URI)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      logger.info('connected to', config.MONGODB_URI)
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())// what does the function cors() return?
app.get('http://localhost:5173', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})

// app.use the router - to direct requests
app.use('/api/kid', userExtractor, kidRouter)
app.use('/api/exposure', exposureRouter)
app.use('/api/outcometips', outcomeTipRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)


module.exports = app
