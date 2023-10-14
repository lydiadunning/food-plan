const Introduction  = require('../models/introduction.js')
const introductionRouter = require('express').Router()


introductionRouter.get('/', async (request, response) => {
  const introduction = await Introduction.find({})

  response.json(introduction)
})

introductionRouter.post('/:childId', async (request, response) => {
  const introduction = new introduction(request.body)
  // return 400 error if request body missing vital info
  const result = await Introduction.save()
  console.log(result)
  response.status(201).json(result)
})

// After fully implementing users, allow a user to remove the link between their profile and a introduction, but don't delete the introduction until it has no remaining ties to any user. 
introductionRouter.delete('/:id', async (request, response) => {
  const introduction = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

introductionRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updated = await Introduction.findByIdAndUpdate(request.params.id, body, { new: true })
  response.json(updated)
})

module.exports = introductionRouter