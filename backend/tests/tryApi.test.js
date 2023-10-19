const { Try, TryHintArray } = require('../models/try.js')

// try hint operations: can delay for later version - these are not interactive

// create TryHints 
// get all try hints
// add a try hint - delay
// remove a try hint - delay

// try operations
// get all current tries? revisit data model.

const tryRouter = require('../controllers/tries.js')
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
 * a child's tries can be changed to add a new tryHint
 * a child's tries can be changed to remove a tryHint
 *  * a child's tries can be changed to add a new try string
 * a child's tries can be changed to remove a try string
 * a child's try returns a mix of tryHints and tries correctly and in the expected order
 * a child's tries can be re-ordered
 * trying to update a profile that doesn't exist won't work
 * trying to delete a profile that doesn't exist works
 */

describe('When no Try Hints are in the database', () => {
  beforeAll(async () => {
    await Try.deleteMany({})
    await TryHintArray.deleteMany({})
  })

  test('an array of new Try Hints can be added', async () => {
    const response = await api
      .post('/api/try/hints')
      .send(['one', 'two', 'three'])
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const tryArrayFromDb = await TryHintArray.findOne().populate('tries', {try: 1, _id: 1})

    const tryArray = tryArrayFromDb.tries

    expect(tryArray).toHaveLength(3)
    expect(tryArray[0]).toHaveProperty('try', 'one')
  }) 


  // test('deleting try hints removes the array and all tries', )
})
// after these tests, the tries added remain in the database. 

describe('When TryHintArray is in the database', () => {
  beforeAll(async () => {
    await TryHintArray.deleteMany({})

    const newTries = await Try.insertMany([{ 'try': 'one' }, { 'try': 'two' }, { 'try': 'three' }])
    // add the array to db
    const tryArray = new TryHintArray({
      tries: newTries.map(result => result._id)
    })
    const finalResult = await tryArray.save()
    const allTh = await TryHintArray.find()
  })
  test('Try Hints can be retrieved from the database', async () => {
    const response = await api 
      .get('/api/try/hints')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveProperty('_id')
    expect(response.body.tries).toHaveLength(3)
    expect(response.body.tries[1]).toHaveProperty('try', 'two')
    expect(response.body.tries[1]).toHaveProperty('_id')
  })

  test('a second TryHintArray cannot be added', async () => {
    await api
      .post('/api/try/hints')
      .send(['four', 'five', 'six'])
      .expect(400)
  
    const tryHints = await TryHintArray.findOne({}).populate('tries')
    expect(tryHints.tries[0]).toHaveProperty('try', 'one')
  })
  
})

afterAll(async () => {
  console.log('closing connection')
  await mongoose.connection.close()
})