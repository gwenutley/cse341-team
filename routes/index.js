const router = require('express').Router()

router.get('/', (_req, res) => {
  res.send(`
    <h1>Welcome to the CSE341 Team API</h1>
    <p>Please visit the <a href="/api-docs">API Documentation</a> to view the full docs and available endpoints.</p>
  `)
})
router.use('/foods', require('./food.route'))
router.use('/users', require('./user.route'))

module.exports = router
