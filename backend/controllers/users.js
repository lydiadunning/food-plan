const User = require('../models/user.js')
const userRouter = require('express').Router()
const Kid  = require('../models/kid.js')
const logger = require('../utils/logger.js')
const bcrypt = require('bcryptjs')


userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  .populate('kids', 
    // { 
    //   name: 1, 
    //   outcomeOptions: 1,// not sure what this will give me
    //   exposures: 1,
    // }
  )
  response.json(users)
})
// allow for creating a user profile
// each user profile can reference kid profiles.

// operations:

// create a new user
// userRouter.post('/', async (request, response) => {
  // validate that body contains all required information
  // add the user to the database
  // send a response with the created user.
  // send an error response if necessary.
// })
userRouter.post('/', async (request, response, next) => {
  const { username, name, password, email } = request.body
  logger.info('from request.body', username, name, password, email)

  if (!password || password.length < 3) {
    return response.status(400).json({ 
      error: password ? 'password must be at least 3 characters long' : 'password is required'
    })
  } 
  logger.info('past if password incorrect')
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  logger.info('passwordHash formed')

  const user = new User({
    username,
    name,
    passwordHash,
    email
  })
  try {
    logger.info('saving user')
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    logger.error(error)
    next(error)
  }
})
 
// // change a user - add a kid - not create a kid
// userRouter.patch('/:id/addKid/:kidId', async (request, response) => {
//   // verify the kid exists
//   // verify the user exists
//   // add the kid to the user's list of kids
//   // return the updated user information or error
// })

// // change a user - remove a kid
// userRouter.patch('/:id/removeKid/:kidId', async (request, response) => {
//   // remove the kid from the user
//   // return the updated user info or error
// })

// // delete a user
// userRouter.delete('/:id', async (request, response) => {
//   // find the given user
//   // remove the user from the database
//   // return that the user is no longer in the database
//   // or a db error message
// })

module.exports = userRouter




