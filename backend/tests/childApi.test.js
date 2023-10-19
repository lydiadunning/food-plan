const Child = require('../models/child.js')
const childRouter = require('../controllers/children.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const { Threshold, ThresholdHintArray } = require('../models/threshold.js')
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


describe('Creating a child profile', () => {

  beforeEach(async () => {
    await Child.deleteMany({})
  })

  test('a new child profile can be added correctly', async () => {
    // const date = new Date()
    const newChild = {
      'name': 'Bess Borgington',
    }
  
    await api
      .post('/api/child')
      .send(newChild)
      .expect(201)
      .expect('Content-Type', /application\/json/)
     
    const childrenFromDB = await Child.find({})
    const children = childrenFromDB.map(child => child.toJSON())
  
    const expectedChildCount = 1
  
    expect(children).toHaveLength(expectedChildCount)
  
    const childrenNoId = children.map(x => {
      return {
        'name': x.name,
      }
    })
    expect(childrenNoId).toContainEqual(
      newChild
    )
  }) 

  test('a new child profile can be added with threshold strings', async () => {
      
    const newChild = {
      'name': 'Bess Borgington',
      'thresholds': [
        { threshold: "alpha" }, 
        { threshold: "beta" }, 
        { threshold: "gamma" }
      ]
    }
  
    await api
      .post('/api/child')
      .send(newChild)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const childrenFromDB = await Child.find({})
    const children = childrenFromDB.map(child => child.toJSON())
  
    expect(children[0]).toHaveProperty('thresholds')
    expect(children[0].thresholds).toHaveLength(3)
  })
})

//may flesh this out later
describe('With Threshold hints from the database', () => {
  let recievedThresholds = []
  let sentThresholds = []
  beforeAll(async () => {
    await Child.deleteMany({})

    let thresholdHintArray = await ThresholdHintArray.findOne({})
    if (!thresholdHintArray) {
      thresholdHintArray = await api
      .post('/api/threshold/hints')
      .send(['one', 'two', 'three'])
    }

    recievedThresholds = thresholdHintArray.thresholds
    sentThresholds = thresholdHintArray.thresholds.map(x => {
      return {thresholdId: x}
    })
  })

  test('a new child profile can use threshold hints', async () => {
    const newChild = {
      'name': 'Bess Borgington',
      'thresholds': sentThresholds
    }
  
    await api
      .post('/api/child')
      .send(newChild)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
    const childrenFromDB = await Child.find({})
    const children = childrenFromDB.map(child => child.toJSON())
  
    const childrenNoId = children.map(x => {
      return {
        'name': x.name,
        'thresholds': x.thresholds
      }
    })
    expect(childrenNoId).toContainEqual(
      {
        'name': 'Bess Borgington',
        'thresholds': recievedThresholds
      }
    )
  }) 
})
 

describe('With child profiles in the database', () => {

  beforeEach(async () => {
    await Child.deleteMany({})
    const children = [
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
    const childObjects = children
      .map(child => new Child(child))
    const childIds = await childObjects.forEach(async child => await child.save())
  })

  test('a list of child profiles can be returned', async () => {
      const response = await api.get('/api/child').expect(200)
      expect(response.body)
      expect(response.body[0]).toHaveProperty('name')
  })

  test('the expected number of child profiles is returned', async () => {
    const response = await api.get('/api/child').expect(200)
    expect(response.body).toHaveLength(3)
  })

  test('the correct profile can be deleted', async () => {
    const allProfiles = await api.get('/api/child')
    const children = allProfiles.body
    idToDelete = children[0]._id
    
    const response = await api.delete(`/api/child/${idToDelete}`)
      .expect(204)

    const childrenAtEnd = await Child.find({})
    const endChildren = childrenAtEnd.map(child => child.toJSON())
    expect(endChildren).not.toContain(children[0])
    expect(endChildren).toHaveLength(2)
  })

  test.only('a list of thresholds can be added', async () => {
    const allProfiles = await api.get('/api/child')
    const child = allProfiles.body[0]
    child.thresholds = [{ threshold: 'taste' }]

    const response = await api.put(`/api/child/thresholds/${child._id}`)
      .send(child)
      .expect(200)
    
    console.log('response', response.body)
    expect(response.body.thresholds).toHaveLength(1)
    const newThreshold = await Threshold.findById(response.body.thresholds[0])
    expect(newThreshold).toHaveProperty('threshold', 'taste')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

// a child's list of thresholds can be retrieved

// a child's list of thresholds can be updated