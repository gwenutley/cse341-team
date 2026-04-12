const router = require('express').Router()
const dailyLogController = require('../controllers/dailyLog.controller')
const {
  requireBody,
  validateObjectIdParam,
} = require('../middleware/request.middleware')

router.param('id', validateObjectIdParam)

router.get('/', dailyLogController.getAll)
router.get('/:id', dailyLogController.getById)

router.put('/:id', requireBody, dailyLogController.update)
router.post('/', requireBody, dailyLogController.create)
router.delete('/:id', dailyLogController.deleteById)

module.exports = router
