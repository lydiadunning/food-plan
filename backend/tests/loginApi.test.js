/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const Kid = require('../models/kid')
const jwt = require('jsonwebtoken')

// basic user creation and sign in behavior

// create a new user
// be signed in as this user

// cannot create a new user without required information

// sign in to an existing user account

// not signed in to account if no sign in occurs

// cannot sign in to user account with incorrect password

// cannot sign in to user account with no password

// these tests validate account creation behavior
describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      name: 'Jeff Jefferson', 
      username: 'root', 
      passwordHash: passwordHash,
      email: 'jeff@jeff.com'
     })

    await user.save()
    console.log('user created in beforeEach')
  })

  test('an existing user can log in', async () => {
    const returningUser = {
      username: 'root',
      password: 'sekret',
    }

    const result = await api
      .post('/api/login')
      .send(returningUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    console.log(result.body)
    expect(result.body).toHaveProperty('token')
    expect(result.body.name).toEqual('Jeff Jefferson')
  })

  test('an existing user cannot log in with an incorrect password', async () => {
    const mistakenUser = {
      username: 'root',
      password: 'serket'
    }

    const result = await api
      .post('/api/login')
      .send(mistakenUser)
      .expect(401)
    
    expect(result.body.error).toContain('invalid username or password')  
  })

  test('a user with no account cannot log in', async () => {
    const noAccountUser = {
      username: 'jeffster',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(noAccountUser)
      .expect(401)
    
    expect(result.body.error).toContain('invalid username or password')  
  })
})


describe('When a user is logged in', () => {
  let token = ''
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      name: 'Jeff Jefferson', 
      username: 'root', 
      passwordHash: passwordHash,
      email: 'jeff@jeff.com'
     })

    const createdUser = await user.save()
    userId = createdUser.id

    // token = "Bearer " + jwt.sign({
    //     username: user.username,
    //     id: createdUser.id
    //   }, 
    //   process.env.SECRET
    // )      

    const returningUser = {
      username: 'root',
      password: 'sekret',
    }
      
    const result = await api
      .post('/api/login')
      .send(returningUser)

    console.log('result.body', result.body)
    token = result.body.token
    console.log('token', token)
  })

  test('they can add a kid', async () => {
    const kid = {
      name: 'Jeffette Jefferson',
    }
    const result = await api
      .post('/api/kid')
      .set('Authorization', `Bearer ${token}`)
      .send(kid)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(result.body.users[0]).toEqual(userId)
    expect(result.body.name).toEqual(kid.name)
  })

  test('a user with the wrong token cannot add a kid', async () => {
    const kid = {
      name: 'Boopsy Hull',
    }

    const wrongToken = '12' + token.slice(2)

    const result = await api
      .post('/api/kid')
      .set('Authorization', `Bearer ${wrongToken}`)
      .send(kid)
      .expect(401)

    expect(result.body.error).toEqual('invalid token')
  }, 10000)
})

describe('When a user has a kid in their profile', () => {
  let token = ''
  let userId = null
  beforeEach(async () => {
    await User.deleteMany({})
    await Kid.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      name: 'Jeff Jefferson', 
      username: 'root', 
      passwordHash: passwordHash,
      email: 'jeff@jeff.com'
     })

    const createdUser = await user.save()
    token = createdUser.token
    userId = createdUser._id


    const kid = new Kid({
      name: 'Mary Jefferson',
      users:[createdUser.id]    
    })

    const createdKid = await kid.save()

    user.kids = [createdKid]
    await user.save()

    const returningUser = {
      username: 'root',
      password: 'sekret',
    }
      
    const result = await api
      .post('/api/login')
      .send(returningUser)

    token = result.body.token
    console.log('token', token)
    
  })

  test('the user can retrieve the kid', async () => {
    const response = await api
      .get('/api/kid')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const kid = response.body[0]
    expect(kid.name).toEqual('Mary Jefferson')
    expect(`${kid.users[0]}`).toEqual(`${userId}`)
  })

  test('the user cannot retrieve the kid with an incorrect token', async () => {
    const wrongToken = '12' + token.slice(2)

    const response = await api
      .get('/api/kid')
      .set('Authorization', `Bearer ${wrongToken}`)
      .expect(401)

    const kid = response.body[0]
    expect(response.body.error).toEqual('invalid token')
  })
})

