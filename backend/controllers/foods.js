const Food  = require('../models/food.js')
const foodRouter = require('express').Router()


foodRouter.get('/', async (request, response) => {
  const foods = await Food.find({})

  response.json(foods)
})

foodRouter.post('/', async (request, response) => {
  const food = new Food(request.body)
  // return 400 error if request body missing vital info
  const result = await food.save()
  response.status(201).json(result)
})

// After fully implementing users, allow a user to remove the link between their profile and a food, but don't delete the food until it has no remaining ties to any user. 
foodRouter.delete('/:id', async (request, response) => {
  const food = await Food.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

foodRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updated = await Food.findByIdAndUpdate(request.params.id, body, { new: true })
  response.json(updated)
})

module.exports = foodRouter