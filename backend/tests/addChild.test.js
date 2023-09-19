const Child = require('../models/child.js')
const childRouter = require('../controllers/children.js')
const mongoose = require('mongoose')
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


describe('Creating a child profile', () => {
  test('a new child profile can be added correctly', async () => {
    const date = new Date()
    const newChild = {
      'name': 'Bess Borgington',
      'thresholds': [
      ],
    }
  
    await api
      .post('/api/child')
      .send(newChild)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const childrefFromDB = await Child.find({})
    const children = childrefFromDB.map(child => child.toJSON())
  
    const expectedChildCount = 3
  
    expect(children).toHaveLength(expectedChildCount)
  
    const childrenNoId = children.map(x => {
      return {
        'name': x.name,
        'thresholds': x.thresholds,
        'goal': x.goal
      }
    })
    expect(childrenNoId).toContainEqual(
      newChild
    )
  }) 

  test('a list of child profiles can be returned', async () => {
      const response = await api.get('/api/child').expect(200)
      expect(response.body)
  })

  test('the expected number of child profiles is returned', async () => {
    const response = await api.get('/api/child').expect(200)
    expect(response.body).toHaveLength(2)
  })

  test('the correct profile can be deleted', async () => {
    const children = await api.get('/api/childProfiles')
    idToDelete = children[0].id
    const response = await api.delete(`/api/child/${idToDelete}`)
      .expect(204)

    const childrenAtEnd = await Child.find({})
    const endChildren = childrenAtEnd.map(child => child.toJSON())
    expect(endChildren).not.toContain(children[0])

  })


  // test('description', () => {
  //   const result = listHelper.totalLikes(listWithOneBlog)
  //   expect(result).toBe(5)
  // })


})