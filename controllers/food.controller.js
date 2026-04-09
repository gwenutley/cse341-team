const foodModel = require('../model/food.model')

const getAll = async (_req, res) => {
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
    res.status(500).json({ message: error.message })
  }
}

const getById = async (req, res) => {
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
      return res.status(404).json({ message: 'Food not found' })
    }
    res.status(200).json(food)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const update = async (req, res) => {
  /*
    #swagger.tags = ['Foods']
    #swagger.summary = 'Update an existing food'
    #swagger.description = 'Update the details of a food item by its ID'
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
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty' })
    }

    const food = await foodModel.updateById(req.params.id, req.body)
    if (!food) {
      return res.status(404).json({ message: 'Food not found' })
    }
    res.status(200).json(food)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
  }
}

const create = async (req, res) => {
  /*
    #swagger.tags = ['Foods']
    #swagger.summary = 'Create a new food'
    #swagger.description = 'Add a new food item to the database'
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
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty' })
    }

    const food = await foodModel.create(req.body)
    res.status(201).json(food)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
  }
}

const deleteById = async (req, res) => {
  /*
    #swagger.tags = ['Foods']
    #swagger.summary = 'Delete a food item'
    #swagger.description = 'Remove a food item from the database by its ID'
    #swagger.parameters['id'] = { description: 'Food ID' }
    #swagger.responses[200] = {
      description: 'Food deleted successfully',
      schema: { message: 'Food deleted successfully' }
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
    const food = await foodModel.deleteById(req.params.id)
    if (!food) {
      return res.status(404).json({ message: 'Food not found' })
    }
    res.status(200).json({ message: 'Food deleted successfully' })
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
