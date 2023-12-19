const Kid = require('../models/kid.js')
const kidRouter = require('../controllers/kids.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const OutcomeTipArray = require('../models/outcomeTipArray.js')
// const Exposure = require('../models/exposure.js')
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const api = supertest(app)



describe('With kid profiles in the database', () => {
  let kidId = ''
  const idNotInDb = '65336ffee3700a6cd0040889'
  let token = ''
  let userId = null
  beforeEach(async () => {
    await User.deleteMany({})
    await Kid.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      name: 'Jeff Jefferson', 
      username: 'root', 
      passwordHash: passwordHash,
      email: 'jeff@jeff.com'
     })

    const createdUser = await user.save()
    userId = createdUser._id

    const kids = [
      {
        'name': 'one',
        'users': [createdUser.id]
      },
      {
        'name': 'two',
        'users': [createdUser.id]
      },
      {
        'name': 'three',
        'users': [createdUser.id]
      }
    ]
    const kidObjects = await Kid.insertMany(kids)
    const kidIds = kidObjects.map(kidObj => kidObj.id)
    kidId = kidIds[1]

    console.log('kidIds', kidIds)
    user.kids = kidIds
    await user.save()

    const returningUser = {
      username: 'root',
      password: 'sekret',
    }
      
    const result = await api
      .post('/api/login')
      .send(returningUser)

    token = result.body.token
    console.log('token', token)
  })

  test('updating a nonexistant kid will not cause a problem', async () => {
    const newName = { 'name': '2' }
    const response = await api
      .put(`/api/kid/${idNotInDb}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newName)
      .expect(404)
  })


  test('a list of outcomes can be added', async () => {

    const response = await api
      .patch(`/api/kid/${kidId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({outcomeOptions: [{ outcome: 'taste' }]})
      .expect(200)
    
    expect(response.body.outcomeOptions).toHaveLength(1)
    expect(response.body.outcomeOptions[0].outcome).toEqual('taste')
  })

  test('a kid profile can be updated', async () => {
    const newName = { 'name': '2' }
    const response = await api
      .patch(`/api/kid/${kidId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newName)
      .expect(200)

    expect(response.body)
    expect(response.body).toHaveProperty('name', '2')
  })

  test('a kid profile can be updated with both fields', async () => {
    const changes = { name: 'new', outcomeOptions: [{outcome: 'uno'}, {outcome: 'dos'}, {outcome: 'tres'}] }
    // const changeString = JSON.stringify(changes)
    const response = await api
      .patch(`/api/kid/${kidId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(changes)
      .expect(200)
    
      console.log(response.body)

    expect(response.body)
    expect(response.body).toHaveProperty('name', 'new')
    expect(response.body.outcomeOptions).toHaveLength(3)
    expect(response.body.outcomeOptions[0]).toHaveProperty('outcome', 'uno')
  })

  test.only('the database is updated correctly when a kid profile is updated with both fields', async () => {
    const changes = { name: 'boop', outcomeOptions: [{outcome: 'un'}, {outcome: 'deux'}, {outcome: 'trois'}] }
    // const changeString = JSON.stringify(changes)
    const response = await api
      .patch(`/api/kid/${kidId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(changes)
      .expect(200)
    
      console.log(response.body)
    const kid = await Kid.findById(kidId)
    console.log(kid)
    expect(kid).toHaveProperty('name', 'boop')
    expect(kid.outcomeOptions).toHaveLength(3)
    expect(kid.outcomeOptions[0]).toHaveProperty('outcome', 'un')
  })

  test('a kid profile cannot be updated with invalid data', async () => {
    const change = { outcomeOptions: 'not supposed to be a string' }

    console.log(Array.isArray(change.outcomeOptions))
    const response = await api
      .patch(`/api/kid/${kidId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(change)
      .expect(400)
  })

})
afterAll(async () => {
  console.log('closing connection')
  await mongoose.connection.close()
})