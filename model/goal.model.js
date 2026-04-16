const Goal = require('../database/schemas/goal.schema')

const findAll = async () => {
  return await Goal.find()
}

const findAllByUserId = async userId => {
  return await Goal.find({ user: userId })
}

const findById = async id => {
  return await Goal.findById(id)
}

const create = async goalData => {
  return await Goal.create(goalData)
}

const updateById = async (id, updateData) => {
  return await Goal.findByIdAndUpdate(id, updateData, {
    returnDocument: 'after',
    runValidators: true,
    context: 'query',
  })
}

const deleteById = async id => {
  return await Goal.findByIdAndDelete(id)
}

const deleteMany = async filter => {
  return await Goal.deleteMany(filter)
}

const insertMany = async goals => {
  return await Goal.insertMany(goals)
}

module.exports = {
  findAll,
  findAllByUserId,
  findById,
  create,
  updateById,
  deleteById,
  deleteMany,
  insertMany,
}
