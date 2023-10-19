const Intro = require('../models/intro.js')
const Child = require('../models/child.js')
const introRouter = require('express').Router()


introRouter.get('/', async (request, response) => {
  const intro = await Intro.find({})

  response.json(intro)
})

introRouter.post('/:childId', async (request, response) => {
  const intro = new Intro({...request.body, date: Date.now()})
  // return 400 error if request body missing vital info
  const result = await intro.save()
  await Child.findByIdAndUpdate(request.params.childId, {$push: {'intros': result._id}}, {upsert: true})
  response.status(201).json(result)
})

// After fully implementing users, allow a user to remove the link between their profile and a intro, but don't delete the intro until it has no remaining ties to any user. 
introRouter.delete('/:id', async (request, response) => {
  const intro = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

introRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updated = await Intro.findByIdAndUpdate(request.params.id, body, { new: true })
  response.json(updated)
})

module.exports = introRouter