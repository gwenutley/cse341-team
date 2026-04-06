const foodModel = require('../model/food.model')

const getAll = async (_req, res) => {
  try {
    const foods = await foodModel.findAll()
    res.status(200).json(foods)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getById = async (req, res) => {
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

module.exports = {
  getAll,
  getById,
  update,
}
