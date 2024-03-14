const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandControllers')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

router.post('/',checkRoleMiddleware("ADMIN"),brandController.create)
router.get('/',brandController.getAll)


module.exports = router