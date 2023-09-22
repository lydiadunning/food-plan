const Child = require('../models/child.js')
const childRouter = require('../controllers/children.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const { SystemThresholdArray } = require('../models/thresholds.js')
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
    
    console.log('api call complete')
  
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

  test('a new child profile can be added with custom thresholds', async () => {
      
    const newChild = {
      'name': 'Bess Borgington',
      'thresholds': ["alpha", "beta", "gamma"]
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
      newChild
    )
  })
})

describe('With SystemThresholds in the database', () => {

  beforeAll(async () => {
    await Child.deleteMany({})

    const hasSystemThresholds = await SystemThresholdArray.findOne({})
    if (!hasSystemThresholds) {
      await api
      .post('/api/threshold/system')
      .send(['one', 'two', 'three'])
    }
  })

  test.only('a new child profile can be added with system thresholds', async () => {
    const systemThresholds = await SystemThresholdArray.findOne({}).populate('thresholds', {threshold: 1, _id: 1})  
    console.log('systemThresholds', systemThresholds)
    
    const newChild = {
      'name': 'Bess Borgington',
      'thresholds': [systemThresholds.thresholds[0]._id, systemThresholds.thresholds[2]._id]
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

    console.log('newChild', newChild, 'childrenNoId', childrenNoId)

    expect(childrenNoId).toContainEqual(
      newChild
    )
  })
})
 

describe('With child profiles in the database', () => {

  beforeAll(async () => {
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
    await childObjects.forEach(child => child.save())
  })

  test('a list of child profiles can be returned', async () => {
      const response = await api.get('/api/child').expect(200)
      expect(response.body)
      expect(response.body[0])
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
})

afterAll(async () => {
  await mongoose.connection.close()
})