const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User , Basket} = require('../models/models')
const generateJwt = (id,email,role) =>{
    return jwt.sign({id, email, role},
        process.env.SECRET_KEY,
       {expiresIn:'24h'}
   )
   
}

class UserController {
    async registration(req,res,next){
        const {email, password, role}= req.body
        if(!email && !password){
            return next(ApiError.badRequest('none correct input'))
        }
        const candidate=await User.findOne({where:{email}})
        if(candidate){
            return next(ApiError.badRequest('email was occupid'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({UserId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})

    }
    async login(req,res,next){
        const {email,password}=req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.internal('none exist'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('wrong pass'))
        }
        const token = generateJwt(user.id,user.email, user.role)
        return res.json({token})
    }
    async check(req,res,next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
    async report(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'email', 'role', 'createdAt'],   });
            const formattedUsers = users.map(user => ({
                id: user.id,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }));
            res.status(200).json(formattedUsers); } catch (error) {
            console.error('Ошибка при получении данных о пользователях:', error);
            return next(ApiError.internal('Ошибка при получении данных о пользователях'));
        }
    }
}

module.exports = new UserController()