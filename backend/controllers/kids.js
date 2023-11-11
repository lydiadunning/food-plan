const Kid  = require('../models/kid.js')
const kidRouter = require('express').Router()
const { Outcome } = require('../models/outcome.js')
const Exposure = require('../models/exposure.js')
const logger = require('../utils/logger.js')


kidRouter.get('/', async (request, response) => {
  const kids = await Kid.find({}).populate('outcomes', {outcome: 1, _id: 1})
  response.json(kids)
})


const saveNewTries = async (kidTries) => {
  // if the request contains an objectId, keep it, otherwise create a new Outcome. 
  // uses Promise.all as described here: https://www.youtube.com/shorts/KByYTibYQdY
  const outcomes = await Promise.all(
    kidTries.map(async (obj) => {
      return obj.outcomeId ? obj.outcomeId : await new Outcome({ outcome: obj.outcome }).save()
    })
  ).catch(error => {
    return Promise.reject(error)
  }) 
  return Promise.resolve(outcomes)
}

/**
 * request.body: {
 *   name: String
 *   outcomes: Array [
 *     Objects {
 *       outcome: String (optional)
 *       outcomeId: String - ObjectId (optional)
 *       active: Boolean (optional)
 *     }
 *   ]
 * }
 */
kidRouter.post('/', async (request, response) => {
  // return 400 error if request body missing vital info
  if (!request.body.name) {
    response.status(400).end()
  } 

  try {
    const outcomes = request.body.outcomes
      ? await saveNewTries(request.body.outcomes)
      : []

    const kid = new Kid({
      name: request.body.name,
      outcomes: outcomes
    })
    const result = await kid.save()

    response.status(201).json(result)
  } catch (err) {
    console.error(err.message)
    response.status(404).end()
    // return 
  }
})

kidRouter.get('/:id', async (request, response) => {
  const kid = await Kid.findById(request.params.id).populate('outcomes', {outcome: 1, _id: 1})
  if (kid) {
    response.json(kid)
  } else {
    response.status(404).end()
  }
})

// After fully implementing users, allow a user to remove the link between their profile and a kid, but don't delete the kid until it has no remaining ties to any user. 
kidRouter.delete('/:id', async (request, response) => {
  const kid = await Kid.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

kidRouter.delete('/', async (request, response) => {
  const kid = await Kid.deleteMany()
  response.status(204).end()
})



kidRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id

  const kid = await Kid.findById(id)
  if (!kid) {
    response.status(404).end()
  } 

  const outcomes = await saveNewTries(body.outcomes)
  try { 
    const newKid = {...request.body, outcomes: outcomes.map(x => x._id)}
    const updated = await Kid.findByIdAndUpdate(id, newKid, { new: true }).populate('outcomes', {outcome: 1, _id: 1})
    response.status(200).json(updated)
  } catch (err) {
    console.error(err)
    response.status(400).end()
  }
})

kidRouter.put('/:kidId/outcomes', async (request, response) => {
    const body = request.body

    const kid = await Kid.findById(request.params.kidId)
    if (!kid) {
      response.status(404).end()
    }

    try { // try/catch may not work in async function
    const outcomes = await saveNewTries(request.body.outcomes)
  
    newKid = {...request.body, outcomes: outcomes.map(x => x._id)}
    const updated = await Kid.findByIdAndUpdate(request.params.kidId, newKid, { new: true }).populate('outcomes', {outcome: 1, _id: 1})
    response.status(200).json(updated)
    } catch (err) {
      console.error(err)
      response.status(400).end()
    }
})

kidRouter.get('/:kidId/outcomes', async (request, response) => {
  const kid = await Kid.findById(request.params.kidId).populate('outcomes', {outcome: 1, _id: 1, active: 1})
  if (kid) {
    response.json(kid.outcomes)
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
kidRouter.post('/:kidId/exposure', async (request, response) => {
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