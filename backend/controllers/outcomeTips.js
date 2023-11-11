const { Outcome, OutcomeTipArray }  = require('../models/outcome.js')
const tryTipRouter = require('express').Router()

// get all active try hints in OutcomeTipArray
tryTipRouter.get('/', async (request, response) => {
  const tries = await OutcomeTipArray.findOne()
    .populate('tries')

  response.json(tries)
})

// add all try hints, expects an array in the request body 
tryTipRouter.post('/', async (request, response) => {
  // return 409 if tryTips already in db
  const tryTipArray = await OutcomeTipArray.findOne()
  if (tryTipArray) {
    // response.statusMessage = "OutcomeTipArray already exists";
    response.status(409).end()
    return // why isn't response....end() not returning?
  }
  try {
    // add all tries in the request body to db
    const result1 = await Outcome.insertMany(request.body.map(x => {
      return { 'try': x }
    }))
    // add the array to db
    const tryArray = new OutcomeTipArray({
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
tryTipRouter.delete('/', async (request, response) => {
  await OutcomeTipArray.deleteMany({})
  response.status(204).end()
})

module.exports = tryTipRouter