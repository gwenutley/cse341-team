const router = require('express').Router()
const passport = require('passport')

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)
//redirect the user after login
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
  }),
  (req, res) => {
    res.redirect('/')
  }
)

//authentication routes
router.get(
  '/login',
  passport.authenticate('github', { scope: ['user:email'] }),
  (req, res) => {
    console.log(req.user)
  }
)

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
    console.log('logged out')
  })
})

module.exports = router
