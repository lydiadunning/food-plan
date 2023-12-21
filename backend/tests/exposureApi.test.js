const Kid = require('../models/kid.js')
const User = require('../models/user.js')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)

describe('With kid profiles in the database', () => {
  let kidId = ''
  let token = ''
  let userId = null
  beforeEach(async () => {
    await User.deleteMany({})
    await Kid.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      name: 'Bork Jefferson', 
      username: 'theUser', 
      passwordHash: passwordHash,
      email: 'bork@bork.com'
     })

    const createdUser = await user.save()
    userId = createdUser.id
     
    const kid = 
    {
      'name': 'one',
      'users': [createdUser.id]
    }
    
    const kidObject = new Kid(kid)
    const savedKid = await kidObject.save()
    kidId = savedKid.id
    console.log({kidId})

    user.kids = [kidId]
    await user.save()

    const returningUser = {
      username: 'theUser',
      password: 'sekret',
    }
      
    const result = await api
      .post('/api/login')
      .send(returningUser)

    token = result.body.token
  })
  test('a new exposure with only required data can be added to a kid profile', async () => {
    const exposure = {
      food: 'Olives',
    }

    const response = await api
      .patch(`/api/kid/${kidId}/exposure`)
      .set('Authorization', `Bearer ${token}`)
      .send(exposure)
      .expect(201)


    const kid = await Kid.findById(kidId)
    console.log(kid.exposures)
    expect(kid.exposures[0]).toHaveProperty('food')
    expect(kid.exposures[0].food).toEqual('Olives')
  })
  test('a new exposure can be added to a kid profile', async () => {
    const exposure = {
      food: 'Beans',
      description: 'Many different beans',
      outcomes: ['ate a bite'],
      meal: 'dinner'
    }

    const response = await api
      .patch(`/api/kid/${kidId}/exposure`)
      .set('Authorization', `Bearer ${token}`)
      .send(exposure)
      .expect(201)

      console.log(response.body)
    const kid = await Kid.findById(kidId)
    expect(kid.exposures[0]).toHaveProperty('food')
    expect(kid.exposures[0].food).toEqual('Beans')
    expect(kid.exposures[0].description).toEqual('Many different beans')
    expect(kid.exposures[0].outcomes).toHaveLength(1)
    expect(kid.exposures[0].outcomes[0]).toEqual('ate a bite')
    expect(kid.exposures[0].meal).toEqual('dinner')
  })
 
  test('a new exposure with no date will default to the correct date', async () => {
    const exposure = {
      food: 'Beans',
    }

    const response = await api
      .patch(`/api/kid/${kidId}/exposure`)
      .set('Authorization', `Bearer ${token}`)
      .send(exposure)
      .expect(201)

    const dateToday = new Date()
    const kid = await Kid.findById(kidId)
    expect(kid.exposures[0]).toHaveProperty('date')
    const dbDate = kid.exposures[0].date
    expect(dbDate.getDate()).toEqual(dateToday.getDate())
    expect(dbDate.getDay()).toEqual(dateToday.getDay())
    expect(dbDate.getMonth()).toEqual(dateToday.getMonth())
    expect(dbDate.getYear()).toEqual(dateToday.getYear())
  })
  test('the api returns the correct date', async () => {
    const exposure = {
      food: 'Beans',
    }

    const response = await api
      .patch(`/api/kid/${kidId}/exposure`)
      .set('Authorization', `Bearer ${token}`)
      .send(exposure)
      .expect(201)

    const kid = await Kid.findById(kidId)
    expect(kid.exposures[0]).toHaveProperty('date')
    console.log(kid.exposures[0].date)
    const dateToday = new Date().toJSON()
    const apiDate = response.body.date
    const dateLength = 10
    expect(apiDate.slice(0, dateLength)).toEqual(dateToday.slice(0, dateLength))
  })
  test('an exposure that is not in the db cannot be retrieved', async () => {
    const idNotInDb = '65336ffee3700a6cd0040889'
    const response = await api
      .get(`/api/kid/${kidId}/exposure/${idNotInDb}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })
})

describe('With two exposures in the database', () => {
  let kidId = ''
  let token = ''
  let userId = null
  const idNotInDb = '65336ffee3700a6cd0040889'
  let exposureId = null
  let dbExposure = null
  beforeAll(async () => {
    await User.deleteMany({})
    await Kid.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      name: 'Bork Jefferson', 
      username: 'theUser', 
      passwordHash: passwordHash,
      email: 'bork@bork.com'
     })

    const createdUser = await user.save()
    userId = createdUser.id


    const kid = {
      'name': 'one',
      'users': [createdUser.id],
      exposures: [{
        food: 'Pear',
        description: 'whole',
        outcomes: [
          'sniffed',
          'tasted'
        ],
        meal: 'snack'
      },{
        food: 'Beef',
        description: 'Stew',
        outcomes: [
          'ate',
        ],
        meal: 'dinner'
      },
    ]
    }
    const kidObject = new Kid(kid)
    const savedKid = await kidObject.save()
    console.log({savedKid})
    kidId = savedKid.id
    dbExposure = savedKid.exposures[0]
    exposureId = savedKid.exposures[0].id
    console.log({dbExposure})
    console.log({exposureId})

    user.kids = [kidId]
    await user.save()

    const returningUser = {
      username: 'theUser',
      password: 'sekret',
    }
      
    const result = await api
      .post('/api/login')
      .send(returningUser)

    token = result.body.token
  })
  test('an exposure is returned correctly when queried', async () => {
    const response = await api
      .get(`/api/kid/${kidId}/exposure/${exposureId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const {food, description, outcomes, meal, date} = response.body
    expect(food).toEqual(dbExposure.food)
    expect(description).toEqual(dbExposure.description)
    expect(outcomes[0]).toEqual(dbExposure.outcomes[0])
    expect(outcomes[1]).toEqual(dbExposure.outcomes[1])
    expect(meal).toEqual(dbExposure.meal)
    expect(date).toEqual(dbExposure.date.toJSON())

  })
  test('getting a nonexistant exposure resolves gracefully', async () => {
    const idNotInDb = '65336ffee3700a6cd0040889'
    const response = await api
      .get(`/api/kid/${kidId}/exposure/${idNotInDb}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })
  test('an exposure can be changed and returns the updated data', async () => {
    const testExposure = {    
      'food': 'squash',
      'description': 'roasted with salt',
    }
    const response = await api
      .patch(`/api/kid/${kidId}/exposure/${exposureId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testExposure)
      .expect(200)

      console.log(response.body)
    const {food, description, outcomes, meal, date} = response.body
    expect(food).toEqual(testExposure.food)
    expect(description).toEqual(testExposure.description)
    expect(outcomes[0]).toEqual(dbExposure.outcomes[0])
    expect(outcomes[1]).toEqual(dbExposure.outcomes[1])
    expect(meal).toEqual(dbExposure.meal)
    expect(date).toEqual(dbExposure.date.toJSON())

  }, 10000)
  test('an exposure can be changed in the db', async () => {
    const testExposure = {    
      'food': 'Peas',
      'description': 'frozen',
      'outcomes': ['sniffed']
    }
    const response = await api
      .patch(`/api/kid/${kidId}/exposure/${exposureId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testExposure)
      .expect(200)
      
    const kid = await Kid.findOne()
    const {food, description, outcomes, meal, date} = kid.exposures[0]
    console.log({food, description, outcomes, meal, date})
    expect(food).toEqual(testExposure.food)
    expect(description).toEqual(testExposure.description)
    expect(outcomes).toHaveLength(1)
    expect(outcomes[0]).toEqual(testExposure.outcomes[0])
    expect(meal).toEqual(dbExposure.meal)
    expect(date).toEqual(dbExposure.date)

  })
  test('changing a nonexistant exposure resolves gracefully', async () => {
    const idNotInDb = '65336ffee3700a6cd0040889'
    const testExposure = {    
      'food': 'Parsley',
      'description': 'leaf',
      'outcomes': ['sniffed']
    }
    const response = await api
      .patch(`/api/kid/${kidId}/exposure/${idNotInDb}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testExposure)
      .expect(404)
  })
  test('an exposure can be deleted', async () => {
    const response = await api
      .delete(`/api/kid/${kidId}/exposure/${exposureId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const kid = await Kid.findOne()
    expect(kid.exposures).toHaveLength(1)
  })
})

// describe('with an exposure in the database', () => {
//   const testExposure = {    
//     'food': 'squash',
//     'description': 'roasted with salt',
//   }
//   const idNotInDb = '65336ffee3700a6cd0040889'
//   let id = ''

//   beforeAll(async () => {
//     await Exposure.deleteMany({})
//     const exposure = new Exposure(testExposure)
//     let id = await exposure.save()
//   })
//   test('the exposure can be retrieved', async () => {
//     const response = await api
//     .get(`/api/exposure`)
//     .expect(200)
    
//     expect(response.body)
//     expect(response.body[0]).toHaveProperty('food', 'squash')
//     expect(response.body[0]).toHaveProperty('description', 'roasted with salt')
//     expect(response.body[0]).toHaveProperty('_id')

//   })

//   test('the exposure can be deleted', async () => {
//     const response = await api
//       .delete(`/api/exposure/`)
//   })
  

  
//   test('getting a nonexistant exposure will not cause problems', async () => {
//     const response = await api
//     .get(`/api/exposure/${idNotInDb}`)
//     .expect(404)
//   })

// })




afterAll(async () => {
  await mongoose.connection.close()
})