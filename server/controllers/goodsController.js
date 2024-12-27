const uuid = require('uuid')
const path = require('path')
const { Goods, GoodsInfo } = require('../models/models')
const ApiError = require('../error/ApiError')
const { where } = require('sequelize')
const { title } = require('process')

class GoodsController {
    async create(req,res,next){
        try{
            let { name, price, brandId, typeId, info } = req.body;
           
            
            let img = req.files ? req.files.img : null;
     let fileName;
          
            if (!img) {
                fileName = 'default.jpg';
            } else {
                
                fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));  // Перемещаем файл
         
            }
        const goods = await Goods.create({name, price, brandId, typeId, img: fileName})

        if (info) {
            info = JSON.parse(info);
            
            await Promise.all(info.map(i =>
                GoodsInfo.create({
                    title: i.title,
                    description: i.description,
                    goodId: goods.id
                })
            ));
        }
        return res.json(goods)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
       
    }
    async getAll(req, res) {
        const { brandId, typeId, page = 1, limit = 9 } = req.query;
        let goods;
        let offset = (page - 1) * limit;
    
        if (!brandId && !typeId) {
            goods = await Goods.findAndCountAll({ limit, offset });
        }
        if (brandId && !typeId) {
            goods = await Goods.findAndCountAll({ where: { brandId }, limit, offset });
        }
        if (!brandId && typeId) {
            goods = await Goods.findAndCountAll({ where: { typeId }, limit, offset });
        }
        if (brandId && typeId) {
            goods = await Goods.findAndCountAll({ where: { brandId, typeId }, limit, offset });
        }
    
        return res.json(goods);
    }
    async getOne(req,res){
        const {id} = req.params
        const goods = await Goods.findOne(
            {
                where: {id},
                include: [{model:GoodsInfo, as: 'info' }]
            }
        )
        return res.json(goods)
    }
}

module.exports = new GoodsController()