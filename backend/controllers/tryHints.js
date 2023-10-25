const { Try, TryHintArray }  = require('../models/try.js')
const tryHintRouter = require('express').Router()

// get all active try hints in TryHintArray
tryHintRouter.get('/', async (request, response) => {
  const tries = await TryHintArray.findOne()
    .populate('tries')

  response.json(tries)
})

// add all try hints, expects an array in the request body 
tryHintRouter.post('/', async (request, response) => {
  // return 400 if tryHints already in db
  const tryHintArray = await TryHintArray.findOne()
  if (tryHintArray) {
    // response.statusMessage = "TryHintArray already exists";
    response.status(409).end()
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

// limit to admin access
tryHintRouter.delete('/', async (request, response) => {
  await TryHintArray.deleteMany({})
  response.status(204).end()
})

module.exports = tryHintRouter