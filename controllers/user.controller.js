const userModel = require('../model/user.model')

const getAll = async (_req, res) => {
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
    res.status(500).json({ message: error.message })
  }
}

const getById = async (req, res) => {
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
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const update = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Update an existing user'
    #swagger.description = 'Update the details of a user account by its ID'
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
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty' })
    }

    const user = await userModel.updateById(req.params.id, req.body)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
  }
}

const create = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Create a new user'
    #swagger.description = 'Add a new user account to the database'
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
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty' })
    }

    const user = await userModel.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
  }
}

const deleteById = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Delete a user account'
    #swagger.description = 'Remove a user account from the database by its ID'
    #swagger.parameters['id'] = { description: 'User ID' }
    #swagger.responses[200] = {
      description: 'User deleted successfully',
      schema: { message: 'User deleted successfully' }
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
    const user = await userModel.deleteById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
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
