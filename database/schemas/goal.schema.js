const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    calories: {
      type: Number,
      required: [true, 'Calories is required'],
      min: [0, 'Calories must be zero or greater'],
    },
    protein: {
      type: Number,
      required: [true, 'Protein is required'],
      min: [0, 'Protein must be zero or greater'],
    },
    carbs: {
      type: Number,
      required: [true, 'Carbs is required'],
      min: [0, 'Carbs must be zero or greater'],
    },
    fat: {
      type: Number,
      required: [true, 'Fat is required'],
      min: [0, 'Fat must be zero or greater'],
    },
  },
  {
    timestamps: true,
    strict: 'throw',
  }
)

goalSchema.plugin(require('./toJSON.plugin'))

module.exports = mongoose.model('Goal', goalSchema)
