require('dotenv').config()
const db = require('../index')
const foodModel = require('../../model/food.model')
const userModel = require('../../model/user.model')
const data = require('./data.json')

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...')
    await db.connect()

    console.log('Clearing existing data...')
    await foodModel.deleteMany({})
    await userModel.deleteMany({})

    if (data.foods && data.foods.length > 0) {
      console.log(`Seeding ${data.foods.length} foods...`)
      await foodModel.insertMany(data.foods)
    }

    if (data.users && data.users.length > 0) {
      console.log(`Seeding ${data.users.length} users...`)
      await userModel.insertMany(data.users)
    }

    console.log('Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error while seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
