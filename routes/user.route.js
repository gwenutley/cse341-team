const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.put('/:id', isAuthenticated, userController.update)
router.post('/', isAuthenticated, userController.create)
router.delete('/:id', isAuthenticated, userController.deleteById)

module.exports = router
