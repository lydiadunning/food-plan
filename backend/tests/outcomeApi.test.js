const { Outcome, OutcomeTipArray } = require('../models/outcome.js')

// outcome hint operations: can delay for later version - these are not interactive

// create OutcomeTips 
// get all outcome hints
// add a outcome hint - delay
// remove a outcome hint - delay

// outcome operations
// get all current tries? revisit data model.

const outcomeRouter = require('../controllers/outcomes.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
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
 * a kid's tries can be changed to add a new outcomeTip
 * a kid's tries can be changed to remove a outcomeTip
 *  * a kid's tries can be changed to add a new outcome string
 * a kid's tries can be changed to remove a outcome string
 * a kid's outcome returns a mix of outcomeTips and tries correctly and in the expected order
 * a kid's tries can be re-ordered
 * trying to update a profile that doesn't exist won't work
 * trying to delete a profile that doesn't exist works
 */

/**
 * Outcome tests
 */

describe('When Tries are in the database', () => {
  const outcomeArray = [
    { outcome: 'one', active: true },
    { outcome: 'two', active: false },
  ]
  let outcomeIds = []
  const [activeOutcome, inactiveOutcome] = outcomeIds
  beforeAll(async () => {
    await Outcome.deleteMany({})
    tries = await Outcome.insertMany(outcomeArray)
    outcomeIds = tries.map(x => x._id.toString())
  })

  test('all tries can be retrieved correctly', async () => {
    const response = await api
      .get('/api/outcome')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    console.log(response.body)

    expect(response.body).toHaveLength(2)
    expect(response.body[0]).toHaveProperty('_id')
    expect(response.body[1]).toHaveProperty('_id')
    const noIds = response.body.map(x => {
      return {
        outcome: x.outcome,
        active: x.active
      }
    })
    expect(noIds).toContainEqual(outcomeArray[0])
    expect(noIds).toContainEqual(outcomeArray[1])

  })

  test('a outcome can be retrieved by id', async () => {
    const [activeOutcome, inactiveOutcome] = outcomeIds
    console.log('outcomeIds', outcomeIds)
    console.log('activeOutcome', activeOutcome, `/api/outcome/${activeOutcome}`)
    const response = await api
      .get(`/api/outcome/${activeOutcome}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    console.log(response.body)

    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('outcome', 'one')
    expect(response.body).toHaveProperty('active', true)
  })

  test('deleting a outcome marks it inactive', async () => {
    const [activeOutcome, inactiveOutcome] = outcomeIds

    const response1 = await api
      .delete(`/api/outcome/${activeOutcome}`)
      .expect(204)
    
    const response2 = await api
      .delete(`/api/outcome/${inactiveOutcome}`)
      .expect(204)
    
    const delActiveOutcome = await Outcome.findById(activeOutcome)
    console.log('delActiveOutcome', delActiveOutcome)
    expect(delActiveOutcome).toHaveProperty('active', false)
    const delInactiveOutcome = await Outcome.findById(inactiveOutcome)
    expect(delInactiveOutcome).toHaveProperty('active', false)
  })
})

/**
 * Outcome Tip tests
 */

describe('When no Outcome Tips are in the database', () => {
  beforeAll(async () => {
    await Outcome.deleteMany({})
    await OutcomeTipArray.deleteMany({})
  })

  test('an array of new Outcome Tips can be added', async () => {
    const response = await api
      .post('/api/outcome-hint')
      .send(['one', 'two', 'three'])
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const outcomeArrayFromDb = await OutcomeTipArray.findOne().populate('tries', {outcome: 1, _id: 1})

    const outcomeArray = outcomeArrayFromDb.tries

    expect(outcomeArray).toHaveLength(3)
    expect(outcomeArray[0]).toHaveProperty('outcome', 'one')
  }) 


  // test('deleting outcome hints removes the array and all tries', )
})
// after these tests, the tries added remain in the database. 

describe('When OutcomeTipArray is in the database', () => {
  beforeAll(async () => {
    await OutcomeTipArray.deleteMany({})

    const newTries = await Outcome.insertMany([{ 'outcome': 'one' }, { 'outcome': 'two' }, { 'outcome': 'three' }])
    // add the array to db
    const outcomeArray = new OutcomeTipArray({
      tries: newTries.map(result => result._id)
    })
    const finalResult = await outcomeArray.save()
    const allTh = await OutcomeTipArray.find()
  })

  test('Outcome Tips can be retrieved from the database', async () => {
    const response = await api 
      .get('/api/outcome-hint')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      console.log(response.body)
    expect(response.body).toHaveProperty('_id')
    expect(response.body.tries).toHaveLength(3)
    expect(response.body.tries[1]).toHaveProperty('outcome', 'two')
    expect(response.body.tries[1]).toHaveProperty('_id')
  })

  test('a second OutcomeTipArray cannot be added', async () => {
    await api
      .post('/api/outcome-hint')
      .send(['four', 'five', 'six'])
      .expect(409)
  
    const outcomeTips = await OutcomeTipArray.findOne({}).populate('tries')
    expect(outcomeTips.tries[0]).toHaveProperty('outcome', 'one')
  })
  
})

afterAll(async () => {
  console.log('closing connection')
  await mongoose.connection.close()
})