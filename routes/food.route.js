const router = require('express').Router()
const foodController = require('../controllers/food.controller')
const {
  requireBody,
  validateObjectIdParam,
} = require('../middleware/request.middleware')

router.param('id', validateObjectIdParam)

router.get('/', foodController.getAll)
router.get('/:id', foodController.getById)

router.put('/:id', requireBody, foodController.update)
router.post('/', requireBody, foodController.create)
router.delete('/:id', foodController.deleteById)

module.exports = router
