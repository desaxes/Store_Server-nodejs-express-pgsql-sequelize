const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceControllers')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), deviceController.addDevice)
router.get('/', deviceController.getAllDevice)
router.get('/:id', deviceController.getDeviceById)

module.exports = router