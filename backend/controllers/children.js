const Child  = require('../models/child.js')
const childRouter = require('express').Router()
const { Try } = require('../models/try.js')

childRouter.get('/', async (request, response) => {
  const children = await Child.find({}).populate('tries', {try: 1, _id: 1})
  response.json(children)
})


/**
 * request.body: {
 *   name: String
 *   tries: Array [
 *     Objects {
 *       try: String (optional)
 *       tryId: String - ObjectId (optional)
 *       active: Boolean (optional)
 *     }
 *   ]
 * }
 */
childRouter.post('/', async (request, response) => {
  console.log('request.body', request.body)

  // return 400 error if request body missing vital info
  if (!request.body.name) {
    response.status(400).end()
  } 

  try {
  // if the request contains an objectId, keep it, otherwise create a new Try. 
  // uses Promise.all as described here: https://www.youtube.com/shorts/KByYTibYQdY
  const tries = request.body.tries ? await Promise.all(
    request.body.tries?.map(async (obj) => {
      return obj.tryId ? obj.tryId : await new Try({ try: obj.try }).save()
    })
  ) : []

  const child = new Child({
    name: request.body.name,
    tries: tries
  })
  const result = await child.save()
  response.status(201).json(result)
  } catch (err) {
    console.error(err)
    response.status(400)
  }
})

childRouter.get('/:id', async (request, response) => {
  const child = await Child.findById(request.params.id).populate('tries', {try: 1, _id: 1})
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

childRouter.put('/:childId/tries', async (request, response) => {
    const body = request.body

    // if the request contains an objectId, keep it, otherwise create a new Try. 
    // uses Promise.all as described here: https://www.youtube.com/shorts/KByYTibYQdY
    const tries = await Promise.all(
      body.tries.map(async (obj) => {
        return obj.tryId ? obj.tryId : await new Try({ try: obj.try }).save()
      }).catch(error => {
        console.error(err)
        response.status(400)
      })
    ) 
    
    try { // try/catch may not work in async function

    newChild = {...request.body, tries: tries}
    const updated = await Child.findByIdAndUpdate(request.params.childId, newChild, { new: true })

    response.status(200).json(updated)
    } catch (err) {
      console.error(err)
      response.status(400)
    }
})

childRouter.get('/:childId/tries', async (request, response) => {
  const child = await Child.findById(request.params.childId).populate('tries', {try: 1, _id: 1, active: 1})
  response.json(child.tries)
})

module.exports = childRouter