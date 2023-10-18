const { Threshold, ThresholdHintArray }  = require('../models/threshold.js')
const thresholdRouter = require('express').Router()
// system threshold operations: can delay for later version - these are not interactive
// rename this

// create SystemThresholds 
// get all system thresholds
// add a system threshold - delay
// remove a system threshold - delay

// threshold operations
// get all current thresholds? revisit data model.

// get all thresholds
thresholdRouter.get('/', async (request, response) => {
  const thresholds = await Threshold.find({})
  response.json(thresholds)
})

// get all active threshold hints in ThresholdHintArray
thresholdRouter.get('/hints', async (request, response) => {
  const thresholds = await ThresholdHintArray.findOne()
    .populate('thresholds')

  console.log('thresholds in get hints', thresholds)
  response.json(thresholds)
})

// add all threshold hints, expects an array in the request body 
thresholdRouter.post('/hints', async (request, response) => {
  // return 400 if thresholdHints already in db
  const thresholdHintArray = await ThresholdHintArray.findOne()
  console.log('thresholdHintArray', thresholdHintArray)
  if (thresholdHintArray) {
    // response.statusMessage = "ThresholdHintArray already exists";
    response.status(400).end()
  }

  try {
    // add all thresholds in the request body to db
    const result1 = await Threshold.insertMany(request.body.map(x => {
      return { 'threshold': x }
    }))
    // add the array to db
    const thresholdArray = new ThresholdHintArray({
      thresholds: result1.map(result => result._id)
    })
    const finalResult = await thresholdArray.save()
    response.status(201).json(finalResult)
  } catch (exception) {
    console.error(exception)
    response.status(400)
  }
})


thresholdRouter.delete('/hints', async (request, response) => {
  await ThresholdHintArray.deleteMany({})
  response.status(204).end()
})

module.exports = thresholdRouter