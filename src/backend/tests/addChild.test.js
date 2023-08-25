
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
        'endDate': date.getDate(),
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


  // test('description', () => {
  //   const result = listHelper.totalLikes(listWithOneBlog)
  //   expect(result).toBe(5)
  // })


})