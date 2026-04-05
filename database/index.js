const mongoose = require('mongoose')

/* eslint-disable no-console */
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

module.exports = { connect }
