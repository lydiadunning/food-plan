const Child  = require('../models/child.js')
const childRouter = require('express').Router()
const { Threshold } = require('../models/threshold.js')

childRouter.get('/', async (request, response) => {
  const children = await Child.find({}).populate('thresholds', {threshold: 1, _id: 1})

  console.log('children', children)

  response.json(children)

})


/**
 * request.body: {
 *   name: String
 *   thresholds: Array [
 *     Objects {
 *       threshold: String (optional)
 *       thresholdId: String - ObjectId (optional)
 *       active: Boolean (optional)
 *     }
 *   ]
 * }
 */
childRouter.post('/', async (request, response) => {
  console.log('in childRouter.post', request.body)

  // return 400 error if request body missing vital info
  if (!request.body.name) {
    response.status(400).end()
  } 

  try {
  // if the request contains an objectId, keep it, otherwise create a new Threshold. 
  // uses Promise.all as described here: https://www.youtube.com/shorts/KByYTibYQdY
  const thresholds = request.body.thresholds ? await Promise.all(
    request.body.thresholds?.map(async (obj) => {
      return obj.thresholdId ? obj.thresholdId : await new Threshold({ threshold: obj.threshold }).save()
    })
  ) : []

  const child = new Child({
    name: request.body.name,
    thresholds: thresholds
  })
  console.log('child', child)
  const result = await child.save()
  console.log('save complete')
  response.status(201).json(result)
  } catch (err) {
    console.error(err)
    response.status(400)
  }
})

childRouter.get('/:id', async (request, response) => {
  console.log('id', request.params.id)
  const child = await Child.findById(request.params.id).populate('thresholds', {threshold: 1, _id: 1})
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