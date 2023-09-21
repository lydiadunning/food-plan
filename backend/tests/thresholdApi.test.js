const { Threshold, SystemThreshold, SystemThresholdArray } = require('../models/thresholds.js')

// system threshold operations: can delay for later version - these are not interactive

// create SystemThresholds 
// get all system thresholds
// add a system threshold - delay
// remove a system threshold - delay

// threshold operations
// get all current thresholds? revisit data model.

const thresholdRouter = require('../controllers/thresholds.js')
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
 * after a child has introductions, an update to the child's profile does not alter the introduction history
 * a child's thresholds can be changed to add a new systemThreshold
 * a child's thresholds can be changed to remove a systemThreshold
 *  * a child's thresholds can be changed to add a new threshold string
 * a child's thresholds can be changed to remove a threshold string
 * a child's threshold returns a mix of systemThresholds and thresholds correctly and in the expected order
 * a child's thresholds can be re-ordered
 * trying to update a profile that doesn't exist won't work
 * trying to delete a profile that doesn't exist works
 */

describe('System Thresholds can be added once', () => {
  beforeAll(async () => {
    await SystemThreshold.deleteMany({})
    await SystemThresholdArray.deleteMany({})
  })

  test('an array of new System Thresholds can be added to the database', async () => {
    await api
      .post('/api/threshold/system')
      .send(['one', 'two', 'three'])
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    console.log('api call complete')
  
    const systemThresholdsFromDb = await SystemThreshold.find({})
    const systemThresholds = systemThresholdsFromDb.map(sT => sT.toJSON())
    
    expect(systemThresholds).toHaveLength(3)
    expect(systemThresholds[0]).toHaveProperty('threshold', 'one')
  }) 

  test('and retrieved from the database', async () => {
    const response = await api 
      .get('/api/threshold/system')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveProperty('_id')
    expect(response.body.thresholds).toHaveLength(3)
    expect(response.body.thresholds[1]).toHaveProperty('threshold', 'two')
    expect(response.body.thresholds[1]).toHaveProperty('_id')
  })

  test('a second systemThresholdArray cannot be added', async () => {
    await api
      .post('/api/threshold/system')
      .send(['four', 'five', 'six'])
      .expect(400)
  
    console.log('api call complete')
    const systemThresholds = await SystemThresholdArray.findOne({}).populate('thresholds', {threshold: 1, _id: 1})
    expect(systemThresholds.thresholds[0]).toHaveProperty('threshold', 'one')
  })

  test('deleting system thresholds removes the array and all thresholds', )
})
// after these tests, the thresholds added remain in the database. 


afterAll(async () => {
  await mongoose.connection.close()
})