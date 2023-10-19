const { Try } = require('../models/try.js')
const Child = require('../models/child.js')
const Intro = require('../models/intro.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)


describe('creating an intro', () => {
  let childId = ''
  let tryId = ''

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
      .post(`/api/intro/${childId}`)
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

  test('a new intro will default to the current date', async () => {
    const date = new Date()

    const newIntro = {
      'food': 'squash',
      'description': 'roasted with salt',
    }

    await api
      .post(`/api/intro/${childId}`)
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

  // try here not specific to child.
  test('a new intro can be added with a try', async () => {
    const date = new Date()

    const newIntro = {
      'food': 'broccoli', 
      'description': 'roasted with salt',
      'try': tryId
    }

    await api
      .post(`/api/intro/${childId}`)
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

  test("a new intro is added to the child's intros",  async() => {
    const newIntro = {
      'food': 'green beans', 
      'description': 'steamed',
      'try': tryId
    }

    const response = await api
      .post(`/api/intro/${childId}`)
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

describe('with an intro in the database', () => {
  const testIntro = {    
    'food': 'squash',
    'description': 'roasted with salt',
  }
  beforeAll(async () => {
    await Intro.deleteMany({})
    const intro = new Intro(testIntro)
    await intro.save()
  })
  test('the intro can be retrieved', async () => {
    const response = await api
    .get(`/api/intro`)
    .expect(200)
    
    expect(response.body)
    expect(response.body[0]).toHaveProperty('food', 'squash')
    expect(response.body[0]).toHaveProperty('description', 'roasted with salt')
    expect(response.body[0]).toHaveProperty('_id')

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
      .get(`/api/intro/${childId}`)
      .expect(200)
    expect(response.body)
    expect(response.body).toHaveLength(2)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})