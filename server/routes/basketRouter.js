const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkrole = require('../middleware/checkRoleMeiddleware')

router.post('/add', basketController.addToBasket);
router.get('/:userId', basketController.getBasket);
router.post('/remove', basketController.removeFromBasket);
router.get('/basket/:userId', basketController.getBasketId);

module.exports = router;