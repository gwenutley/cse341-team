const { describe, it, before, after } = require('node:test')
const assert = require('node:assert')
const request = require('supertest')
const { app } = require('../server')
const db = require('../database/index')
const userModel = require('../model/user.model')
const goalModel = require('../model/goal.model')
const data = require('../database/seed/data.json')

const api = request(app)

const expect = actual => ({
  toBe: expected => assert.strictEqual(actual, expected),
  toBeDefined: () => assert.ok(actual !== undefined && actual !== null),
})

let adminUser, regularUser1, regularUser2
let goal1, goal2

before(async () => {
  await db.connect()
  await db.clear()

  // Create users
  const users = await userModel.insertMany([
    { ...data.users[0], role: 'admin', githubId: 'admin-id' },
    {
      ...data.users[1],
      role: 'user',
      githubId: 'user1-id',
      username: 'user1',
      email: 'user1@test.com',
    },
    {
      ...data.users[1],
      role: 'user',
      githubId: 'user2-id',
      username: 'user2',
      email: 'user2@test.com',
    },
  ])
  adminUser = users[0]
  regularUser1 = users[1]
  regularUser2 = users[2]

  // Create goals
  goal1 = await goalModel.create({ ...data.goals[0], user: regularUser1._id })
  goal2 = await goalModel.create({ ...data.goals[1], user: regularUser2._id })
})

after(async () => {
  await db.clear()
  await db.close()
})

describe('Access Control - Users', () => {
  it('Admin should be able to see all users', async () => {
    const res = await api
      .get('/users')
      .set('x-test-user-id', adminUser._id.toString())
      .expect(200)
    assert.ok(res.body.length >= 3)
  })

  it('Regular user should NOT be able to see all users (403)', async () => {
    await api
      .get('/users')
      .set('x-test-user-id', regularUser1._id.toString())
      .expect(403)
  })

  it('Unauthenticated user should NOT be able to see all users (401)', async () => {
    await api.get('/users').expect(401)
  })
})

describe('Access Control - Goals', () => {
  it('Regular user should only see their own goals', async () => {
    const res = await api
      .get('/goals')
      .set('x-test-user-id', regularUser1._id.toString())
      .expect(200)
    expect(res.body.length).toBe(1)
    expect(res.body[0].id).toBe(goal1._id.toString())
  })

  it('Admin should see all goals', async () => {
    const res = await api
      .get('/goals')
      .set('x-test-user-id', adminUser._id.toString())
      .expect(200)
    assert.ok(res.body.length >= 2)
  })

  it("User should NOT be able to see another user's goal by ID", async () => {
    await api
      .get(`/goals/${goal2._id}`)
      .set('x-test-user-id', regularUser1._id.toString())
      .expect(403)
  })

  it('Admin should be able to see any goal by ID', async () => {
    await api
      .get(`/goals/${goal1._id}`)
      .set('x-test-user-id', adminUser._id.toString())
      .expect(200)
  })

  it("User should NOT be able to update another user's goal", async () => {
    await api
      .put(`/goals/${goal2._id}`)
      .set('x-test-user-id', regularUser1._id.toString())
      .send({ calories: 5000 })
      .expect(403)
  })

  it("User should NOT be able to delete another user's goal", async () => {
    await api
      .delete(`/goals/${goal2._id}`)
      .set('x-test-user-id', regularUser1._id.toString())
      .expect(403)
  })

  it('Creating a goal should automatically associate it with the current user', async () => {
    const newGoalData = {
      calories: 2500,
      protein: 150,
      carbs: 300,
      fat: 80,
    }
    const res = await api
      .post('/goals')
      .set('x-test-user-id', regularUser1._id.toString())
      .send(newGoalData)
      .expect(201)

    expect(res.body.user).toBe(regularUser1._id.toString())
  })
})

describe('Auth - /auth/me', () => {
  it('should return current user profile', async () => {
    const res = await api
      .get('/auth/me')
      .set('x-test-user-id', regularUser1._id.toString())
      .expect(200)
    expect(res.body.username).toBe('user1')
    expect(res.body.role).toBe('user')
  })

  it('should return 401 if not logged in', async () => {
    await api.get('/auth/me').expect(401)
  })
})
