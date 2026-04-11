const router = require('express').Router()
const passport = require('passport')

router.get('/', (_req, res) => {
  res.send(`
    <h1>Welcome to the CSE341 Team API</h1>
    <p>Please visit the <a href="/api-docs">API Documentation</a> to view the full docs and available endpoints.</p>
  `)
})

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

router.use('/foods', require('./food.route'))
router.use('/users', require('./user.route'))
router.use('/goals', require('./goal.route'))
router.use('/daily-logs', require('./dailyLog.route'))

module.exports = router
