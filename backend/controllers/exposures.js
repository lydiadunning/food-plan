const Kid = require('../models/kid.js')
const exposureRouter = require('express').Router()


exposureRouter.get('/', async (request, response) => {
  const exposure = await Exposure.find({})

  response.json(exposure)
})



exposureRouter.get('/:id', async (request, response) => {
  const exposure = await Exposure.findById(request.params.id)
  if (exposure) {
    response.json(exposure)
  } else {
    response.status(404).end()
  }
})



// After fully implementing users, allow a user to remove the link between their profile and a exposure, but don't delete the exposure until it has no remaining ties to any user. 
exposureRouter.delete('/:id', async (request, response) => {
  const exposure = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

exposureRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updated = await Exposure.findByIdAndUpdate(request.params.id, body, { new: true })
  response.json(updated)
})

module.exports = exposureRouter