const toJSONPlugin = schema => {
  schema.set('toJSON', {
    transform: (_, ret) => {
      ret.id = ret._id.toString()
      delete ret._id
      delete ret.__v
      delete ret.password
      return ret
    },
  })
}

module.exports = toJSONPlugin
