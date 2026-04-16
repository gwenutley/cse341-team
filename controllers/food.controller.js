const foodModel = require('../model/food.model')
const ApiError = require('../utils/apiError')

const getAll = async (_req, res, next) => {
  /*
    #swagger.tags = ['Foods']
    #swagger.summary = 'Retrieve all foods'
    #swagger.description = 'Get a list of all food items in the database'
    #swagger.responses[200] = {
      description: 'List of foods retrieved successfully',
      schema: [{ $ref: '#/definitions/Food' }]
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const foods = await foodModel.findAll()
    res.status(200).json(foods)
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  /*
    #swagger.tags = ['Foods']
    #swagger.summary = 'Retrieve a single food'
    #swagger.description = 'Get detailed information about a food item by its ID'
    #swagger.parameters['id'] = { description: 'Food ID' }
    #swagger.responses[200] = {
      description: 'Food retrieved successfully',
      schema: { $ref: '#/definitions/Food' }
    }
    #swagger.responses[404] = {
      description: 'Food not found',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const food = await foodModel.findById(req.params.id)
    if (!food) {
      throw new ApiError(404, 'Food not found')
    }
    res.status(200).json(food)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  /*
    #swagger.tags = ['Foods']
    #swagger.summary = 'Update an existing food'
    #swagger.description = 'Update the details of a food item by its ID. Requires authentication.'
    #swagger.security = [{ "github_auth": [] }]
    #swagger.parameters['id'] = { description: 'Food ID' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Food object that needs to be updated',
      schema: { $ref: '#/definitions/Food' }
    }
    #swagger.responses[200] = {
      description: 'Food updated successfully',
      schema: { $ref: '#/definitions/Food' }
    }
    #swagger.responses[400] = {
      description: 'Invalid input or empty body',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[404] = {
      description: 'Food not found',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const food = await foodModel.updateById(req.params.id, req.body)
    if (!food) {
      throw new ApiError(404, 'Food not found')
    }
    res.status(200).json(food)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  /*
    #swagger.tags = ['Foods']
    #swagger.summary = 'Create a new food'
    #swagger.description = 'Add a new food item to the database. Requires authentication.'
    #swagger.security = [{ "github_auth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Food object to be created',
      schema: { $ref: '#/definitions/Food' }
    }
    #swagger.responses[201] = {
      description: 'Food created successfully',
      schema: { $ref: '#/definitions/Food' }
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
    const food = await foodModel.create(req.body)
    res.status(201).json(food)
  } catch (error) {
    next(error)
  }
}

const deleteById = async (req, res, next) => {
  /*
    #swagger.tags = ['Foods']
    #swagger.summary = 'Delete a food item'
    #swagger.description = 'Remove a food item from the database by its ID. Requires authentication.'
    #swagger.security = [{ "github_auth": [] }]
    #swagger.parameters['id'] = { description: 'Food ID' }
    #swagger.responses[200] = {
      description: 'Food deleted successfully',
      schema: { message: 'Food deleted successfully' }
    }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[404] = {
      description: 'Food not found',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const food = await foodModel.deleteById(req.params.id)
    if (!food) {
      throw new ApiError(404, 'Food not found')
    }
    res.status(200).json({ message: 'Food deleted successfully' })
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
