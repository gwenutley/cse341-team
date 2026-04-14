const { describe, it, before, after } = require('node:test')
const assert = require('node:assert')
const request = require('supertest')
const { app } = require('../server')
const db = require('../database/index')
const userModel = require('../model/user.model')
const data = require('../database/seed/data.json')

const api = request(app)

const expect = actual => ({
  toBe: expected => assert.strictEqual(actual, expected),
  toBeGreaterThan: expected => assert.ok(actual > expected),
})

before(async () => {
  await db.connect()
  await db.clear()
  await userModel.insertMany(data.users)
})

after(async () => {
  await db.clear()
  await db.close()
})

describe('GET /users', () => {
  it('should return all users', async () => {
    const res = await api.get('/users').expect(200)
    expect(res.body.length).toBe(data.users.length)
    expect(res.body[0].username).toBe('admin')
  })
})

describe('GET /users/:id', () => {
  it('should return a user by id', async () => {
    const users = await userModel.findAll()
    const userId = users[0]._id.toString()
    const res = await api.get(`/users/${userId}`).expect(200)
    expect(res.body.username).toBe('admin')
  })

  it('should return 404 for non-existent id', async () => {
    await api.get('/users/69d3e2645c93244b93389699').expect(404)
  })
})
