const router = require('express').Router()
const passport = require('passport')
const userController = require('../controllers/user.controller')
const { isAuthenticated } = require('../middleware/authenticate')

router.get(
  '/github',
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Authenticate with GitHub'
    #swagger.description = 'Initiate GitHub OAuth2 authentication process'
  */
  passport.authenticate('github', { scope: ['user:email'] })
)
//redirect the user after login
router.get(
  '/github/callback',
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'GitHub OAuth2 callback'
    #swagger.description = 'Callback URL for GitHub OAuth2 authentication'
  */
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
  }),
  (req, res) => {
    res.redirect('/')
  }
)

router.get('/me', isAuthenticated, userController.getMe)

//authentication routes
router.get(
  '/login',
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Login with GitHub'
    #swagger.description = 'Initiate GitHub OAuth2 login process'
  */
  passport.authenticate('github', { scope: ['user:email'] })
)

router.get('/logout', (req, res, next) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Logout'
    #swagger.description = 'Terminate the current session'
    #swagger.responses[200] = {
      description: 'Logged out successfully',
      schema: { message: 'Logged out successfully' }
    }
  */
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.json({ message: 'Logged out successfully' })
  })
})

module.exports = router
