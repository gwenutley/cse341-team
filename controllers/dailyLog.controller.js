const dailyLogModel = require('../model/dailyLog.model')

const getAll = async (_req, res) => {
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
    res.status(500).json({ message: error.message })
  }
}

const getById = async (req, res) => {
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
      return res.status(404).json({ message: 'Daily log not found' })
    }
    res.status(200).json(dailyLog)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const update = async (req, res) => {
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
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty' })
    }

    const dailyLog = await dailyLogModel.updateById(req.params.id, req.body)
    if (!dailyLog) {
      return res.status(404).json({ message: 'Daily log not found' })
    }
    res.status(200).json(dailyLog)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
  }
}

const create = async (req, res) => {
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
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty' })
    }

    const dailyLog = await dailyLogModel.create(req.body)
    res.status(201).json(dailyLog)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
  }
}

const deleteById = async (req, res) => {
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
      return res.status(404).json({ message: 'Daily log not found' })
    }
    res.status(200).json({ message: 'Daily log deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAll,
  getById,
  update,
  create,
  deleteById,
}
