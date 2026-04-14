const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { isAuthenticated } = require('../middleware/authenticate')

const {
  requireBody,
  validateObjectIdParam,
} = require('../middleware/request.middleware')

router.param('id', validateObjectIdParam)

const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.put('/:id', isAuthenticated, requireBody, userController.update)
router.post('/', isAuthenticated, requireBody, userController.create)
router.delete('/:id', isAuthenticated, userController.deleteById)

module.exports = router
