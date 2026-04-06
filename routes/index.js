const router = require('express').Router()

router.use('/foods', require('./food.route'))
router.use('/users', require('./user.route'))

module.exports = router
