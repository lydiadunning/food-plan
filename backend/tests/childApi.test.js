const Child = require('../models/child.js')
const childRouter = require('../controllers/children.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const { Try, TryHintArray } = require('../models/try.js')
const Intro = require('../models/intro.js')
const child = require('../models/child.js')
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


describe('With no existing children', () => {

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

  test('a new child profile will not be added with no name', async () => {
    // const date = new Date()
    const newChild = {
    }
  
    await api
      .post('/api/child')
      .send(newChild)
      .expect(400)
     
    const childrenFromDB = await Child.find({})
  
    const expectedChildCount = 0
  
    expect(childrenFromDB).toHaveLength(expectedChildCount)
  
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

  test('a child query returns an empty array', async () => {
    const response = await api
      .get('/api/child')
      .expect(200)
    expect(response.body).toHaveLength(0)
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
  const idNotInDb = '65336ffee3700a6cd0040889'

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
    const response = await api
      .get('/api/child')
      .expect(200)

    expect(response.body)
    expect(response.body[0]).toHaveProperty('name')
  })

  test('a specific child profile can be returned', async () => {
    const response = await api
      .get(`/api/child/${childId}`)
      .expect(200)

    expect(response.body)
    expect(response.body).toHaveProperty('name', 'two')
  })

  
  test('getting a nonexistant child profile will not cause a problem', async () => {
    const response = await api
      .get(`/api/child/${idNotInDb}`)
      .expect(404)
  })

  test('the expected number of child profiles is returned', async () => {
    const response = await api.get('/api/child').expect(200)
    console.log(response.body)
    expect(response.body).toHaveLength(3)
  })

  test('updating a nonexistant child will not cause a problem', async () => {
    const newName = { 'name': '2' }
    const response = await api
      .put(`/api/child/${idNotInDb}`)
      .send(newName)
      .expect(404)
  })

  test('the correct profile can be deleted', async () => {
    const allProfiles = await api.get('/api/child')
    const children = allProfiles.body
    idToDelete = children[0]._id
    
    const response = await api
      .delete(`/api/child/${idToDelete}`)
      .expect(204)

    const childrenAtEnd = await Child.find({})
    const endChildren = childrenAtEnd.map(child => child.toJSON())
    expect(endChildren).not.toContain(children[0])
    expect(endChildren).toHaveLength(2)
  })

  test("behaves normally when deleting a nonexistant child", async () => {
    
    const response = await api
      .delete(`/api/child/${idNotInDb}`)
      .expect(204)

    const childrenAtEnd = await Child.find({})
    expect(childrenAtEnd).toHaveLength(3)
  })

  test('a list of tries can be added', async () => {
    const childInDb = await Child.findOne()
    const child = {     
      _id: childInDb._id,
      name: childInDb.name,
      intros: [],
      tries: [{ try: 'taste' }],
      __v: childInDb.__v
    }

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

  test('a child profile cannot be updated with invalid data', async () => {
    const intros = { intros: 'not supposed to be a string' }
    const response = await api
      .put(`/api/child/${childId}`)
      .send(intros)
      .expect(400)
  })

})

describe('With a child profile with tries', () => {
  let child = null
  const triesToAdd = [
    { try: "alpha" }, 
    { try: "beta" }, 
    { try: "gamma" }
  ]
  const idNotInDb = '65336ffee3700a6cd0040889'

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

      const responseTries = response.body.map(x => { 
        return {
          try: x.try
        }
      })
      expect(responseTries[0]).toEqual(triesToAdd[0])
      expect(responseTries[1]).toEqual(triesToAdd[1])
      expect(responseTries[2]).toEqual(triesToAdd[2])

  })

  test.only('a list of tries can be changed', async () => {
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
    expect(newTry).toHaveProperty('_id')
  })

  test('expected response when getting tries for a nonexistant child', async () => {
    const response = await api
      .get(`/api/child/${idNotInDb}/tries`)
      .expect(404)
  })

  test('graceful when adding tries to nonexistant child', async () => {
    const response = await api
    .put(`/api/child/${idNotInDb}/tries`)
    .send({tries: triesToAdd})
    .expect(404)
  })
})

describe('with a child with several intros in the db', () => {
  let childId = ''
  let tryId = ''
  const testIntros = [{    
    'food': 'squash',
    'description': 'roasted with salt',
  }, {    
    'food': 'beans',
    'description': 'canned',
  }]
  const idNotInDb = '65336ffee3700a6cd0040889'

  beforeAll(async () => {
    console.log('in beforeAll')
    await Child.deleteMany({})

    const newTry = new Try({ try: 'smell' })
    const savedTries = await newTry.save()
    tryId = savedTries._id
    testIntros[0].try = tryId
    testIntros[1].try = tryId

    console.log('try created')

    const child = new Child({ 
      'name': 'Child Name', 
      tries: [tryId] 
    })

    const savedChild = await child.save()
    childId = savedChild._id    

    console.log('child created')

    const intros = await Promise.all(
      testIntros.map(async (obj) => {
        return await new Intro(obj).save()
      })
    )

    console.log('intros inserted')

    await Child.findByIdAndUpdate(childId, {$push: {'intros': intros}}, {upsert: true})
  })

  test("the child's intros can be retrieved", async () => {
    const response = await api
      .get(`/api/child/${childId}/intro`)
      .expect(200)
    expect(response.body)
    expect(response.body).toHaveLength(2)
  })

  test("getting a nonexistant child's intros works as expected", async () => {
    const response = await api
      .get(`/api/child/${idNotInDb}/intro`)
      .expect(404)
  })

  test("a new intro can be added to the child's intros",  async() => {
    const newIntro = {
      'food': 'green beans', 
      'description': 'steamed',
      'try': tryId
    }

    const response = await api
      .post(`/api/child/${childId}/intro`)
      .send(newIntro)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
    const child = await Child.findById(childId).populate('intros', { food: 1, description: 1, try: 1})
    
    const introsNoId = child.intros.map(x => {
      return {
        'food': x.food,
        'description': x.description,
        'try': tryId
      }
    })
    expect(introsNoId).toContainEqual(
      newIntro
    )
  })
})


describe('creating an intro', () => {
  let childId = ''
  let tryId = ''
  const idNotInDb = '65336ffee3700a6cd0040889'

  beforeAll(async () => {
    await Child.deleteMany({})

    const newTry = new Try({ try: 'smell' })
    const savedTries = await newTry.save()
    tryId = savedTries._id

    const child = new Child({ 
      'name': 'Child Name', 
      tries: [tryId] 
    })

    const savedChild = await child.save()
    childId = savedChild._id    
  })

  beforeEach(async () => {
    await Intro.deleteMany({})
  })

  test('a new intro can be added correctly', async () => {
    const newIntro = {
      'food': 'broccoli', 
      'description': 'roasted with salt',
    }

    await api
      .post(`/api/child/${childId}/intro`)
      .send(newIntro)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const introsFromDB = await Intro.find({})
    const intros = introsFromDB.map(intro => intro.toJSON())
  
    const expectedIntroCount = 1
  
    expect(intros).toHaveLength(expectedIntroCount)
  
    const introsNoId = intros.map(x => {
      return {
        'food': x.food,
        'description': x.description,
      }
    })
    expect(introsNoId).toContainEqual(
      newIntro
    )
  })

  test('a new intro will not be added to a nonexistant child', async () => {
    const newIntro = {
      'food': 'broccoli', 
      'description': 'roasted with salt',
    }

    await api
      .post(`/api/child/${idNotInDb}/intro`)
      .send(newIntro)
      .expect(404)
  })

  test('a new intro will default to the current date', async () => {
    const date = new Date()

    const newIntro = {
      'food': 'squash',
      'description': 'roasted with salt',
    }

    await api
      .post(`/api/child/${childId}/intro`)
      .send(newIntro)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const introsFromDB = await Intro.find({})
    const intros = introsFromDB.map(intro => intro.toJSON())
  
    const recentIntro = intros.filter(x => x.food === 'squash')[0]
    expect(recentIntro.date.getFullYear()).toEqual(
      date.getFullYear()
    )
    expect(recentIntro.date.getDate()).toEqual(
      date.getDate()
    )
    expect(recentIntro.date.getMonth()).toEqual(
      date.getMonth()
    )
  })

  // try here not specific to child. No relationship between a child's tries and the tries in their intros
  test('a new intro can be added with a try', async () => {
    const date = new Date()

    const newIntro = {
      'food': 'broccoli', 
      'description': 'roasted with salt',
      'try': tryId
    }

    await api
      .post(`/api/child/${childId}/intro`)
      .send(newIntro)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const introsFromDB = await Intro.find({})
    const intros = introsFromDB.map(intro => intro.toJSON())
  
    const expectedIntroCount = 1
  
    expect(intros).toHaveLength(expectedIntroCount)
    const introsNoId = intros.map(x => {
      return {
        'food': x.food,
        'description': x.description,
        'try': x.try
      }
    })
    expect(introsNoId).toContainEqual(
      newIntro
    )
  })

  
})



afterAll(async () => {
  await mongoose.connection.close()
})







// a child's list of tries can be retrieved

// a child's list of tries can be updated