const mongoose = require('mongoose')

const dailyLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    foods: {
      type: [
        {
          food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required: [true, 'Food is required'],
          },
          quantity: {
            type: Number,
            default: 1,
            min: [1, 'Quantity must be at least 1'],
          },
        },
      ],
      validate: {
        validator: value => Array.isArray(value) && value.length > 0,
        message: 'Daily log must include at least one food entry',
      },
    },
  },
  {
    timestamps: true,
    strict: 'throw',
  }
)

dailyLogSchema.plugin(require('./toJSON.plugin'))

module.exports = mongoose.model('DailyLog', dailyLogSchema)
