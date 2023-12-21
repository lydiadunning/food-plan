/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')

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

  test('creation succeeds with a fresh username', async () => {
    console.log('test started')
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())
    console.log('users at start aquired by test', usersAtStart)
    
    const newUser = {
      username: 'torgulp',
      name: 'Password Torgul',
      password: 'bestpassword',
      email: 'gulp@word.com'
    }

    await api
      .post('/api/user')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'password',
      email: 'email@password.edu'
    }

    const result = await api
      .post('/api/user')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails if the username is too short', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())
    
    const newUser = {
      username: 'Po',
      name: 'Superuser',
      password: 'poblerone',
      email: 'po@superuser.com'
    }

    const result = await api
      .post('/api/user')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`Po`) is shorter than the minimum allowed length (3).')

    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails if the password is too short', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())
    console.log('usersAtStart', usersAtStart)

    const newUser = {
      username: 'Poblerone',
      name: 'Superuser',
      password: 'hi',
      email: 'po@superuser.com'
    }

    const result = await api
      .post('/api/user')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long' )

    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails without a username', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())

    const newUser = {
      name: 'Superuser',
      password: 'password',
      email: 'user@superuser.com'
    }

    const result = await api
      .post('/api/user')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` is required.')

    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails without a password', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())

    const newUser = {
      username: 'megaJeff',
      name: 'Superuser',
      email: 'jeff@superuser.com'
    }

    const result = await api
      .post('/api/user')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is required')

    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with no email', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())
    
    const newUser = {
      username: 'Francine',
      name: 'Francine RealPerson',
      password: 'secret',
    }

    const result = await api
      .post('/api/user')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: email: Path `email` is required.')  
    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

test('creation fails if email is too short', async () => {
  let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())
    
    const newUser = {
      username: 'Francine',
      name: 'Francine RealPerson',
      password: 'secret',
      email: 'b@m.'
    }

    const result = await api
      .post('/api/user')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: email: Path `email` (`b@m.`) is shorter than the minimum allowed length (5).')  
    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
})


afterAll(async () => {
  await mongoose.connection.close()
})