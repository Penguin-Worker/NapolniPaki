const Router = require('express')
const router = new Router()
const goodsController = require('../controllers/goodsController')
const checkrole = require('../middleware/checkRoleMeiddleware')

router.post('/',checkrole('ADMIN'),goodsController.create)
router.get('/',goodsController.getAll)
router.get('/:id',goodsController.getOne)
router.delete('/:id',goodsController.delete)

module.exports = router