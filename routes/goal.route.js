const router = require('express').Router()
const goalController = require('../controllers/goal.controller')
const {
  requireBody,
  validateObjectIdParam,
} = require('../middleware/request.middleware')

router.param('id', validateObjectIdParam)

router.get('/', goalController.getAll)
router.get('/:id', goalController.getById)

router.put('/:id', requireBody, goalController.update)
router.post('/', requireBody, goalController.create)
router.delete('/:id', goalController.deleteById)

module.exports = router
