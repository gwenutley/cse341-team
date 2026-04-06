const router = require('express').Router()

router.use('/foods', require('./food.route'))

module.exports = router
