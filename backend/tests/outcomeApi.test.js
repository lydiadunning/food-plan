const OutcomeTipArray = require('../models/outcomeTipArray.js')

// outcome hint operations: can delay for later version - these are not interactive

// create OutcomeTips 
// get all outcome hints
// add a outcome hint - delay
// remove a outcome hint - delay

// outcome operations
// get all current tries? revisit data model.

const outcomeRouter = require('../controllers/outcomeTips.js')
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
 * after a kid has entryductions, an update to the kid's profile does not alter the entryduction history
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
    { outcome: 'one' },
    { outcome: 'two' },
  ]
  let outcomeIds = []
  beforeAll(async () => {
    await OutcomeTipArray.deleteMany({})
    const outcomeTips = new OutcomeTipArray({
      outcomeTips: outcomeArray
    })
    await outcomeTips.save()
  })

  test('all outcome tips can be retrieved correctly', async () => {
    const response = await api
      .get('/api/outcometips')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const tips = response.body.outcomeTips

    expect(tips).toHaveLength(2)
    expect(tips[0]).toHaveProperty('id')
    expect(tips[1]).toHaveProperty('id')
    const noIds = tips.map(x => {
      return {
        outcome: x.outcome,
      }
    })
    expect(noIds).toContainEqual(outcomeArray[0])
    expect(noIds).toContainEqual(outcomeArray[1])

  })
})

/**
 * Outcome Tip tests
 */

describe('When no Outcome Tips are in the database', () => {
  beforeAll(async () => {
    await OutcomeTipArray.deleteMany({})
  })

  test('new Outcome Tips can be added', async () => {
    const response = await api
      .post('/api/outcometips')
      .send({ outcomeTips: [{outcome: 'one'}, {outcome: 'two'}, {outcome: 'three'}] })
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const outcomeArrayFromDb = await OutcomeTipArray.findOne().populate('outcomeTips', {outcome: 1})

    const outcomeArray = outcomeArrayFromDb.outcomeTips

    expect(outcomeArray).toHaveLength(3)
    expect(outcomeArray[0]).toHaveProperty('outcome', 'one')
  }) 

})

afterAll(async () => {
  console.log('closing connection')
  await mongoose.connection.close()
})