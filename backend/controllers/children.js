const Child  = require('../models/child.js')
const childRouter = require('express').Router()

childRouter.get('/', async (request, response) => {
  const children = await Child.find({})
  response.json(children)
})

childRouter.post('/', async (request, response) => {
  console.log('in childRouter.post')
  const child = new Child(request.body)
  console.log('child', child)
  // return 400 error if request body missing vital info
  if (!child.name) {
    response.status(400).end()
  } 
  console.log('child.name')
  const result = await child.save()
  console.log('save complete')
  response.status(201).json(result)
})

// After fully implementing users, allow a user to remove the link between their profile and a child, but don't delete the child until it has no remaining ties to any user. 
childRouter.delete('/:id', async (request, response) => {
  const child = await Child.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

childRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updated = await Child.findByIdAndUpdate(request.params.id, body, { new: true })
  response.json(updated)
})

module.exports = childRouter