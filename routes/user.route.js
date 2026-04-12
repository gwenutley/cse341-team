const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const {
  requireBody,
  validateObjectIdParam,
} = require('../middleware/request.middleware')

router.param('id', validateObjectIdParam)

router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.put('/:id', requireBody, userController.update)
router.post('/', requireBody, userController.create)
router.delete('/:id', userController.deleteById)

module.exports = router
