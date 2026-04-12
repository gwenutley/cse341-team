const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot be longer than 100 characters'],
    },
    calories: {
      type: Number,
      required: [true, 'Calories is required'],
      min: [0, 'Calories must be zero or greater'],
    },
    protein: {
      type: Number,
      min: [0, 'Protein must be zero or greater'],
    },
    carbs: {
      type: Number,
      min: [0, 'Carbs must be zero or greater'],
    },
    fat: {
      type: Number,
      min: [0, 'Fat must be zero or greater'],
    },
    fiber: {
      type: Number,
      min: [0, 'Fiber must be zero or greater'],
    },
    sugar: {
      type: Number,
      min: [0, 'Sugar must be zero or greater'],
    },
    servingSize: {
      type: String,
      trim: true,
      maxlength: [100, 'Serving size cannot be longer than 100 characters'],
    },
    category: {
      type: String,
      trim: true,
      lowercase: true,
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
  {
    timestamps: true,
    strict: 'throw',
  }
)

foodSchema.plugin(require('./toJSON.plugin'))

module.exports = mongoose.model('Food', foodSchema)
