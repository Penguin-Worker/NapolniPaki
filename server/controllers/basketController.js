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
      where: { basketId: basket.id },  
    });

    const goodIds = basketGoods.map(item => item.goodId);

    console.log('Товары в корзине (goodId):', goodIds);  

    return res.json(goodIds);
  } catch (error) {
    console.error('Ошибка получения корзины:', error);
    return res.status(500).json({ message: 'Ошибка получения корзины' });
  }
}

async getBasketId(req, res) {
  try {
    const { userId } = req.params;  

    const basket = await Basket.findOne({
      where: { userId },  
    });

    if (!basket) {
      return res.status(404).json({ message: 'Корзина не найдена' });
    }

    return res.json({ basketId: basket.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка получения basketId' });
  }
}


    
     
async removeFromBasket(req, res) {
  try {
    const { basketId, goodId } = req.body; 
    const deleted = await BasketGoods.destroy({
      where: { basketId, goodId } 
    });

    if (deleted) {
      return res.json({ message: 'Товар успешно удалён из корзины' });
    } else {
      return res.status(404).json({ message: 'Товар не найден в корзине' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка удаления товара из корзины' });
  }
}


}
module.exports = new BasketController()