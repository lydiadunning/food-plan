const Introduction = require('../models/introduction.js')
const Food = require('../models/food.js')
const introRouter = require('express').Router()


introRouter.get('/', async (request, response) => {
  const introduction = await Introduction.find({})

  response.json(introduction)
})

introRouter.post('/:childId', async (request, response) => {
  console.log("request.body", request.body)
  // const foodInDb = 
  const introduction = new Introduction({...request.body, date: Date.now()})
  // return 400 error if request body missing vital info
  const result = await introduction.save()
  console.log(result)
  response.status(201).json(result)
})

// After fully implementing users, allow a user to remove the link between their profile and a introduction, but don't delete the introduction until it has no remaining ties to any user. 
introRouter.delete('/:id', async (request, response) => {
  const introduction = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

introRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updated = await Introduction.findByIdAndUpdate(request.params.id, body, { new: true })
  response.json(updated)
})

module.exports = introRouter