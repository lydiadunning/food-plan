const Kid = require('../models/kid.js')
const kidRouter = require('../controllers/kids.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const { Outcome, OutcomeTipArray } = require('../models/outcome.js')
const Exposure = require('../models/exposure.js')
const kid = require('../models/kid.js')
const api = supertest(app)


// tests

/**
 * Tests to add 
 * 
 * can add a profile with all required properties and no non-required properties
 * doesn't add a profile missing required properties
 * doesn't allow update to a profile missing required properties
 * allows update to profile with required properties
 * after a kid has exposureductions, an update to the kid's profile does not alter the exposureduction history
 * a kid's outcomes can be changed to add a new systemOutcome
 * a kid's outcomes can be changed to remove a systemOutcome
 *  * a kid's outcomes can be changed to add a new outcome string
 * a kid's outcomes can be changed to remove a outcome string
 * a kid's outcome returns a mix of oucomeTips and outcomes correctly and in the expected order
 * a kid's outcomes can be re-ordered
 * trying to update a profile that doesn't exist won't work
 * trying to delete a profile that doesn't exist works
 */


describe('With no existing kids', () => {

  beforeEach(async () => {
    await Kid.deleteMany({})
  })

  test('a new kid profile can be added correctly', async () => {
    // const date = new Date()
    const newKid = {
      'name': 'Bess Borgington',
    }
  
    await api
      .post('/api/kid')
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
      .send(newKid)
      .expect(400)
     
    const kidsFromDB = await Kid.find({})
  
    const expectedKidCount = 0
  
    expect(kidsFromDB).toHaveLength(expectedKidCount)
  
  }) 

  test('a new kid profile can be added with outcome strings', async () => {
      
    const newKid = {
      'name': 'Bess Borgington',
      'outcomes': [
        { outcome: "alpha" }, 
        { outcome: "beta" }, 
        { outcome: "gamma" }
      ]
    }
  
    await api
      .post('/api/kid')
      .send(newKid)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const kidsFromDB = await Kid.find({})
    const kids = kidsFromDB.map(kid => kid.toJSON())
  
    expect(kids[0]).toHaveProperty('outcomes')
    expect(kids[0].outcomes).toHaveLength(3)
  })

  test('a kid query returns an empty array', async () => {
    const response = await api
      .get('/api/kid')
      .expect(200)
    expect(response.body).toHaveLength(0)
  })

})

//may flesh this out later
describe('With Outcome hints from the database', () => {
  let recievedOutcomes = []
  let sentOutcomes = []
  beforeAll(async () => {
    await Kid.deleteMany({})

    let outcomeTipArray = await OutcomeTipArray.findOne({})
    if (!outcomeTipArray) {
      outcomeTipArray = await api
      .post('/api/outcome/hints')
      .send(['one', 'two', 'three'])
    }

    recievedOutcomes = outcomeTipArray.outcomes
    sentOutcomes = outcomeTipArray.outcomes.map(x => {
      return {outcomeId: x}
    })
  })

  test('a new kid profile can use outcome hints', async () => {
    const newKid = {
      'name': 'Bess Borgington',
      'outcomes': sentOutcomes
    }
  
    await api
      .post('/api/kid')
      .send(newKid)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
    const kidsFromDB = await Kid.find({})
    const kids = kidsFromDB.map(kid => kid.toJSON())
  
    const kidsNoId = kids.map(x => {
      return {
        'name': x.name,
        'outcomes': x.outcomes
      }
    })
    expect(kidsNoId).toContainEqual(
      {
        'name': 'Bess Borgington',
        'outcomes': recievedOutcomes
      }
    )
  }) 

})
 

describe('With kid profiles in the database', () => {
  let kidId = ''
  const idNotInDb = '65336ffee3700a6cd0040889'

  beforeEach(async () => {
    await Kid.deleteMany({})
    const kids = [
      {
        'name': 'one'
      },
      {
        'name': 'two'
      },
      {
        'name': 'three'
      }
    ]
    const kidObjects = await Kid.insertMany(kids)
    kidId = kidObjects[1]._id
  })

  test('a list of kid profiles can be returned', async () => {
    const response = await api
      .get('/api/kid')
      .expect(200)

    expect(response.body)
    expect(response.body[0]).toHaveProperty('name')
  })

  test('a specific kid profile can be returned', async () => {
    const response = await api
      .get(`/api/kid/${kidId}`)
      .expect(200)

    expect(response.body)
    expect(response.body).toHaveProperty('name', 'two')
  })

  
  test('getting a nonexistant kid profile will not cause a problem', async () => {
    const response = await api
      .get(`/api/kid/${idNotInDb}`)
      .expect(404)
  })

  test('the expected number of kid profiles is returned', async () => {
    const response = await api.get('/api/kid').expect(200)
    console.log(response.body)
    expect(response.body).toHaveLength(3)
  })

  test('updating a nonexistant kid will not cause a problem', async () => {
    const newName = { 'name': '2' }
    const response = await api
      .put(`/api/kid/${idNotInDb}`)
      .send(newName)
      .expect(404)
  })

  test('the correct profile can be deleted', async () => {
    const allProfiles = await api.get('/api/kid')
    const kids = allProfiles.body
    idToDelete = kids[0]._id
    
    const response = await api
      .delete(`/api/kid/${idToDelete}`)
      .expect(204)

    const kidsAtEnd = await Kid.find({})
    const endKids = kidsAtEnd.map(kid => kid.toJSON())
    expect(endKids).not.toContain(kids[0])
    expect(endKids).toHaveLength(2)
  })

  test("behaves normally when deleting a nonexistant kid", async () => {
    
    const response = await api
      .delete(`/api/kid/${idNotInDb}`)
      .expect(204)

    const kidsAtEnd = await Kid.find({})
    expect(kidsAtEnd).toHaveLength(3)
  })

  test('a list of outcomes can be added', async () => {
    const kidInDb = await Kid.findOne()
    const kid = {     
      _id: kidInDb._id,
      name: kidInDb.name,
      exposures: [],
      outcomes: [{ outcome: 'taste' }],
      __v: kidInDb.__v
    }

    const response = await api.put(`/api/kid/${kid._id}/outcomes`)
      .send(kid)
      .expect(200)
    
    expect(response.body.outcomes).toHaveLength(1)
    const newOutcome = await Outcome.findById(response.body.outcomes[0])
    expect(newOutcome).toHaveProperty('outcome', 'taste')
  })

  test('a kid profile can be updated', async () => {
    const newName = { 'name': '2' }
    const response = await api
      .put(`/api/kid/${kidId}`)
      .send(newName)
      .expect(200)
    expect(response.body)
    expect(response.body).toHaveProperty('name', '2')
  })

  test('a kid profile cannot be updated with invalid data', async () => {
    const exposures = { exposures: 'not supposed to be a string' }
    const response = await api
      .put(`/api/kid/${kidId}`)
      .send(exposures)
      .expect(400)
  })

})

describe('With a kid profile with outcomes', () => {
  let kid = null
  const outcomesToAdd = [
    { outcome: "alpha" }, 
    { outcome: "beta" }, 
    { outcome: "gamma" }
  ]
  const idNotInDb = '65336ffee3700a6cd0040889'

  beforeEach(async () => {
    const newKid = {
      'name': 'Ron Rees',
      'outcomes': outcomesToAdd
    }
  
    const response = await api
      .post('/api/kid')
      .send(newKid)
    
    kid = response.body
  })

  test("the kid's list of outcomes can be returned in order", async () => {
    const response = await api
      .get(`/api/kid/${kid._id}/outcomes`)
      .expect(200)

      const responseOutcomes = response.body.map(x => { 
        return {
          outcome: x.outcome
        }
      })
      expect(responseOutcomes[0]).toEqual(outcomesToAdd[0])
      expect(responseOutcomes[1]).toEqual(outcomesToAdd[1])
      expect(responseOutcomes[2]).toEqual(outcomesToAdd[2])

  })

  test('a list of outcomes can be changed', async () => {
    const kidOutcomes = kid.outcomes.map(x => {
      return {
        outcomeId: x._id
      }
    })
    kidOutcomes.push({ outcome: 'touch' })
    kid.outcomes = kidOutcomes

    const response = await api.put(`/api/kid/${kid._id}/outcomes`)
      .send(kid)
      .expect(200)
    
    expect(response.body.outcomes).toHaveLength(4)
    const newOutcome = await Outcome.findById(response.body.outcomes[response.body.outcomes.length - 1])
    expect(newOutcome).toHaveProperty('outcome', 'touch')
    expect(newOutcome).toHaveProperty('_id')
  })

  test('expected response when getting outcomes for a nonexistant kid', async () => {
    const response = await api
      .get(`/api/kid/${idNotInDb}/outcomes`)
      .expect(404)
  })

  test('graceful when adding outcomes to nonexistant kid', async () => {
    const response = await api
    .put(`/api/kid/${idNotInDb}/outcomes`)
    .send({outcomes: outcomesToAdd})
    .expect(404)
  })
})

describe('with a kid with several exposures in the db', () => {
  let kidId = ''
  let outcomeId = ''
  const testExposures = [{    
    'food': 'squash',
    'description': 'roasted with salt',
  }, {    
    'food': 'beans',
    'description': 'canned',
  }]
  const idNotInDb = '65336ffee3700a6cd0040889'

  beforeAll(async () => {
    console.log('in beforeAll')
    await Kid.deleteMany({})

    const newOutcome = new Outcome({ outcome: 'smell' })
    const savedOutcomes = await newOutcome.save()
    outcomeId = savedOutcomes._id
    testExposures[0].outcome = outcomeId
    testExposures[1].outcome = outcomeId

    console.log('outcome created')

    const kid = new Kid({ 
      'name': 'Kid Name', 
      outcomes: [outcomeId] 
    })

    const savedKid = await kid.save()
    kidId = savedKid._id    

    console.log('kid created')

    const exposures = await Promise.all(
      testExposures.map(async (obj) => {
        return await new Exposure(obj).save()
      })
    )

    console.log('exposures inserted')

    await Kid.findByIdAndUpdate(kidId, {$push: {'exposures': exposures}}, {upsert: true})
  })

  test("the kid's exposures can be retrieved", async () => {
    const response = await api
      .get(`/api/kid/${kidId}/exposure`)
      .expect(200)
    expect(response.body)
    expect(response.body).toHaveLength(2)
  })

  test("getting a nonexistant kid's exposures works as expected", async () => {
    const response = await api
      .get(`/api/kid/${idNotInDb}/exposure`)
      .expect(404)
  })

  test("a new exposure can be added to the kid's exposures",  async() => {
    const newExposure = {
      'food': 'green beans', 
      'description': 'steamed',
      'outcome': outcomeId
    }

    const response = await api
      .post(`/api/kid/${kidId}/exposure`)
      .send(newExposure)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
    const kid = await Kid.findById(kidId).populate('exposures', { food: 1, description: 1, outcome: 1})
    
    const exposuresNoId = kid.exposures.map(x => {
      return {
        'food': x.food,
        'description': x.description,
        'outcome': outcomeId
      }
    })
    expect(exposuresNoId).toContainEqual(
      newExposure
    )
  })
})


describe('creating an exposure', () => {
  let kidId = ''
  let outcomeId = ''
  const idNotInDb = '65336ffee3700a6cd0040889'

  beforeAll(async () => {
    await Kid.deleteMany({})

    const newOutcome = new Outcome({ outcome: 'smell' })
    const savedOutcomes = await newOutcome.save()
    outcomeId = savedOutcomes._id

    const kid = new Kid({ 
      'name': 'Kid Name', 
      outcomes: [outcomeId] 
    })

    const savedKid = await kid.save()
    kidId = savedKid._id    
  })

  beforeEach(async () => {
    await Exposure.deleteMany({})
  })

  test('a new exposure can be added correctly', async () => {
    const newExposure = {
      'food': 'broccoli', 
      'description': 'roasted with salt',
    }

    await api
      .post(`/api/kid/${kidId}/exposure`)
      .send(newExposure)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const exposuresFromDB = await Exposure.find({})
    const exposures = exposuresFromDB.map(exposure => exposure.toJSON())
  
    const expectedExposureCount = 1
  
    expect(exposures).toHaveLength(expectedExposureCount)
  
    const exposuresNoId = exposures.map(x => {
      return {
        'food': x.food,
        'description': x.description,
      }
    })
    expect(exposuresNoId).toContainEqual(
      newExposure
    )
  })

  test('a new exposure will not be added to a nonexistant kid', async () => {
    const newExposure = {
      'food': 'broccoli', 
      'description': 'roasted with salt',
    }

    await api
      .post(`/api/kid/${idNotInDb}/exposure`)
      .send(newExposure)
      .expect(404)
  })

  test('a new exposure will default to the current date', async () => {
    const date = new Date()

    const newExposure = {
      'food': 'squash',
      'description': 'roasted with salt',
    }

    await api
      .post(`/api/kid/${kidId}/exposure`)
      .send(newExposure)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const exposuresFromDB = await Exposure.find({})
    const exposures = exposuresFromDB.map(exposure => exposure.toJSON())
  
    const recentExposure = exposures.filter(x => x.food === 'squash')[0]
    expect(recentExposure.date.getFullYear()).toEqual(
      date.getFullYear()
    )
    expect(recentExposure.date.getDate()).toEqual(
      date.getDate()
    )
    expect(recentExposure.date.getMonth()).toEqual(
      date.getMonth()
    )
  })

  // outcome here not specific to kid. No relationship between a kid's outcomes and the outcomes in their exposures
  test('a new exposure can be added with a outcome', async () => {
    const date = new Date()

    const newExposure = {
      'food': 'broccoli', 
      'description': 'roasted with salt',
      'outcome': outcomeId
    }

    await api
      .post(`/api/kid/${kidId}/exposure`)
      .send(newExposure)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const exposuresFromDB = await Exposure.find({})
    const exposures = exposuresFromDB.map(exposure => exposure.toJSON())
  
    const expectedExposureCount = 1
  
    expect(exposures).toHaveLength(expectedExposureCount)
    const exposuresNoId = exposures.map(x => {
      return {
        'food': x.food,
        'description': x.description,
        'outcome': x.outcome
      }
    })
    expect(exposuresNoId).toContainEqual(
      newExposure
    )
  })

  
})



afterAll(async () => {
  await mongoose.connection.close()
})







// a kid's list of outcomes can be retrieved

// a kid's list of outcomes can be updated