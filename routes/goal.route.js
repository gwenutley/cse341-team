const router = require('express').Router()
const goalController = require('../controllers/goal.controller')
const { isAuthenticated } = require('../middleware/authenticate')
const {
  requireBody,
  validateObjectIdParam,
} = require('../middleware/request.middleware')

router.param('id', validateObjectIdParam)

router.get('/', goalController.getAll)
router.get('/:id', goalController.getById)

router.put('/:id', isAuthenticated, requireBody, goalController.update)
router.post('/', isAuthenticated, requireBody, goalController.create)
router.delete('/:id', isAuthenticated, goalController.deleteById)

module.exports = router
