const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkrole = require('../middleware/checkRoleMeiddleware')

router.post('/add', basketController.addToBasket);
router.get('/:user_id', basketController.getBasket);
router.delete('/:id', basketController.removeFromBasket);

module.exports = router;