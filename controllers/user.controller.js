const userModel = require('../model/user.model')
const ApiError = require('../utils/apiError')

const getAll = async (_req, res, next) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Retrieve all users'
    #swagger.description = 'Get a list of all user accounts in the database'
    #swagger.responses[200] = {
      description: 'List of users retrieved successfully',
      schema: [{ $ref: '#/definitions/User' }]
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const users = await userModel.findAll()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Retrieve a single user'
    #swagger.description = 'Get detailed information about a user account by its ID'
    #swagger.parameters['id'] = { description: 'User ID' }
    #swagger.responses[200] = {
      description: 'User retrieved successfully',
      schema: { $ref: '#/definitions/User' }
    }
    #swagger.responses[404] = {
      description: 'User not found',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const user = await userModel.findById(req.params.id)
    if (!user) {
      throw new ApiError(404, 'User not found')
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Update an existing user'
    #swagger.description = 'Update the details of a user account by its ID'
    #swagger.security = [{ "github_auth": [] }]
    #swagger.parameters['id'] = { description: 'User ID' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'User object that needs to be updated',
      schema: { $ref: '#/definitions/User' }
    }
    #swagger.responses[200] = {
      description: 'User updated successfully',
      schema: { $ref: '#/definitions/User' }
    }
    #swagger.responses[400] = {
      description: 'Invalid input or empty body',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[404] = {
      description: 'User not found',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const user = await userModel.updateById(req.params.id, req.body)
    if (!user) {
      throw new ApiError(404, 'User not found')
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Create a new user'
    #swagger.description = 'Add a new user account to the database'
    #swagger.security = [{ "github_auth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'User object to be created',
      schema: { $ref: '#/definitions/User' }
    }
    #swagger.responses[201] = {
      description: 'User created successfully',
      schema: { $ref: '#/definitions/User' }
    }
    #swagger.responses[400] = {
      description: 'Invalid input or empty body',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const user = await userModel.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

const deleteById = async (req, res, next) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Delete a user account'
    #swagger.description = 'Remove a user account from the database by its ID'
    #swagger.security = [{ "github_auth": [] }]
    #swagger.parameters['id'] = { description: 'User ID' }
    #swagger.responses[200] = {
      description: 'User deleted successfully',
      schema: { message: 'User deleted successfully' }
    }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[404] = {
      description: 'User not found',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const user = await userModel.deleteById(req.params.id)
    if (!user) {
      throw new ApiError(404, 'User not found')
    }
    res.status(200).json({ message: 'User deleted successfully' })
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
