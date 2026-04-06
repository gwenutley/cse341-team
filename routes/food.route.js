const router = require('express').Router()
const foodController = require('../controllers/food.controller')

router.get('/', foodController.getAll)
router.get('/:id', foodController.getById)

module.exports = router
