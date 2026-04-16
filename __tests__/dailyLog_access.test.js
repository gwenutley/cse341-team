const { describe, it, before, after } = require('node:test')
const assert = require('node:assert')
const request = require('supertest')
const { app } = require('../server')
const db = require('../database/index')
const userModel = require('../model/user.model')
const dailyLogModel = require('../model/dailyLog.model')
const foodModel = require('../model/food.model')
const data = require('../database/seed/data.json')

const api = request(app)

const expect = actual => ({
  toBe: expected => assert.strictEqual(actual, expected),
})

let adminUser, regularUser1, regularUser2
let foodId
let log1, log2

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

  // Create food for log
  const food = await foodModel.create(data.foods[0])
  foodId = food._id

  // Create daily logs
  log1 = await dailyLogModel.create({
    user: regularUser1._id,
    date: new Date(),
    foods: [{ food: foodId, quantity: 1 }],
  })
  log2 = await dailyLogModel.create({
    user: regularUser2._id,
    date: new Date(),
    foods: [{ food: foodId, quantity: 2 }],
  })
})

after(async () => {
  await db.clear()
  await db.close()
})

describe('Access Control - DailyLogs', () => {
  it('Regular user should only see their own logs', async () => {
    const res = await api
      .get('/daily-logs')
      .set('x-test-user-id', regularUser1._id.toString())
      .expect(200)
    expect(res.body.length).toBe(1)
    expect(res.body[0].id).toBe(log1._id.toString())
  })

  it('Admin should see all daily logs', async () => {
    const res = await api
      .get('/daily-logs')
      .set('x-test-user-id', adminUser._id.toString())
      .expect(200)
    assert.ok(res.body.length >= 2)
  })

  it("User should NOT be able to see another user's log by ID", async () => {
    await api
      .get(`/daily-logs/${log2._id}`)
      .set('x-test-user-id', regularUser1._id.toString())
      .expect(403)
  })

  it('Admin should be able to see any log by ID', async () => {
    await api
      .get(`/daily-logs/${log1._id}`)
      .set('x-test-user-id', adminUser._id.toString())
      .expect(200)
  })

  it("User should NOT be able to update another user's log", async () => {
    await api
      .put(`/daily-logs/${log2._id}`)
      .set('x-test-user-id', regularUser1._id.toString())
      .send({ date: new Date() })
      .expect(403)
  })

  it("User should NOT be able to delete another user's log", async () => {
    await api
      .delete(`/daily-logs/${log2._id}`)
      .set('x-test-user-id', regularUser1._id.toString())
      .expect(403)
  })

  it('Creating a log should automatically associate it with the current user', async () => {
    const newLogData = {
      date: new Date(),
      foods: [{ food: foodId.toString(), quantity: 5 }],
    }
    const res = await api
      .post('/daily-logs')
      .set('x-test-user-id', regularUser1._id.toString())
      .send(newLogData)
      .expect(201)

    expect(res.body.user).toBe(regularUser1._id.toString())
  })
})
