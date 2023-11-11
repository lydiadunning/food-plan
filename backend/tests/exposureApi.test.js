const { Outcome } = require('../models/outcome.js')
const Kid = require('../models/kid.js')
const Exposure = require('../models/exposure.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)


describe('with an exposure in the database', () => {
  const testExposure = {    
    'food': 'squash',
    'description': 'roasted with salt',
  }
  const idNotInDb = '65336ffee3700a6cd0040889'
  let id = ''

  beforeAll(async () => {
    await Exposure.deleteMany({})
    const exposure = new Exposure(testExposure)
    let id = await exposure.save()
  })
  test.only('the exposure can be retrieved', async () => {
    const response = await api
    .get(`/api/exposure`)
    .expect(200)
    
    expect(response.body)
    expect(response.body[0]).toHaveProperty('food', 'squash')
    expect(response.body[0]).toHaveProperty('description', 'roasted with salt')
    expect(response.body[0]).toHaveProperty('_id')

  })

  test('the exposure can be deleted', async () => {
    const response = await api
      .delete(`/api/exposure/`)
  })
  

  
  test('getting a nonexistant exposure will not cause problems', async () => {
    const response = await api
    .get(`/api/exposure/${idNotInDb}`)
    .expect(404)
  })

})




afterAll(async () => {
  await mongoose.connection.close()
})