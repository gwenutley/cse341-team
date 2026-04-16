//check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.status(401).json("You don't have access.")
  }
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next()
  } else {
    res.status(403).json('Admin access required.')
  }
}

module.exports = {
  isAuthenticated,
  isAdmin,
}
