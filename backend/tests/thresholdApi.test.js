import { Threshold, SystemThreshold } from '../thresholds'

// system threshold operations: can delay for later version - these are not interactive

// create SystemThresholds 
// get all system thresholds
// add a system threshold - delay
// remove a system threshold - delay

// threshold operations
// get all current thresholds? revisit data model.

const Child = require('../models/child.js')
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


describe('System Thresholds', () => {

  beforeEach(async () => {
    await SystemThreshold.deleteMany({})
  })

  test('a new System Threshold can be added to the database', async () => {
    await api
      .post('/api/child')
      .send({threshold: 'one'})
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    console.log('api call complete')
  
    const systemThresholdsFromDb = await SystemThreshold.find({})
    const systemThresholds = systemThresholdsFromDb.map(sT => sT.toJSON())
    
    expect(systemThresholds).toHaveLength(1)
    expect(systemThresholds).toHaveProperty('threshold', 'one')
  }) 
})

// describe('Whith child profiles in the database', () => {

//   beforeAll(async () => {
//     await Child.deleteMany({})
//     const children = [
//       {
//         'name': 'one'
//       },
//       {
//         'name': 'two'
//       },
//       {
//         'name': 'three'
//       }
//     ]

//     const childObjects = children
//       .map(child => new Child(child))
//     await childObjects.forEach(child => child.save())
//   })

//   test('a list of child profiles can be returned', async () => {
//       const response = await api.get('/api/child').expect(200)
//       expect(response.body)
//       expect(response.body[0])
//   })

//   test('the expected number of child profiles is returned', async () => {
//     const response = await api.get('/api/child').expect(200)
//     expect(response.body).toHaveLength(3)
//   })

//   test('the correct profile can be deleted', async () => {
//     const allProfiles = await api.get('/api/child')
//     const children = allProfiles.body
//     idToDelete = children[0]._id
//     const response = await api.delete(`/api/child/${idToDelete}`)
//       .expect(204)

//     const childrenAtEnd = await Child.find({})
//     const endChildren = childrenAtEnd.map(child => child.toJSON())
//     expect(endChildren).not.toContain(children[0])
//     expect(endChildren).toHaveLength(2)
//   })

  
// })



afterAll(async () => {
  await mongoose.connection.close()
})