const {Goods,Basket,BasketGoods} = require('../models/models')
const ApiError = require('../error/ApiError')
class BasketController {
  async addToBasket(req, res, next) {
    try {
        const { goodId, userId } = req.body;

        const goods = await Goods.findByPk(goodId);
        console.log()
        if (!goods) {
            return res.status(404).json({ message: "Товар не найден", goods });
        }

        let basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            basket = await Basket.create({ userId });
        }

        const basketGoods = await BasketGoods.findOne({
            where: { basketId: basket.id, goodId }
        });
        if (basketGoods) {
            return res.status(400).json({ message: "Товар уже в корзине" });
        }

      
        const newBasketGoods = await BasketGoods.create({
            basketId: basket.id,
            goodId
        });

        return res.json({ message: "Товар добавлен в корзину", basketGoods: newBasketGoods });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}
  
    
     
      async getBasket(req, res) {
        try {
          const { userId } = req.params;
    
          const basket = await Basket.findOne({ where: { userId } });
          if (!basket) {
            return res.status(404).json({ message: 'Корзина не найдена' });
          }
    
          
          const basketGoods = await BasketGoods.findAll({
            where: { basket_id: basket.id },
            include: [{ model: Goods, attributes: ['id', 'name', 'price', 'img'] }],
          });
    
          return res.json(basketGoods);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Ошибка получения корзины' });
        }
      }
    
     
      async removeFromBasket(req, res) {
        try {
          const { id } = req.params;
    
          await BasketGoods.destroy({ where: { id } });
    
          return res.json({ message: 'Товар успешно удалён из корзины' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Ошибка удаления товара из корзины' });
        }
      }
    }

module.exports = new BasketController()