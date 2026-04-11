const mongoose = require('mongoose')

const connect = async () => {
  try {
    const uri =
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_TEST_URI
        : process.env.MONGO_URI
    await mongoose.connect(uri)
    console.log('MongoDB connected')
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

const close = async () => {
  try {
    await mongoose.connection.close()
    console.log('MongoDB connection closed')
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

const clear = async () => {
  try {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      await collections[key].deleteMany()
    }
    console.log('MongoDB collections cleared')
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

module.exports = { connect, close, clear }
