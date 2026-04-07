const router = require('express').Router()
const foodController = require('../controllers/food.controller')

router.get('/', foodController.getAll)
router.get('/:id', foodController.getById)

router.put('/:id', foodController.update)
router.post('/', foodController.create)
router.delete('/:id', foodController.deleteById)

module.exports = router
