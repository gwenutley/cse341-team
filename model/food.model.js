const Food = require('../database/schemas/food.schema')

const findAll = async () => {
  return await Food.find()
}

const findById = async id => {
  return await Food.findById(id)
}

const create = async foodData => {
  return await Food.create(foodData)
}

const updateById = async (id, updateData) => {
  return await Food.findByIdAndUpdate(id, updateData, {
    returnDocument: 'after',
    runValidators: true,
    context: 'query',
  })
}

const deleteById = async id => {
  return await Food.findByIdAndDelete(id)
}

const deleteMany = async filter => {
  return await Food.deleteMany(filter)
}

const insertMany = async foods => {
  return await Food.insertMany(foods)
}

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  deleteMany,
  insertMany,
}
