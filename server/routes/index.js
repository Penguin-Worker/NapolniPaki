const Router = require('express')
const router = new Router()
const goodsRouter = require('./goodsRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const raitingRouter= require('./raitingRouter')

router.use('/user' , userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/goods', goodsRouter)
router.use('/rating', raitingRouter)


module.exports = router