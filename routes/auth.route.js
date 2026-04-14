const router = require('express').Router()
const passport = require('passport')

//authentication routes
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

module.exports = router
