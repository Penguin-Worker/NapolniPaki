const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkrole = require('../middleware/checkRoleMeiddleware')

router.post('/',checkrole('ADMIN'),brandController.create)
router.get('/',brandController.getAll)

module.exports = router