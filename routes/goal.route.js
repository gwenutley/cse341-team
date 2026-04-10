const router = require('express').Router()
const goalController = require('../controllers/goal.controller')

router.get('/', goalController.getAll)
router.get('/:id', goalController.getById)

router.put('/:id', goalController.update)
router.post('/', goalController.create)
router.delete('/:id', goalController.deleteById)

module.exports = router
