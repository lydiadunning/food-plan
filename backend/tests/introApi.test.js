const { Try } = require('../models/try.js')
const Child = require('../models/child.js')
const Intro = require('../models/intro.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)


describe('with an intro in the database', () => {
  const testIntro = {    
    'food': 'squash',
    'description': 'roasted with salt',
  }
  const idNotInDb = '65336ffee3700a6cd0040889'
  let id = ''

  beforeAll(async () => {
    await Intro.deleteMany({})
    const intro = new Intro(testIntro)
    let id = await intro.save()
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

  test('the intro can be deleted', async () => {
    const response = await api
      .delete(`/api/intro/`)
  })
  

  
  test('getting a nonexistant intro will not cause problems', async () => {
    const response = await api
    .get(`/api/intro/${idNotInDb}`)
    .expect(404)
  })

})




afterAll(async () => {
  await mongoose.connection.close()
})