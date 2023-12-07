const OutcomeTipArray = require('../models/outcomeTipArray.js')
const outcomeTipRouter = require('express').Router()

// get all active outcome tips in OutcomeTipArray
outcomeTipRouter.get('/', async (request, response) => {
  const tips = await OutcomeTipArray.findOne()
    //.populate('outcomeTips')

  response.json(tips)
})

// add all outcome tips, expects an array in the request body 
outcomeTipRouter.post('/', async (request, response) => {
  // return 409 if outcomeTips already in db
  const outcomeTipArray = await OutcomeTipArray.findOne()
  if (outcomeTipArray) {
    // response.statusMessage = "OutcomeTipArray already exists";
    response.status(409).end()
    return // why isn't response....end() not returning?
  }
  try {
    // add all tries in the request body to db
    const result1 = await OutcomeTipArray.insertMany(request.body.map(x => {
      return { 'outcome': x }
    }))
    // add the array to db
    const outcomeArray = new OutcomeTipArray({
      tries: result1.map(result => result._id)
    })
    const finalResult = await outcomeArray.save()
    response.status(201).json(finalResult)
  } catch (exception) {
    console.error(exception)
    response.status(400)
  }
})

// limit to admin access
outcomeTipRouter.delete('/', async (request, response) => {
  await OutcomeTipArray.deleteMany({})
  response.status(204).end()
})

module.exports = outcomeTipRouter