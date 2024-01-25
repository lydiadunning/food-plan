const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const Kid = require('../models/kid')
const sampleKids = require('../exampleData/sample')
const kid = require('../models/kid')
const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types;

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  if (username === 'Example') {
    resetExample(user)
  }

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

async function  resetExample(user) {
  const sampleKidIds = [
    "65b1894800779901eedb5096",
    "65b19e2ddcfa436365a182e9"
  ]
 
  await Kid.deleteMany({ users: user.id })

  const kids = await Kid.find({ users: user.id })

  const kid1 = new Kid(sampleKids[0])
  const kid2 = new Kid(sampleKids[1])
  await kid1.save()
  await kid2.save()

  user.kids = sampleKidIds.map(id => new ObjectId(id))
  await user.save()
}

module.exports = loginRouter


