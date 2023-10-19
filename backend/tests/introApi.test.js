const { Threshold } = require('../models/threshold.js')
const Child = require('../models/child.js')
const Intro = require('../models/intro.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)


describe('creating an intro', () => {
  let childId = ''
  let thresholdId = ''

  beforeAll(async () => {
    await Child.deleteMany({})

    const threshold = new Threshold({ threshold: 'smell' })
    const savedThreshold = await threshold.save()
    thresholdId = savedThreshold._id

    const child = new Child({ 
      'name': 'Child Name', 
      thresholds: [thresholdId] 
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

  // threshold here not specific to child.
  test('a new intro can be added with a threshold', async () => {
    const date = new Date()

    const newIntro = {
      'food': 'broccoli', 
      'description': 'roasted with salt',
      'thresholdPassed': thresholdId
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
        'thresholdPassed': x.thresholdPassed
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
      'threshold': thresholdId
    }

    const response = await api
      .post(`/api/intro/${childId}`)
      .send(newIntro)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
    const child = await Child.findById(childId).populate('intros', { food: 1, description: 1, threshold: 1})
    
    const introsNoId = child.intros.map(x => {
      return {
        'food': x.food,
        'description': x.description,
        'threshold': thresholdId
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