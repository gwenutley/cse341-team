//check if user is authenticated
const isAuthenticated = (req, res, next) => {
  //block user if not authenticated
  if (req.session.user === undefined) {
    return res.status(401).json("You don't have access.")
  }
  //continue if user is authenticated
  next()
}

module.exports = {
  isAuthenticated,
}
