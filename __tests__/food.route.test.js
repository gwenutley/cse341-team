const { describe, it, before, after } = require('node:test')
const assert = require('node:assert')
const request = require('supertest')
const { app } = require('../server')
const db = require('../database/index')
const foodModel = require('../model/food.model')
const data = require('../database/seed/data.json')

const api = request(app)

const expect = actual => ({
  toBe: expected => assert.strictEqual(actual, expected),
  toBeGreaterThan: expected => assert.ok(actual > expected),
})

before(async () => {
  await db.connect()
  await db.clear()
  await foodModel.insertMany(data.foods)
})

after(async () => {
  await db.clear()
  await db.close()
})

describe('GET /foods', () => {
  it('should return all foods', async () => {
    const res = await api.get('/foods').expect(200)
    expect(res.body.length).toBe(data.foods.length)
    expect(res.body[0].name).toBe('Apple')
  })
})

describe('GET /foods/:id', () => {
  it('should return a food by id', async () => {
    const foods = await foodModel.findAll()
    const foodId = foods[0]._id.toString()
    await api.get(`/foods/${foodId}`).expect(200)
  })

  it('should return 404 for non-existent id', async () => {
    await api.get('/foods/69d3e2645c93244b93389699').expect(404)
  })
})
