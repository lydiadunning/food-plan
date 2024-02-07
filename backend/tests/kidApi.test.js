const Kid = require('../models/kid.js')
const kidRouter = require('../controllers/kids.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const OutcomeTipArray = require('../models/outcomeTipArray.js')
// const Entry = require('../models/entry.js')
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const api = supertest(app)


// tests currently not working - written before user functionality

describe('With no existing kids', () => {
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      name: 'Jeff Jefferson', 
      username: 'root', 
      passwordHash: passwordHash,
      email: 'jeff@jeff.com'
     })

    await user.save()
  })

  let token = ''
  let userId = null
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      name: 'Jeff Jefferson', 
      username: 'root', 
      passwordHash: passwordHash,
      email: 'jeff@jeff.com'
     })

    const createdUser = await user.save()
    token = createdUser.token
    console.log('firstToken', token)
    userId = createdUser.id


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

  beforeEach(async () => {
    await Kid.deleteMany({})
  })

  test('a new kid profile can be added correctly', async () => {
    const newKid = {
      'name': 'Bess Borgington',
    }
  
    await api
      .post('/api/kid')
      .set('Authorization', `Bearer ${token}`)
      .send(newKid)
      .expect(201)
      .expect('Content-Type', /application\/json/)
     
    const kidsFromDB = await Kid.find({})
    const kids = kidsFromDB.map(kid => kid.toJSON())
  
    const expectedKidCount = 1
  
    expect(kids).toHaveLength(expectedKidCount)
  
    const kidsNoId = kids.map(x => {
      return {
        'name': x.name,
      }
    })
    expect(kidsNoId).toContainEqual(
      newKid
    )
  }) 

  test('a new kid profile will not be added with no name', async () => {
    // const date = new Date()
    const newKid = {
    }
  
    await api
      .post('/api/kid')
      .set('Authorization', `Bearer ${token}`)
      .send(newKid)
      .expect(400)
     
    const kidsFromDB = await Kid.find({})
  
    const expectedKidCount = 0
  
    expect(kidsFromDB).toHaveLength(expectedKidCount)
  
  }) 

  test('a new kid profile can be added with outcomeOption strings', async () => {
      
    const newKid = {
      'name': 'Bess Borgington',
      'outcomeOptions': [
        { outcome: "alpha" }, 
        { outcome: "beta" }, 
        { outcome: "gamma" }
      ]
    }
  
    await api
      .post('/api/kid')
      .set('Authorization', `Bearer ${token}`)
      .send(newKid)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const kidsFromDB = await Kid.find({})
    const kids = kidsFromDB.map(kid => kid.toJSON())
  
    expect(kids[0]).toHaveProperty('outcomeOptions')
    expect(kids[0].outcomeOptions).toHaveLength(3)
  })

  test('a kid query returns an empty array', async () => {
    const response = await api
      .get('/api/kid')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    expect(response.body).toHaveLength(0)
  })

})


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
    userId = createdUser.id

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

  test('a list of kid profiles can be returned', async () => {
    const kidsInDB = await Kid.find()
    console.log(kidsInDB)
    const response = await api
      .get('/api/kid')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(response.body)
    expect(response.body[0]).toHaveProperty('name')
  })

  test('a specific kid profile can be returned', async () => {
    const response = await api
      .get(`/api/kid/${kidId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(response.body)
    expect(response.body).toHaveProperty('name', 'two')
  })

  
  test('getting a nonexistant kid profile will not cause a problem', async () => {
    // test fails- currently returns unauthorized, not sure why
    const response = await api
      .get(`/api/kid/${idNotInDb}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })

  test('the expected number of kid profiles is returned', async () => {
    const response = await api
      .get('/api/kid')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    console.log(response.body)
    expect(response.body).toHaveLength(3)
  })

  test('updating a nonexistant kid will not cause a problem', async () => {
    const newName = { 'name': '2' }
    const response = await api
      .put(`/api/kid/${idNotInDb}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newName)
      .expect(404)
  })


  test("behaves normally when deleting a nonexistant kid", async () => {
    
    const response = await api
      .delete(`/api/kid/${idNotInDb}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const kidsAtEnd = await Kid.find({})
    expect(kidsAtEnd).toHaveLength(3)
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

  test.only('a kid profile can be updated with both fields', async () => {
    const changes = { name: 'new', outcomeOptions: [{outcome: 'uno'}, {outcome: 'dos'}, {outcome: 'tres'}] }
    const changeString = JSON.stringify(changes)
    const response = await api
      .patch(`/api/kid/${kidId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(changeString)
      .expect(200)
    
      console.log(response.body)

    expect(response.body)
    expect(response.body).toHaveProperty('name', 'new')
    expect(response.body.outcomeOptions).toHaveLength(3)
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

  // this tests that the user and kid accounts do not reference each other after deletion.
  test('the correct profile can be deleted', async () => {
  
    const response = await api
      .delete(`/api/kid/${kidId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

      const user = await User.findOne({})

      expect(user.kids).toHaveLength(2)
      expect(user.kids).not.toContain(userId)
      
      const kids = await Kid.find({ users: userId })
      expect(kids).not.toContain(kidId)
      expect(kids).toHaveLength(2)

  })

})

// describe('With a kid profile with outcomes', () => {
//   let kid = null
//   const outcomesToAdd = [
//     { outcome: "alpha" }, 
//     { outcome: "beta" }, 
//     { outcome: "gamma" }
//   ]
//   const idNotInDb = '65336ffee3700a6cd0040889'

//   beforeEach(async () => {
//     const newKid = {
//       'name': 'Ron Rees',
//       'outcomes': outcomesToAdd
//     }
  
//     const response = await api
//       .post('/api/kid')
//       .set('Authorization', `Bearer ${token}`)
//       .send(newKid)
    
//     kid = response.body
//   })

//   test("the kid's list of outcomes can be returned in order", async () => {
//     const response = await api
//       .get(`/api/kid/${kid.id}/outcomes`)
//       .expect(200)

//       const responseOutcomes = response.body.map(x => { 
//         return {
//           outcome: x.outcome
//         }
//       })
//       expect(responseOutcomes[0]).toEqual(outcomesToAdd[0])
//       expect(responseOutcomes[1]).toEqual(outcomesToAdd[1])
//       expect(responseOutcomes[2]).toEqual(outcomesToAdd[2])

//   })

//   test('a list of outcomes can be changed', async () => {
//     const kidOutcomes = kid.outcomes.map(x => {
//       return {
//         outcomeId: x.id
//       }
//     })
//     kidOutcomes.push({ outcome: 'touch' })
//     kid.outcomes = kidOutcomes

//     const response = await api.put(`/api/kid/${kid.id}/outcomes`)
//       .send(kid)
//       .expect(200)
    
//     expect(response.body.outcomes).toHaveLength(4)
//     const newOutcome = await Outcome.findById(response.body.outcomes[response.body.outcomes.length - 1])
//     expect(newOutcome).toHaveProperty('outcome', 'touch')
//     expect(newOutcome).toHaveProperty('id')
//   })

//   test('expected response when getting outcomes for a nonexistant kid', async () => {
//     const response = await api
//       .get(`/api/kid/${idNotInDb}/outcomes`)
//       .expect(404)
//   })

//   test('graceful when adding outcomes to nonexistant kid', async () => {
//     const response = await api
//     .put(`/api/kid/${idNotInDb}/outcomes`)
//     .send({outcomes: outcomesToAdd})
//     .expect(404)
//   })
// })

// describe('with a kid with several entries in the db', () => {
//   let kidId = ''
//   let outcomeId = ''
//   const testEntries = [{    
//     'food': 'squash',
//     'description': 'roasted with salt',
//   }, {    
//     'food': 'beans',
//     'description': 'canned',
//   }]
//   const idNotInDb = '65336ffee3700a6cd0040889'

//   beforeAll(async () => {
//     console.log('in beforeAll')
//     await Kid.deleteMany({})

//     const newOutcome = new Outcome({ outcome: 'smell' })
//     const savedOutcomes = await newOutcome.save()
//     outcomeId = savedOutcomes.id
//     testEntries[0].outcome = outcomeId
//     testEntries[1].outcome = outcomeId

//     console.log('outcome created')

//     const kid = new Kid({ 
//       'name': 'Kid Name', 
//       outcomes: [outcomeId] 
//     })

//     const savedKid = await kid.save()
//     kidId = savedKid.id    

//     console.log('kid created')

//     const entries = await Promise.all(
//       testEntries.map(async (obj) => {
//         return await new Entry(obj).save()
//       })
//     )

//     console.log('entries inserted')

//     await Kid.findByIdAndUpdate(kidId, {$push: {'entries': entries}}, {upsert: true})
//   })

//   test("the kid's entries can be retrieved", async () => {
//     const response = await api
//       .get(`/api/kid/${kidId}/entry`)
//       .expect(200)
//     expect(response.body)
//     expect(response.body).toHaveLength(2)
//   })

//   test("getting a nonexistant kid's entries works as expected", async () => {
//     const response = await api
//       .get(`/api/kid/${idNotInDb}/entry`)
//       .expect(404)
//   })

//   test("a new entry can be added to the kid's entries",  async() => {
//     const newEntry = {
//       'food': 'green beans', 
//       'description': 'steamed',
//       'outcome': outcomeId
//     }

//     const response = await api
//       .post(`/api/kid/${kidId}/entry`)
//       .send(newEntry)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
      
//     const kid = await Kid.findById(kidId).populate('entries', { food: 1, description: 1, outcome: 1})
    
//     const entriesNoId = kid.entries.map(x => {
//       return {
//         'food': x.food,
//         'description': x.description,
//         'outcome': outcomeId
//       }
//     })
//     expect(entriesNoId).toContainEqual(
//       newEntry
//     )
//   })
// })


// describe('creating an entry', () => {
//   let kidId = ''
//   let outcomeId = ''
//   const idNotInDb = '65336ffee3700a6cd0040889'

//   beforeAll(async () => {
//     await Kid.deleteMany({})

//     const newOutcome = new Outcome({ outcome: 'smell' })
//     const savedOutcomes = await newOutcome.save()
//     outcomeId = savedOutcomes.id

//     const kid = new Kid({ 
//       'name': 'Kid Name', 
//       outcomes: [outcomeId] 
//     })

//     const savedKid = await kid.save()
//     kidId = savedKid.id    
//   })

//   beforeEach(async () => {
//     await Entry.deleteMany({})
//   })

//   test('a new entry can be added correctly', async () => {
//     const newEntry = {
//       'food': 'broccoli', 
//       'description': 'roasted with salt',
//     }

//     await api
//       .post(`/api/kid/${kidId}/entry`)
//       .send(newEntry)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
  
//     const entriesFromDB = await Entry.find({})
//     const entries = entriesFromDB.map(entry => entry.toJSON())
  
//     const expectedEntryCount = 1
  
//     expect(entries).toHaveLength(expectedEntryCount)
  
//     const entriesNoId = entries.map(x => {
//       return {
//         'food': x.food,
//         'description': x.description,
//       }
//     })
//     expect(entriesNoId).toContainEqual(
//       newEntry
//     )
//   })

//   test('a new entry will not be added to a nonexistant kid', async () => {
//     const newEntry = {
//       'food': 'broccoli', 
//       'description': 'roasted with salt',
//     }

//     await api
//       .post(`/api/kid/${idNotInDb}/entry`)
//       .send(newEntry)
//       .expect(404)
//   })

//   test('a new entry will default to the current date', async () => {
//     const date = new Date()

//     const newEntry = {
//       'food': 'squash',
//       'description': 'roasted with salt',
//     }

//     await api
//       .post(`/api/kid/${kidId}/entry`)
//       .send(newEntry)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
  
//     const entriesFromDB = await Entry.find({})
//     const entries = entriesFromDB.map(entry => entry.toJSON())
  
//     const recentEntry = entries.filter(x => x.food === 'squash')[0]
//     expect(recentEntry.date.getFullYear()).toEqual(
//       date.getFullYear()
//     )
//     expect(recentEntry.date.getDate()).toEqual(
//       date.getDate()
//     )
//     expect(recentEntry.date.getMonth()).toEqual(
//       date.getMonth()
//     )
//   })

//   // outcome here not specific to kid. No relationship between a kid's outcomes and the outcomes in their entries
//   test('a new entry can be added with a outcome', async () => {
//     const date = new Date()

//     const newEntry = {
//       'food': 'broccoli', 
//       'description': 'roasted with salt',
//       'outcome': outcomeId
//     }

//     await api
//       .post(`/api/kid/${kidId}/entry`)
//       .send(newEntry)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
  
//     const entriesFromDB = await Entry.find({})
//     const entries = entriesFromDB.map(entry => entry.toJSON())
  
//     const expectedEntryCount = 1
  
//     expect(entries).toHaveLength(expectedEntryCount)
//     const entriesNoId = entries.map(x => {
//       return {
//         'food': x.food,
//         'description': x.description,
//         'outcome': x.outcome
//       }
//     })
//     expect(entriesNoId).toContainEqual(
//       newEntry
//     )
//   })

  
// })



afterAll(async () => {
  await mongoose.connection.close()
})







// a kid's list of outcomes can be retrieved

// a kid's list of outcomes can be updated