const Router = require('express')
const router = new Router()
const raitingController = require('../controllers/raitingController')
const checkrole = require('../middleware/checkRoleMeiddleware')

router.post('/', raitingController.create);
router.get('/', raitingController.getAll);
router.get('/:goodId', raitingController.getByGoodId);

module.exports = router;