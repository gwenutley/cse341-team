const mongoose = require('mongoose')
const ApiError = require('../utils/apiError')

const requireBody = (req, res, next) => {
  if (!req.body || Array.isArray(req.body) || typeof req.body !== 'object') {
    return next(new ApiError(400, 'Request body must be a JSON object'))
  }

  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, 'Request body cannot be empty'))
  }

  next()
}

const validateObjectIdParam = (req, res, next, value) => {
  const paramName = req.params.param
  if (!mongoose.isValidObjectId(value)) {
    return next(
      new ApiError(400, `Invalid ${paramName}`, [
        {
          field: paramName,
          message: `${value} is not a valid MongoDB ObjectId`,
          value,
        },
      ])
    )
  }

  next()
}

module.exports = {
  requireBody,
  validateObjectIdParam,
}
