const { Threshold, ThresholdHintArray } = require('../models/threshold.js')

// threshold hint operations: can delay for later version - these are not interactive

// create ThresholdHints 
// get all threshold hints
// add a threshold hint - delay
// remove a threshold hint - delay

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
 * a child's thresholds can be changed to add a new thresholdHint
 * a child's thresholds can be changed to remove a thresholdHint
 *  * a child's thresholds can be changed to add a new threshold string
 * a child's thresholds can be changed to remove a threshold string
 * a child's threshold returns a mix of thresholdHints and thresholds correctly and in the expected order
 * a child's thresholds can be re-ordered
 * trying to update a profile that doesn't exist won't work
 * trying to delete a profile that doesn't exist works
 */

describe('When no Threshold Hints are in the database', () => {
  beforeAll(async () => {
    await ThresholdHintArray.deleteMany({})
  })

  test('an array of new Threshold Hints can be added', async () => {
    const response = await api
      .post('/api/threshold/hints')
      .send(['one', 'two', 'three'])
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const thresholdArrayFromDb = await ThresholdHintArray.findOne().populate('thresholds', {threshold: 1, _id: 1})

    const thresholdArray = thresholdArrayFromDb.thresholds

    expect(thresholdArray).toHaveLength(3)
    expect(thresholdArray[0]).toHaveProperty('threshold', 'one')
  }) 


  // test('deleting threshold hints removes the array and all thresholds', )
})
// after these tests, the thresholds added remain in the database. 

describe('When ThresholdHintArray is in the database', () => {
  beforeAll(async () => {
    await ThresholdHintArray.deleteMany({})

    const newThresholds = await Threshold.insertMany([{ 'threshold': 'one' }, { 'threshold': 'two' }, { 'threshold': 'three' }])
    // add the array to db
    const thresholdArray = new ThresholdHintArray({
      thresholds: newThresholds.map(result => result._id)
    })
    const finalResult = await thresholdArray.save()
    const allTh = await ThresholdHintArray.find()
  })
  test('Threshold Hints can be retrieved from the database', async () => {
    const response = await api 
      .get('/api/threshold/hints')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveProperty('_id')
    expect(response.body.thresholds).toHaveLength(3)
    expect(response.body.thresholds[1]).toHaveProperty('threshold', 'two')
    expect(response.body.thresholds[1]).toHaveProperty('_id')
  })

  test('a second ThresholdHintArray cannot be added', async () => {
    await api
      .post('/api/threshold/hints')
      .send(['four', 'five', 'six'])
      .expect(400)
  
    const thresholdHints = await ThresholdHintArray.findOne({}).populate('thresholds')
    expect(thresholdHints.thresholds[0]).toHaveProperty('threshold', 'one')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})