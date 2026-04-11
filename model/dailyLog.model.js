const DailyLog = require('../database/schemas/dailyLog.schema')

const findAll = async () => {
  return await DailyLog.find()
}

const findById = async id => {
  return await DailyLog.findById(id)
}

const create = async dailyLogData => {
  return await DailyLog.create(dailyLogData)
}

const updateById = async (id, updateData) => {
  return await DailyLog.findByIdAndUpdate(id, updateData, {
    returnDocument: 'after',
  })
}

const deleteById = async id => {
  return await DailyLog.findByIdAndDelete(id)
}

const deleteMany = async filter => {
  return await DailyLog.deleteMany(filter)
}

const insertMany = async dailyLogs => {
  return await DailyLog.insertMany(dailyLogs)
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
