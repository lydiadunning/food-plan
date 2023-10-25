const Intro = require('../models/intro.js')
const Child = require('../models/child.js')
const introRouter = require('express').Router()


introRouter.get('/', async (request, response) => {
  const intro = await Intro.find({})

  response.json(intro)
})



introRouter.get('/:id', async (request, response) => {
  const intro = await Intro.findById(request.params.id)
  if (intro) {
    response.json(intro)
  } else {
    response.status(404).end()
  }
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