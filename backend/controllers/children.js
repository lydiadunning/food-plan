const Child  = require('../models/child.js')
const childRouter = require('express').Router()

childRouter.get('/', async (request, response) => {
  const children = await Child.findOne({}).populate('thresholds', {threshold: 1, _id: 1})

  console.log('children', children)
  // const childrenWithThresholds = await children.map(async child => {
  //   return await child.populate('thresholds', {threshold: 1, _id: 1})
  // })
  response.json(children)
  // console.log('childrenWithThresholds', childrenWithThresholds)
  // response.json(childrenWithThresholds)
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

childRouter.get('/:id', async (request, response) => {
  console.log('id', request.params.id)
  const child = await Child.findById(request.params.id)//.populate('thresholds', {threshold: 1, _id: 1})
  response.json(child)
})

// After fully implementing users, allow a user to remove the link between their profile and a child, but don't delete the child until it has no remaining ties to any user. 
childRouter.delete('/:id', async (request, response) => {
  const child = await Child.findByIdAndDelete(request.params.id)
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