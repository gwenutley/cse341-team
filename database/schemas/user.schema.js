const mongoose = require('mongoose')
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [50, 'Username cannot be longer than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [emailPattern, 'Email must be a valid email address'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: 'Role must be either admin or user',
      },
      default: 'user',
    },
    password: {
      type: String,
      trim: true,
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    googleId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    strict: 'throw',
  }
)

userSchema.plugin(require('./toJSON.plugin'))

module.exports = mongoose.model('User', userSchema)
