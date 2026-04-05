const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

//return all foods in the database
const getAllFoods = async (req, res) => {
  try {
    const foods = await mongodb
      .getDatabase()
      .db('cse341_team')
      .collection('foods')
      .find()
      .toArray()
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(foods)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'An error occurred while retrieving foods.' })
  }
}

//return a food from the database by its id
const getFoodById = async (req, res) => {
  //check the format of the id is correct
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid food ID format.' })
  }
  try {
    const foodId = new ObjectId(req.params.id)
    const result = await mongodb
      .getDatabase()
      .db('cse341_team')
      .collection('foods')
      .findOne({ _id: foodId })

    //check there is a food with the id
    if (!result) {
      return res.status(404).json({ message: 'Food not found.' })
    }

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'An error occurred while retrieving the food.' })
  }
}

module.exports = {
  getAllFoods,
  getFoodById,
}
