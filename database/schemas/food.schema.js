const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number },
    carbs: { type: Number },
    fat: { type: Number },
    fiber: { type: Number },
    category: {
      type: String,
      enum: {
        values: [
          'vegetable',
          'protein',
          'grain',
          'fruit',
          'fat',
          'dairy',
          'snack',
          'meat',
          'beverage',
          'other',
        ],
        message: '{VALUE} is not a valid food category',
      },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Food', foodSchema)
