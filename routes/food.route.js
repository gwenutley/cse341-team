const router = require('express').Router()
const foodController = require('../controllers/food.controller')
const {
  requireBody,
  validateObjectIdParam,
} = require('../middleware/request.middleware')

router.param('id', validateObjectIdParam)

const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', foodController.getAll)
router.get('/:id', foodController.getById)


router.put('/:id', isAuthenticated, requireBody, foodController.update)
router.post('/', isAuthenticated, requireBody, foodController.create)
router.delete('/:id', isAuthenticated, foodController.deleteById)

module.exports = router
