const { describe, it, before, after } = require('node:test')
const assert = require('node:assert')
const request = require('supertest')
const { app } = require('../server')
const db = require('../database/index')
const userModel = require('../model/user.model')
const foodModel = require('../model/food.model')
const dailyLogModel = require('../model/dailyLog.model')
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
  const foods = await foodModel.insertMany(data.foods)

  const foodNameToId = {}
  foods.forEach(food => {
    foodNameToId[food.name] = food._id
  })

  const dailyLogsWithRefs = data.daily_logs.map((log, index) => ({
    date: log.date,
    user: users[index % users.length]._id,
    foods: log.foods.map((foodEntry, foodIndex) => {
      const foodNames = Object.keys(foodNameToId)
      const foodName = foodNames[foodIndex % foodNames.length]
      return {
        food: foodNameToId[foodName],
        quantity: foodEntry.quantity,
      }
    }),
  }))
  await dailyLogModel.insertMany(dailyLogsWithRefs)
})

after(async () => {
  await db.clear()
  await db.close()
})

describe('GET /daily-logs', () => {
  it('should return all daily logs', async () => {
    const res = await api.get('/daily-logs').expect(200)
    expect(res.body.length).toBe(data.daily_logs.length)
  })
})

describe('GET /daily-logs/:id', () => {
  it('should return a daily log by id', async () => {
    const dailyLogs = await dailyLogModel.findAll()
    const logId = dailyLogs[0]._id.toString()
    const res = await api.get(`/daily-logs/${logId}`).expect(200)
    expect(res.body.date).toBe('2024-06-01T00:00:00.000Z')
  })

  it('should return 404 for non-existent id', async () => {
    await api.get('/daily-logs/69d3e2645c93244b93389699').expect(404)
  })
})
