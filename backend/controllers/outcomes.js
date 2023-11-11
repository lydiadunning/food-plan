const { Outcome, OutcomeTipArray }  = require('../models/outcome.js')
const outcomeRouter = require('express').Router()

// get all outcomes
outcomeRouter.get('/', async (request, response) => {
  const outcomes = await Outcome.find({})
  response.json(outcomes)
})

// no outcomeRouter.post. Tries currently added when creating or updating kid profile.

outcomeRouter.get('/:id', async (request, response) => {
  const foundOutcome = await Outcome.findById(request.params.id)
  response.json(foundOutcome)
})

outcomeRouter.delete('/:id', async (request, response) => {
  await Outcome.findByIdAndUpdate(request.params.id, {active: false})
  response.status(204).end()
}) 

module.exports = outcomeRouter