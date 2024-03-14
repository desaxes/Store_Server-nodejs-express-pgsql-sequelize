const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceControllers')

router.post('/',deviceController.addDevice)
router.get('/',deviceController.getAllDevice)
router.get('/:id',deviceController.getDeviceById)

module.exports = router