//check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).json("You don't have access.")
}

module.exports = {
  isAuthenticated,
}
