require('dotenv').config()
const db = require('../index')
const foodModel = require('../../model/food.model')
const userModel = require('../../model/user.model')
const goalModel = require('../../model/goal.model')
const dailyLogModel = require('../../model/dailyLog.model')
const data = require('./data.json')

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...')
    await db.connect()

    console.log('Clearing existing data...')
    await dailyLogModel.deleteMany({})
    await goalModel.deleteMany({})
    await foodModel.deleteMany({})
    await userModel.deleteMany({})

    const foodNameToId = {}

    if (data.foods && data.foods.length > 0) {
      console.log(`Seeding ${data.foods.length} foods...`)
      const foods = await foodModel.insertMany(data.foods)
      foods.forEach(food => {
        foodNameToId[food.name] = food._id
      })
    }

    if (data.users && data.users.length > 0) {
      console.log(`Seeding ${data.users.length} users...`)
      const users = await userModel.insertMany(data.users)

      if (data.goals && data.goals.length > 0) {
        console.log(`Seeding ${data.goals.length} goals...`)
        const goalsWithUser = data.goals.map((goal, index) => ({
          ...goal,
          user: users[index % users.length]._id,
        }))
        await goalModel.insertMany(goalsWithUser)
      }

      if (data.daily_logs && data.daily_logs.length > 0) {
        console.log(`Seeding ${data.daily_logs.length} daily logs...`)
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
      }
    }

    console.log('Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error while seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
