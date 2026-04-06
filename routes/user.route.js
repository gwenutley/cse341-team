const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.put('/:id', userController.update)
router.post('/', userController.create)
router.delete('/:id', userController.deleteById)

module.exports = router
