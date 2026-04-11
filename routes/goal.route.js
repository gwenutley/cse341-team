const router = require('express').Router()
const goalController = require('../controllers/goal.controller')
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', goalController.getAll)
router.get('/:id', goalController.getById)

router.put('/:id', isAuthenticated, goalController.update)
router.post('/', isAuthenticated, goalController.create)
router.delete('/:id', isAuthenticated, goalController.deleteById)

module.exports = router
