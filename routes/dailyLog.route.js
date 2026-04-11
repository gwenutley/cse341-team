const router = require('express').Router()
const dailyLogController = require('../controllers/dailyLog.controller')

router.get('/', dailyLogController.getAll)
router.get('/:id', dailyLogController.getById)

router.put('/:id', dailyLogController.update)
router.post('/', dailyLogController.create)
router.delete('/:id', dailyLogController.deleteById)

module.exports = router
