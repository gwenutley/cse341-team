const User = require('../database/schemas/user.schema')

const findAll = async () => {
  return await User.find()
}

const findById = async id => {
  return await User.findById(id)
}

const create = async userData => {
  return await User.create(userData)
}

const updateById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, {
    returnDocument: 'after',
  })
}

const deleteById = async id => {
  return await User.findByIdAndDelete(id)
}

const deleteMany = async filter => {
  return await User.deleteMany(filter)
}

const insertMany = async users => {
  return await User.insertMany(users)
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
