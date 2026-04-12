const goalModel = require('../model/goal.model')
const ApiError = require('../utils/apiError')

const getAll = async (_req, res) => {
  /*
    #swagger.tags = ['Goals']
    #swagger.summary = 'Retrieve all goals'
    #swagger.description = 'Get a list of all goals in the database'
    #swagger.responses[200] = {
      description: 'List of goals retrieved successfully',
      schema: [{ $ref: '#/definitions/Goal' }]
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  const goals = await goalModel.findAll()
  res.status(200).json(goals)
}

const getById = async (req, res) => {
  /*
    #swagger.tags = ['Goals']
    #swagger.summary = 'Retrieve a single goal'
    #swagger.description = 'Get detailed information about a goal by its ID'
    #swagger.parameters['id'] = { description: 'Goal ID' }
    #swagger.responses[200] = {
      description: 'Goal retrieved successfully',
      schema: { $ref: '#/definitions/Goal' }
    }
    #swagger.responses[404] = {
      description: 'Goal not found',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  const goal = await goalModel.findById(req.params.id)
  if (!goal) {
    throw new ApiError(404, 'Goal not found')
  }

  res.status(200).json(goal)
}

const update = async (req, res) => {
  /*
    #swagger.tags = ['Goals']
    #swagger.summary = 'Update an existing goal'
    #swagger.description = 'Update the details of a goal by its ID'
    #swagger.parameters['id'] = { description: 'Goal ID' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Goal object that needs to be updated',
      schema: { $ref: '#/definitions/Goal' }
    }
    #swagger.responses[200] = {
      description: 'Goal updated successfully',
      schema: { $ref: '#/definitions/Goal' }
    }
    #swagger.responses[400] = {
      description: 'Invalid input or empty body',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[404] = {
      description: 'Goal not found',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  const goal = await goalModel.updateById(req.params.id, req.body)
  if (!goal) {
    throw new ApiError(404, 'Goal not found')
  }

  res.status(200).json(goal)
}

const create = async (req, res) => {
  /*
    #swagger.tags = ['Goals']
    #swagger.summary = 'Create a new goal'
    #swagger.description = 'Add a new goal to the database'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Goal object to be created',
      schema: { $ref: '#/definitions/Goal' }
    }
    #swagger.responses[201] = {
      description: 'Goal created successfully',
      schema: { $ref: '#/definitions/Goal' }
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
  const goal = await goalModel.create(req.body)
  res.status(201).json(goal)
}

const deleteById = async (req, res) => {
  /*
    #swagger.tags = ['Goals']
    #swagger.summary = 'Delete a goal'
    #swagger.description = 'Remove a goal from the database by its ID'
    #swagger.parameters['id'] = { description: 'Goal ID' }
    #swagger.responses[200] = {
      description: 'Goal deleted successfully',
      schema: { message: 'Goal deleted successfully' }
    }
    #swagger.responses[404] = {
      description: 'Goal not found',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  const goal = await goalModel.deleteById(req.params.id)
  if (!goal) {
    throw new ApiError(404, 'Goal not found')
  }

  res.status(200).json({ message: 'Goal deleted successfully' })
}

module.exports = {
  getAll,
  getById,
  update,
  create,
  deleteById,
}
