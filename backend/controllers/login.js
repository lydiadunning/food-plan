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
  const isExample = username === 'Example'

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

  if (isExample) {
    resetExample(user)
  }

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

async function resetExample(user) {
  const sampleKidIds = [
    "65b1894800779901eedb5096",
    "65b19e2ddcfa436365a182e9"
  ]

  const kidsToDelete = user.kids.filter(id => !sampleKidIds.includes(id.toString()))
  await Kid.findByIdAndUpdate('65b1894800779901eedb5096', sampleKids[0])
  await Kid.findByIdAndUpdate('65b19e2ddcfa436365a182e9', sampleKids[1])
  await Promise.all(kidsToDelete.map(kidId => Kid.findByIdAndDelete(kidId)))
  user.kids = sampleKidIds.map(id => new ObjectId(id))
  user.save()
}

module.exports = loginRouter


