const { Threshold, SystemThreshold, SystemThresholdArray }  = require('../models/thresholds.js')
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

// get all system thresholds
thresholdRouter.get('/system', async (request, response) => {
  console.log('in get system')
  const systemThresholds = await SystemThresholdArray.findOne({}).populate('thresholds', {threshold: 1, _id: 1})
  // const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  // response.json(notes)
  console.log(systemThresholds)
  response.json(systemThresholds)
})

// add all system thresholds
thresholdRouter.post('/system', async (request, response) => {
  // console.log('in thresholdRouter/system.post')
  // const thresholds = new SystemThreshold(request.body)
  // const thresholds = request.body.map(threshold => new SystemThreshold(threshold))
  // return 400 error if request body missing vital info
  if (await SystemThresholdArray.findOne({})) {
    response.status(400).end('System Thresholds have been added. Delete and post again to make changes.')
  }

  try {
    const result1 = await SystemThreshold.insertMany(request.body.map(x => {
      return { 'threshold': x }
    }))
    const thresholdArray = new SystemThresholdArray({
      thresholds: result1.map(result => result._id)
    })
    console.log('thresholdArray', thresholdArray)
    const finalResult = await thresholdArray.save()
    // console.log('save complete')
    console.log('final result', finalResult)
    // returning the 
    response.status(201).json(finalResult)
  } catch (exception) {
    console.error(exception)
    response.status(400)
  }
})


// Holding off on put because it's really not working, returns pending promises. Optional at this point.

// should: accept a list of desired threshold strings. for each string, either find an id or create a new threshold. add all of these strings to the thresholds array in the database.

// update all system thresholds
// request body: array of all strings of threshold names in order
// thresholdRouter.put('/system/:id', async (request, response) => {
//   console.log('request body', request.body) // synchronous
//   const mapped = await request.body.map(async x => {  // async execution of async function
//     id = await SystemThreshold.findOne({ 'threshold': x }, '_id') // async execution
//     if (id) { // conditional, synchronous
//       return id // synchronous, 
//     } else { // synchronous
//       const added = new SystemThreshold({ 'threshold': x }) // synchronous
//       const result = await added.save() // async call
//       return result // synchronous
//     }

//   })
//   console.log('all thresholds', mapped) // synchronous. mapped was assigned asynchronously with await
//     response.status(400)
// })

thresholdRouter.delete('/system', async (request, response) => {
  await SystemThreshold.deleteMany({})
  await SystemThresholdArray.deleteMany({})
  response.status(204).end()
})

module.exports = thresholdRouter