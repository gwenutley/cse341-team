const router = require('express').Router()
const foodController = require('../controllers/food.controller')

const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', foodController.getAll)
router.get('/:id', foodController.getById)

router.put('/:id', isAuthenticated, foodController.update)
router.post('/', isAuthenticated, foodController.create)
router.delete('/:id', isAuthenticated, foodController.deleteById)

module.exports = router
