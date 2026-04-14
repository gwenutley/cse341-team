const mongoose = require('mongoose')

const logger = {
  info: message => process.env.NODE_ENV !== 'test' && console.log(message),
  error: message => process.env.NODE_ENV !== 'test' && console.error(message),
}

const connect = async () => {
  try {
    const uri =
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_TEST_URI
        : process.env.MONGO_URI
    await mongoose.connect(uri)

    logger.info('MongoDB connected')
  } catch (err) {
    logger.error(err.message)
    throw err
  }
}

const close = async () => {
  try {
    await mongoose.connection.close()
    logger.info('MongoDB connection closed')
  } catch (err) {
    logger.error(err.message)
    throw err
  }
}

const clear = async () => {
  try {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      await collections[key].deleteMany()
    }
    logger.info('MongoDB collections cleared')
  } catch (err) {
    logger.error(err.message)
    throw err
  }
}

module.exports = { connect, close, clear }
