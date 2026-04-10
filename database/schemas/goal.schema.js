const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fat: { type: Number, required: true },
  },
  { timestamps: true }
)

goalSchema.plugin(require('./toJSON.plugin'))

module.exports = mongoose.model('Goal', goalSchema)
