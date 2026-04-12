const ApiError = require('../utils/apiError')

const buildValidationErrors = validationErrors =>
  Object.values(validationErrors).map(error => ({
    field: error.path,
    message: error.message,
    ...(error.value !== undefined ? { value: error.value } : {}),
  }))

const buildDuplicateErrors = mongoError =>
  Object.keys(mongoError.keyValue || mongoError.keyPattern || {}).map(
    field => ({
      field,
      message: `${field} already exists`,
      ...(mongoError.keyValue?.[field] !== undefined
        ? { value: mongoError.keyValue[field] }
        : {}),
    })
  )

const notFoundHandler = (req, _res, next) => {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`))
}

const errorHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      message: 'Request body contains invalid JSON',
    })
  }

  if (error.name === 'SyntaxError' && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      message: 'Request body contains invalid JSON',
    })
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
      ...(error.errors.length > 0 ? { errors: error.errors } : {}),
    })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      errors: buildValidationErrors(error.errors),
    })
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      message: `Invalid value for ${error.path}`,
      errors: [
        {
          field: error.path,
          message: `${error.value} is not a valid ${error.kind}`,
          ...(error.value !== undefined ? { value: error.value } : {}),
        },
      ],
    })
  }

  if (error.name === 'StrictModeError') {
    return res.status(400).json({
      message: 'Request contains fields that are not allowed',
      errors: [
        {
          field: error.path || 'body',
          message: error.message,
        },
      ],
    })
  }

  if (error.name === 'MongoServerError' && error.code === 11000) {
    return res.status(409).json({
      message: 'Duplicate value',
      errors: buildDuplicateErrors(error),
    })
  }

  console.error(error)

  return res.status(500).json({
    message: 'Internal server error',
  })
}

module.exports = {
  errorHandler,
  notFoundHandler,
}
