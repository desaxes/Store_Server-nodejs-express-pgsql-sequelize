const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeControllers')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), typeController.create)
router.get('/', typeController.getAll)


module.exports = router