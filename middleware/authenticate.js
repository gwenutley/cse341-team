//check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next()
  }
  res.status(401).json("You don't have access.")
}

module.exports = {
  isAuthenticated,
}
