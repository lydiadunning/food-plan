const Kid  = require('../models/kid.js')
const User = require('../models/user.js')
const kidRouter = require('express').Router()
// const logger = require('../utils/logger.js')
// const { userExtractor } = require('../utils/middleware')

kidRouter.get('/', async (request, response) => {
  const kids = await Kid.find({ users: request.user }).populate('outcomeOptions', {outcome: 1, _id: 1})
  response.json(kids)
})

/**
 * request.body: {
 *   name: String
 *   outcomes: Array [
 *     Objects {
 *       outcome: String (optional)
 *       isActive: Boolean (optional)
 *     }
 *   ]
 * }
 */
kidRouter.post('/', async (request, response) => {
  // return 400 error if request body missing vital info
  // name exists, contains characters
  // outcomes, if it exists, is a list
  if (!request.body.name) {
    response.status(400).end()
  } 

  try {
    const user = request.user

    // if outcomes.length > 0, is it made of strings? convert to objects.
    const outcomeOptions = request.body.outcomeOptions || []
    const kid = new Kid({
      name: request.body.name,
      outcomeOptions: outcomeOptions,
      users: [user.id]
    })
    const result = await kid.save()
 
    user.updateOne({$push: {'kids': user.id}}, {upsert: true})

    response.status(201).json(result)

  } catch (err) {
    console.error(err.message)
    response.status(404).end()
    // return some explanatory text
  }
})

kidRouter.get('/:id', async (request, response) => {
  const kid = await Kid.findById(request.params.id)//.populate('outcomes', {outcome: 1, _id: 1})
  if (kid && kid.users.includes(request.user)) {
    response.json(kid)
  } else {
    response.status(404).json({ error: 'child not found'}).end()
  }
})

// Should allow a user to remove the link between their profile and a kid, but not delete the kid until it has no remaining ties to any user. Currently doesn't actually delete database record.
kidRouter.delete('/:id', async (request, response) => {
  const kid = await Kid.findByIdAndUpdate(request.params.id, {
    $pull: {
      users: request.user
    }
  })
  const user = await User.findByIdAndUpdate(request.user, {
    $pull: {
      kids: request.params.id
    }
  })
  response.status(204).end()
})

kidRouter.delete('/all', async (request, response) => {
  if (request.user.isAdmin){
    const kid = await Kid.deleteMany()
    response.status(204).end()
  }
})

// patch will accept a request describing any field in the kid model.
kidRouter.patch('/:id', async (request, response) => {
  const outcomes = request.body.outcomeOptions || null
  const name = request.body.name || null
  const update = {}
  if (name) {
    update.name = name
  }
  if (outcomes) {
    update.outcomeOptions = outcomeOptions
  }

  const kid = await Kid.findByIdAndUpdate(request.params.id, update)
  response.json(kid)

  // simplified this. If it needs more sophistication, this resource
  // might help
  // Jonathan Muller's answer:
  // https://stackoverflow.com/questions/35810951/how-to-change-order-of-array-with-mongodb

})

// does the app even need this?
kidRouter.get('/:kidId/outcomeOptions', async (request, response) => {
  const kid = await Kid.findById(request.params.kidId).populate('outcomeOptions', {outcome: 1, _id: 1, active: 1})
  if (kid) {
    response.json(kid.outcomeOptions)
  } else {
    response.status(404).end()
  }})

kidRouter.get('/:kidId/exposure', async (request, response) => {
  const kid = await Kid.findById(request.params.kidId).populate('exposures')
  if (kid) {
    response.json(kid.exposures)
  } else {
    response.status(404).end()
  }
})

kidRouter.patch('/:kidId/exposure', async (request, response) => {
  const kid = await Kid.findById(request.params.kidId)
  logger.info('kid', kid)
  if (kid) {
    const exposure = new Exposure({...request.body, date: Date.now()})
    // return 400 error if request body missing vital info
    const result = await exposure.save()
    await kid.updateOne({$push: {'exposures': result._id}}, {upsert: true})
    response.status(201).json(result)
  } else {
    logger.info('kid not found')
    response.status(404).end()
  }
})

module.exports = kidRouter