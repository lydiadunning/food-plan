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
  test('a new entry with only required data can be added to a kid profile', async () => {
    const entry = {
      food: 'Olives',
    }

    const response = await api
      .patch(`/api/kid/${kidId}/entry`)
      .set('Authorization', `Bearer ${token}`)
      .send(entry)
      .expect(201)


    const kid = await Kid.findById(kidId)
    console.log(kid.entries)
    expect(kid.entries[0]).toHaveProperty('food')
    expect(kid.entries[0].food).toEqual('Olives')
  })
  test('a new entry can be added to a kid profile', async () => {
    const entry = {
      food: 'Beans',
      description: 'Many different beans',
      outcomes: ['ate a bite'],
      meal: 'dinner'
    }

    const response = await api
      .patch(`/api/kid/${kidId}/entry`)
      .set('Authorization', `Bearer ${token}`)
      .send(entry)
      .expect(201)

      console.log(response.body)
    const kid = await Kid.findById(kidId)
    expect(kid.entries[0]).toHaveProperty('food')
    expect(kid.entries[0].food).toEqual('Beans')
    expect(kid.entries[0].description).toEqual('Many different beans')
    expect(kid.entries[0].outcomes).toHaveLength(1)
    expect(kid.entries[0].outcomes[0]).toEqual('ate a bite')
    expect(kid.entries[0].meal).toEqual('dinner')
  })
 
  test('a new entry with no date will default to the correct date', async () => {
    const entry = {
      food: 'Beans',
    }

    const response = await api
      .patch(`/api/kid/${kidId}/entry`)
      .set('Authorization', `Bearer ${token}`)
      .send(entry)
      .expect(201)

    const dateToday = new Date()
    const kid = await Kid.findById(kidId)
    expect(kid.entries[0]).toHaveProperty('date')
    const dbDate = kid.entries[0].date
    expect(dbDate.getDate()).toEqual(dateToday.getDate())
    expect(dbDate.getDay()).toEqual(dateToday.getDay())
    expect(dbDate.getMonth()).toEqual(dateToday.getMonth())
    expect(dbDate.getYear()).toEqual(dateToday.getYear())
  })
  test('the api returns the correct date', async () => {
    const entry = {
      food: 'Beans',
    }

    const response = await api
      .patch(`/api/kid/${kidId}/entry`)
      .set('Authorization', `Bearer ${token}`)
      .send(entry)
      .expect(201)

    const kid = await Kid.findById(kidId)
    expect(kid.entries[0]).toHaveProperty('date')
    console.log(kid.entries[0].date)
    const dateToday = new Date().toJSON()
    const apiDate = response.body.date
    const dateLength = 10
    expect(apiDate.slice(0, dateLength)).toEqual(dateToday.slice(0, dateLength))
  })
  test('an entry that is not in the db cannot be retrieved', async () => {
    const idNotInDb = '65336ffee3700a6cd0040889'
    const response = await api
      .get(`/api/kid/${kidId}/entry/${idNotInDb}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })
})

describe('With two entries in the database', () => {
  let kidId = ''
  let token = ''
  let userId = null
  const idNotInDb = '65336ffee3700a6cd0040889'
  let entryId = null
  let dbEntry = null
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
      entries: [{
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
    dbEntry = savedKid.entries[0]
    entryId = savedKid.entries[0].id
    console.log({dbEntry})
    console.log({entryId})

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
  test('an entry is returned correctly when queried', async () => {
    const response = await api
      .get(`/api/kid/${kidId}/entry/${entryId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const {food, description, outcomes, meal, date} = response.body
    expect(food).toEqual(dbEntry.food)
    expect(description).toEqual(dbEntry.description)
    expect(outcomes[0]).toEqual(dbEntry.outcomes[0])
    expect(outcomes[1]).toEqual(dbEntry.outcomes[1])
    expect(meal).toEqual(dbEntry.meal)
    expect(date).toEqual(dbEntry.date.toJSON())

  })
  test('getting a nonexistant entry resolves gracefully', async () => {
    const idNotInDb = '65336ffee3700a6cd0040889'
    const response = await api
      .get(`/api/kid/${kidId}/entry/${idNotInDb}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })
  test('an entry can be changed and returns the updated data', async () => {
    const testEntry = {    
      'food': 'squash',
      'description': 'roasted with salt',
    }
    const response = await api
      .patch(`/api/kid/${kidId}/entry/${entryId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testEntry)
      .expect(200)

      console.log(response.body)
    const {food, description, outcomes, meal, date} = response.body
    expect(food).toEqual(testEntry.food)
    expect(description).toEqual(testEntry.description)
    expect(outcomes[0]).toEqual(dbEntry.outcomes[0])
    expect(outcomes[1]).toEqual(dbEntry.outcomes[1])
    expect(meal).toEqual(dbEntry.meal)
    expect(date).toEqual(dbEntry.date.toJSON())

  }, 10000)
  test('an entry can be changed in the db', async () => {
    const testEntry = {    
      'food': 'Peas',
      'description': 'frozen',
      'outcomes': ['sniffed']
    }
    const response = await api
      .patch(`/api/kid/${kidId}/entry/${entryId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testEntry)
      .expect(200)
      
    const kid = await Kid.findOne()
    const {food, description, outcomes, meal, date} = kid.entries[0]
    console.log({food, description, outcomes, meal, date})
    expect(food).toEqual(testEntry.food)
    expect(description).toEqual(testEntry.description)
    expect(outcomes).toHaveLength(1)
    expect(outcomes[0]).toEqual(testEntry.outcomes[0])
    expect(meal).toEqual(dbEntry.meal)
    expect(date).toEqual(dbEntry.date)

  })
  test('changing a nonexistant entry resolves gracefully', async () => {
    const idNotInDb = '65336ffee3700a6cd0040889'
    const testEntry = {    
      'food': 'Parsley',
      'description': 'leaf',
      'outcomes': ['sniffed']
    }
    const response = await api
      .patch(`/api/kid/${kidId}/entry/${idNotInDb}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testEntry)
      .expect(404)
  })
  test('an entry can be deleted', async () => {
    const response = await api
      .delete(`/api/kid/${kidId}/entry/${entryId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const kid = await Kid.findOne()
    expect(kid.entries).toHaveLength(1)
  })
})

// describe('with an entry in the database', () => {
//   const testEntry = {    
//     'food': 'squash',
//     'description': 'roasted with salt',
//   }
//   const idNotInDb = '65336ffee3700a6cd0040889'
//   let id = ''

//   beforeAll(async () => {
//     await Entry.deleteMany({})
//     const entry = new Entry(testEntry)
//     let id = await entry.save()
//   })
//   test('the entry can be retrieved', async () => {
//     const response = await api
//     .get(`/api/entry`)
//     .expect(200)
    
//     expect(response.body)
//     expect(response.body[0]).toHaveProperty('food', 'squash')
//     expect(response.body[0]).toHaveProperty('description', 'roasted with salt')
//     expect(response.body[0]).toHaveProperty('id')

//   })

//   test('the entry can be deleted', async () => {
//     const response = await api
//       .delete(`/api/entry/`)
//   })
  

  
//   test('getting a nonexistant entry will not cause problems', async () => {
//     const response = await api
//     .get(`/api/entry/${idNotInDb}`)
//     .expect(404)
//   })

// })




afterAll(async () => {
  await mongoose.connection.close()
})