describe('When a user is logged in', () => {
  let token = ''
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      name: 'Jeff Jefferson', 
      username: 'root', 
      passwordHash: passwordHash,
      email: 'jeff@jeff.com'
     })

    const createdUser = await user.save()
    userId = createdUser.id

    // token = "Bearer " + jwt.sign({
    //     username: user.username,
    //     id: createdUser.id
    //   }, 
    //   process.env.SECRET
    // )      

    const returningUser = {
      username: 'root',
      password: 'sekret',
    }
      
    const result = await api
      .post('/api/login')
      .send(returningUser)

    console.log('result.body', result.body)
    token = result.body.token
    console.log('token', token)
  })

  test('they can add a kid', async () => {
    const kid = {
      name: 'Jeffette Jefferson',
    }

    const result = await api
      .post('/api/kid')
      .set('Authorization', `Bearer ${token}`)
      .send(kid)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(result.body.users[0]).toEqual(userId)
    expect(result.body.name).toEqual(kid.name)
  })

  test('a user with the wrong token cannot add a kid', async () => {
    const kid = {
      name: 'Boopsy Hull',
    }

    const wrongToken = '12' + token.slice(2)

    const result = await api
      .post('/api/kid')
      .set('Authorization', `Bearer ${wrongToken}`)
      .send(kid)
      .expect(401)

    expect(result.body.error).toEqual('invalid token')
  }, 10000)
})

describe('With 2 users, one with a kid in their profile', () => {
  let token1 = null
  let token2 = null
  let user1Id = null
  let user2Id = null
  let kidId = null
  beforeAll(async () => {
    await User.deleteMany({})
    await Kid.deleteMany({}) 

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user1 = new User({ 
      name: 'Jeff Jefferson', 
      username: 'root', 
      passwordHash: passwordHash,
      email: 'jeff@jeff.com'
     })

    const createdUser1 = await user1.save()
    token1 = createdUser1.token
    user1Id = createdUser1._id

    const user2 = new User({ 
      name: 'Mary Maryson', 
      username: 'bloop', 
      passwordHash: passwordHash,
      email: 'mary@mary.com'
     })

    const createdUser2 = await user2.save()
    token2 = createdUser2.token
    user2Id = createdUser2._id


    const kid = new Kid({
      name: 'Mary Jefferson',
      users:[createdUser1.id]    
    })

    const createdKid = await kid.save()
    kidId = createdKid._id

    user1.kids = [createdKid]
    await user1.save()

    const returningUser1 = {
      username: 'root',
      password: 'sekret',
    }
      
    const result1 = await api
      .post('/api/login')
      .send(returningUser1)

    token1 = result1.body.token

    const returningUser2 = {
      username: 'bloop',
      password: 'sekret',
    }
      
    const result2 = await api
      .post('/api/login')
      .send(returningUser2)

    token2 = result2.body.token

    console.log('tokens', token1, token2)
  }, 20000)

  test('the other user cannot retrieve the kid', async () => {
    const response = await api
      .get('/api/kid')
      .set('Authorization', `Bearer ${token2}`)
      .expect(200)

      expect(response.body).toHaveLength(0)
  }, 20000)

  test('the other user cannot retrieve the kid by id', async () => {
    const response = await api
      .get(`/api/kid/${kidId}`)
      .set('Authorization', `Bearer ${token2}`)
      .expect(404)

      console.log(response.body)
      expect(response.body.error).toEqual('child not found')
  }, 20000)
})

afterAll(async () => {
  await mongoose.connection.close()
})