const Child  = require('../models/child.js')
const childRouter = require('express').Router()
const { Threshold, SystemThreshold } = require('../models/thresholds.js')

childRouter.get('/', async (request, response) => {
  const children = await Child.find({})

  console.log('children', children)

  response.json(children)

})

childRouter.post('/', async (request, response) => {
  console.log('in childRouter.post', request.body)

  // return 400 error if request body missing vital info
  if (!request.body.name) {
    response.status(400).end()
  } 

  const child = new Child(request.body)
  console.log('child', child)
  const result = await child.save()
  console.log('save complete')
  response.status(201).json(result)
})

childRouter.get('/:id', async (request, response) => {
  console.log('id', request.params.id)
  const child = await Child.findById(request.params.id)
  response.json(child)
})

// After fully implementing users, allow a user to remove the link between their profile and a child, but don't delete the child until it has no remaining ties to any user. 
childRouter.delete('/:id', async (request, response) => {
  const child = await Child.findByIdAndDelete(request.params.id)
  console.log('child', child)
  response.status(204).end()
})

childRouter.delete('/', async (request, response) => {
  const child = await Child.deleteMany()
  response.status(204).end()
})

childRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updated = await Child.findByIdAndUpdate(request.params.id, body, { new: true })
  response.json(updated)
})

module.exports = childRouter