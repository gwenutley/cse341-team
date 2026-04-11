const router = require('express').Router()
const dailyLogController = require('../controllers/dailyLog.controller')

const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', dailyLogController.getAll)
router.get('/:id', dailyLogController.getById)

router.put('/:id', isAuthenticated, dailyLogController.update)
router.post('/', isAuthenticated, dailyLogController.create)
router.delete('/:id', isAuthenticated, dailyLogController.deleteById)

module.exports = router
