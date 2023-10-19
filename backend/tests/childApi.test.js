const Child = require('../models/child.js')
const childRouter = require('../controllers/children.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const { Try, TryHintArray } = require('../models/try.js')
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
 * a child's tries can be changed to add a new systemTry
 * a child's tries can be changed to remove a systemTry
 *  * a child's tries can be changed to add a new try string
 * a child's tries can be changed to remove a try string
 * a child's try returns a mix of systemTries and tries correctly and in the expected order
 * a child's tries can be re-ordered
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

  test('a new child profile can be added with try strings', async () => {
      
    const newChild = {
      'name': 'Bess Borgington',
      'tries': [
        { try: "alpha" }, 
        { try: "beta" }, 
        { try: "gamma" }
      ]
    }
  
    await api
      .post('/api/child')
      .send(newChild)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const childrenFromDB = await Child.find({})
    const children = childrenFromDB.map(child => child.toJSON())
  
    expect(children[0]).toHaveProperty('tries')
    expect(children[0].tries).toHaveLength(3)
  })
})

//may flesh this out later
describe('With Try hints from the database', () => {
  let recievedTries = []
  let sentTries = []
  beforeAll(async () => {
    await Child.deleteMany({})

    let tryHintArray = await TryHintArray.findOne({})
    if (!tryHintArray) {
      tryHintArray = await api
      .post('/api/try/hints')
      .send(['one', 'two', 'three'])
    }

    recievedTries = tryHintArray.tries
    sentTries = tryHintArray.tries.map(x => {
      return {tryId: x}
    })
  })

  test('a new child profile can use try hints', async () => {
    const newChild = {
      'name': 'Bess Borgington',
      'tries': sentTries
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
        'tries': x.tries
      }
    })
    expect(childrenNoId).toContainEqual(
      {
        'name': 'Bess Borgington',
        'tries': recievedTries
      }
    )
  }) 
})
 

describe('With child profiles in the database', () => {
  let childId = ''
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
    const childObjects = await Child.insertMany(children)
    childId = childObjects[1]._id
  })

  test('a list of child profiles can be returned', async () => {
    const response = await api.get('/api/child').expect(200)
    expect(response.body)
    expect(response.body[0]).toHaveProperty('name')
  })

  test('a specific child profile can be returned', async () => {
    const response = await api.get(`/api/child/${childId}`).expect(200)
    expect(response.body)
    expect(response.body).toHaveProperty('name', 'two')
  })

  test('the expected number of child profiles is returned', async () => {
    const response = await api.get('/api/child').expect(200)
    console.log(response.body)
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

  test('a list of tries can be added', async () => {
    const allProfiles = await api.get('/api/child')
    const child = allProfiles.body[0]
    child.tries = [{ try: 'taste' }]

    const response = await api.put(`/api/child/${child._id}/tries`)
      .send(child)
      .expect(200)
    
    expect(response.body.tries).toHaveLength(1)
    const newTry = await Try.findById(response.body.tries[0])
    expect(newTry).toHaveProperty('try', 'taste')
  })

  test('a child profile can be updated', async () => {
    const newName = { 'name': '2' }
    const response = await api
      .put(`/api/child/${childId}`)
      .send(newName)
      .expect(200)
    expect(response.body)
    expect(response.body).toHaveProperty('name', '2')
  })

})

describe('With a child profile with tries', () => {
  let child = null
  const triesToAdd = [
    { try: "alpha" }, 
    { try: "beta" }, 
    { try: "gamma" }
  ]
  beforeEach(async () => {
    const newChild = {
      'name': 'Ron Rees',
      'tries': triesToAdd
    }
  
    const response = await api
      .post('/api/child')
      .send(newChild)
    
    child = response.body
  })

  test("the child's list of tries can be returned in order", async () => {
    const response = await api
      .get(`/api/child/${child._id}/tries`)
      .expect(200)
      console.log(response.body)
      const responseTries = response.body.map(x => { 
        return {
          try: x.try
        }
      })
      expect(responseTries[0]).toEqual(triesToAdd[0])
      expect(responseTries[1]).toEqual(triesToAdd[1])
      expect(responseTries[2]).toEqual(triesToAdd[2])

  })

  test('a list of tries can be changed', async () => {
    const childTries = child.tries.map(x => {
      return {
        tryId: x._id
      }
    })
    childTries.push({ try: 'touch' })
    child.tries = childTries

    const response = await api.put(`/api/child/${child._id}/tries`)
      .send(child)
      .expect(200)
    
    expect(response.body.tries).toHaveLength(4)
    const newTry = await Try.findById(response.body.tries[response.body.tries.length - 1])
    expect(newTry).toHaveProperty('try', 'touch')
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})

// a child's list of tries can be retrieved

// a child's list of tries can be updated