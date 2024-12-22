const uuid = require('uuid')
const path = require('path')
const { Goods } = require('../models/models')
const ApiError = require('../error/ApiError')
const { where } = require('sequelize')

class GoodsController {
    async create(req,res,next){
        try{
             const {name, price, brandId, typeId, info} = req.body
        const {img} = req.files
        let fileName = uuid.v4()+".jpg"
        img.mv(path.resolve(__dirname,'..','static',fileName))

        const goods = await Goods.create({name, price, brandId, typeId, img: fileName})

        return res.json(goods)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
       
    }
    async getAll(req,res){
        const {brandId, typeId} = req.body
        let goods;
        if (!brandId && !typeId){
            goods = await Goods.findAll()

        }
        if (brandId && !typeId){
            goods = await Goods.findAll({where:{brandId}})

        }
        if (!brandId && typeId){
            goods = await Goods.findAll({where:{typeId}})
        }
        if (brandId && typeId){
            goods = await Goods.findAll({where:{brandId, brandId}})
        }

        return res.json(goods)


    }
    async getOne(req,res){
        
    }
}

module.exports = new GoodsController()