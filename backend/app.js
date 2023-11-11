const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const kidRouter = require('./controllers/kids.js')
const exposureRouter = require('./controllers/outcomes.js')
const exposureTipRouter = require('./controllers/outcomeTips.js')
const introRouter = require('./controllers/exposures.js')
const { log } = require('console')
// const userRouter = require('./controllers/users')
const logger = require('./utils/logger')
const {  requestLogger,
  unknownEndpoint,
  errorHandler } = require('./utils/middleware.js')

const app = express()
app.use(express.static('build'))// what does the static method do?
app.use(express.json())// what does the json method return?
app.use(requestLogger)

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
app.use('/api/kid', kidRouter)
// app.use('/api/user', userRouter)
app.use('/api/exposure', exposureRouter)
app.use('/api/exposure-hint', exposureTipRouter)
app.use('/api/intro', introRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
