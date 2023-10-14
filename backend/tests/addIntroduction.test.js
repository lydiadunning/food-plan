// import Introduction from '../model'

// describe('creating an introduction', () => {
//   test('a new introduction can be added correctly', async () => {
//     const date = new Date()

//     const newIntro = {
//       'ingredient': 'broccoli',
//       'description': 'roasted with salt',
//       'thresholdPassed': 'touch with fork',
//       'child': 'Tim',
//       'date': date.getDate()
//     }

//     await api
//       .post('/api/newintroduction')
//       .send(newIntro)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
  
//     const introsFromDB = await Introduction.find({})
//     const introductions = introsFromDB.map(intro => intro.toJSON())
  
//     const expectedIntroCount = 3
  
//     expect(introductions).toHaveLength(expectedIntroCount)
  
//     const introsNoId = introductions.map(x => {
//       return {
//         'ingredient': x.ingredient,
//         'description': x.description,
//         'thresholdPassed': x.thresholdPassed,
//         'date': x.date
//       }
//     })
//     expect(introsNoId).toContainEqual(
//       newIntro
//     )
//   })

//   test('a new introduction will default to the current date', async () => {
//     const date = new Date()

//     const newIntro = {
//       'ingredient': 'broccoli',
//       'description': 'roasted with salt',
//       'thresholdPassed': 'touch with fork',
//       'child': 'Kim'
//     }

//     await api
//       .post('/api/newintroduction')
//       .send(newIntro)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
  
//     const introsFromDB = await Introduction.find({})
//     const introductions = introsFromDB.map(intro => intro.toJSON())
  
//     const expectedIntroCount = 3
  
//     expect(introductions).toHaveLength(expectedIntroCount)
  
//     const recentIntro = introductions.filter(x => x.ingredient === 'broccoli')
//     expect(recentIntro.date).toEqual(
//       date.getDate()
//     )
//   })
// })