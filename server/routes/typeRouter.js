const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkrole = require('../middleware/checkRoleMeiddleware')

router.post('/',checkrole('ADMIN'), typeController.create)
router.get('/',typeController.getAll)

module.exports = router