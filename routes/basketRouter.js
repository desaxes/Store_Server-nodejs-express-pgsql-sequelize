const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketControllers')

router.post('/', basketController.addDeviceToBasket)
router.get('/', basketController.getUserBasket)
router.get('/devices', basketController.getDevices)
router.get('/check', basketController.checkDevice)
router.delete('/drop',basketController.removeDevice)
module.exports = router