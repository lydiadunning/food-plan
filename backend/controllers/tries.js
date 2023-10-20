const { Try, TryHintArray }  = require('../models/try.js')
const tryRouter = require('express').Router()

// get all tries
tryRouter.get('/', async (request, response) => {
  const tries = await Try.find({})
  response.json(tries)
})

// no tryRouter.post. Tries currently added when creating or updating child profile.

tryRouter.get('/:id', async (request, response) => {
  const foundTry = await Try.findById(request.params.id)
  response.json(foundTry)
})

tryRouter.delete('/:id', async (request, response) => {
  await Try.findByIdAndUpdate(request.params.id, {active: false})
  response.status(204).end()
}) 

module.exports = tryRouter