import Child from '../model.js'

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
 */


describe('Creating a child profile', () => {

  test('a new child profile can be added correctly', async () => {
    const date = new Date()
    const newChild = {
      'name': 'Bess Borgington',
      'thresholds': [
        'pick up with a fork', 
        'smell', 
        'touch', 
        'lick', 
        'place in mouth'
      ],
      'goal': {
        description: 'Serve beans every day',
        'endDate': date.getDate(), // adds the current date for testing purposes. 
        success: 0
      }
    }
  
    await api
      .post('/api/childProfiles')
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
      const response = await api.get('/api/childProfiles').expect(200)
      expect(response.body)
  })

  test('the expected number of child profiles is returned', async () => {
    const response = await api.get('/api/childProfiles').expect(200)
    expect(response.body).toHaveLength(2)
  })

  test('the correct profile can be deleted', async () => {
    const children = await api.get('/api/childProfiles')
    idToDelete = children[0].id
    const response = await api.delete(`/api/childProfiles/${idToDelete}`)
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