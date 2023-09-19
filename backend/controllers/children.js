const Child  = require('model.js')
const childRouter = require('express').Router()

childRouter.get('/', async (request, response) => {
  const children = await Child.find({})

  response.json(children)
})

childRouter.post('/', async (request, response) => {
  const child = new Child(request.body)
  // return 400 error if request body missing vital info
  const result = await child.save()
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

module.exports(childRouter)