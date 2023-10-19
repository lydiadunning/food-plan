const { Try, TryHintArray }  = require('../models/try.js')
const tryRouter = require('express').Router()
// system try operations: can delay for later version - these are not interactive
// rename this

// create SystemTries 
// get all system tries
// add a system try - delay
// remove a system try - delay

// try operations
// get all current tries? revisit data model.

// get all tries
tryRouter.get('/', async (request, response) => {
  const tries = await Try.find({})
  response.json(tries)
})

// get all active try hints in TryHintArray
tryRouter.get('/hints', async (request, response) => {
  const tries = await TryHintArray.findOne()
    .populate('tries')

  response.json(tries)
})

// add all try hints, expects an array in the request body 
tryRouter.post('/hints', async (request, response) => {
  // return 400 if tryHints already in db
  const tryHintArray = await TryHintArray.findOne()
  if (tryHintArray) {
    // response.statusMessage = "TryHintArray already exists";
    response.status(400).end()
    return // why isn't response....end() not returning?
  }
  try {
    // add all tries in the request body to db
    const result1 = await Try.insertMany(request.body.map(x => {
      return { 'try': x }
    }))
    // add the array to db
    const tryArray = new TryHintArray({
      tries: result1.map(result => result._id)
    })
    const finalResult = await tryArray.save()
    response.status(201).json(finalResult)
  } catch (exception) {
    console.error(exception)
    response.status(400)
  }
})

tryRouter.put('/deactivate/:id', async (request, response) => {
  
}) 


tryRouter.delete('/hints', async (request, response) => {
  await TryHintArray.deleteMany({})
  response.status(204).end()
})

module.exports = tryRouter