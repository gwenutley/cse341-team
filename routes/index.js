const router = require('express').Router()

router.use('/foods', require('./food.router'))

module.exports = router
