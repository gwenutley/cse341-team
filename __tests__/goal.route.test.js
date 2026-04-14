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
  toBeGreaterThan: expected => assert.ok(actual > expected),
})

before(async () => {
  await db.connect()
  await db.clear()
  const users = await userModel.insertMany(data.users)
  const goalsWithUser = data.goals.map((goal, index) => ({
    ...goal,
    user: users[index % users.length]._id,
  }))
  await goalModel.insertMany(goalsWithUser)
})

after(async () => {
  await db.clear()
  await db.close()
})

describe('GET /goals', () => {
  it('should return all goals', async () => {
    const res = await api.get('/goals').expect(200)
    expect(res.body.length).toBe(data.goals.length)
    expect(res.body[0].calories).toBe(2200)
  })
})

describe('GET /goals/:id', () => {
  it('should return a goal by id', async () => {
    const goals = await goalModel.findAll()
    const goalId = goals[0]._id.toString()
    const res = await api.get(`/goals/${goalId}`).expect(200)
    expect(res.body.calories).toBe(2200)
  })

  it('should return 404 for non-existent id', async () => {
    await api.get('/goals/69d3e2645c93244b93389699').expect(404)
  })
})
