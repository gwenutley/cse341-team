const router = require('express').Router()
const dailyLogController = require('../controllers/dailyLog.controller')
const {
  requireBody,
  validateObjectIdParam,
} = require('../middleware/request.middleware')

router.param('id', validateObjectIdParam)

const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', isAuthenticated, dailyLogController.getAll)
router.get('/:id', isAuthenticated, dailyLogController.getById)

router.put('/:id', isAuthenticated, requireBody, dailyLogController.update)
router.post('/', isAuthenticated, requireBody, dailyLogController.create)
router.delete('/:id', isAuthenticated, dailyLogController.deleteById)

module.exports = router
