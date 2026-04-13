const router = require('express').Router()
const passport = require('passport')

//authentication routes
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json('Error logging out.')
    }
    res.clearCookie('connect.sid')
    res.redirect('/')
  })
})

module.exports = router
