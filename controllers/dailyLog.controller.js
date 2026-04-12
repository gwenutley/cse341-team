const dailyLogModel = require('../model/dailyLog.model')
const ApiError = require('../utils/apiError')

const getAll = async (_req, res, next) => {
  /*
    #swagger.tags = ['DailyLogs']
    #swagger.summary = 'Retrieve all daily logs'
    #swagger.description = 'Get a list of all daily logs in the database'
    #swagger.responses[200] = {
      description: 'List of daily logs retrieved successfully',
      schema: [{ $ref: '#/definitions/DailyLog' }]
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const dailyLogs = await dailyLogModel.findAll()
    res.status(200).json(dailyLogs)
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  /*
    #swagger.tags = ['DailyLogs']
    #swagger.summary = 'Retrieve a single daily log'
    #swagger.description = 'Get detailed information about a daily log by its ID'
    #swagger.parameters['id'] = { description: 'Daily Log ID' }
    #swagger.responses[200] = {
      description: 'Daily log retrieved successfully',
      schema: { $ref: '#/definitions/DailyLog' }
    }
    #swagger.responses[404] = {
      description: 'Daily log not found',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const dailyLog = await dailyLogModel.findById(req.params.id)
    if (!dailyLog) {
      throw new ApiError(404, 'Daily log not found')
    }
    res.status(200).json(dailyLog)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  /*
    #swagger.tags = ['DailyLogs']
    #swagger.summary = 'Update an existing daily log'
    #swagger.description = 'Update the details of a daily log by its ID'
    #swagger.parameters['id'] = { description: 'Daily Log ID' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Daily Log object that needs to be updated',
      schema: { $ref: '#/definitions/DailyLog' }
    }
    #swagger.responses[200] = {
      description: 'Daily log updated successfully',
      schema: { $ref: '#/definitions/DailyLog' }
    }
    #swagger.responses[400] = {
      description: 'Invalid input or empty body',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[404] = {
      description: 'Daily log not found',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const dailyLog = await dailyLogModel.updateById(req.params.id, req.body)
    if (!dailyLog) {
      throw new ApiError(404, 'Daily log not found')
    }
    res.status(200).json(dailyLog)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  /*
    #swagger.tags = ['DailyLogs']
    #swagger.summary = 'Create a new daily log'
    #swagger.description = 'Add a new daily log to the database'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Daily Log object to be created',
      schema: { $ref: '#/definitions/DailyLog' }
    }
    #swagger.responses[201] = {
      description: 'Daily log created successfully',
      schema: { $ref: '#/definitions/DailyLog' }
    }
    #swagger.responses[400] = {
      description: 'Invalid input or empty body',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const dailyLog = await dailyLogModel.create(req.body)
    res.status(201).json(dailyLog)
  } catch (error) {
    next(error)
  }
}

const deleteById = async (req, res, next) => {
  /*
    #swagger.tags = ['DailyLogs']
    #swagger.summary = 'Delete a daily log'
    #swagger.description = 'Remove a daily log from the database by its ID'
    #swagger.parameters['id'] = { description: 'Daily Log ID' }
    #swagger.responses[200] = {
      description: 'Daily log deleted successfully',
      schema: { message: 'Daily log deleted successfully' }
    }
    #swagger.responses[404] = {
      description: 'Daily log not found',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const dailyLog = await dailyLogModel.deleteById(req.params.id)
    if (!dailyLog) {
      throw new ApiError(404, 'Daily log not found')
    }
    res.status(200).json({ message: 'Daily log deleted successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getById,
  update,
  create,
  deleteById,
}
