import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '..';
import Row from 'react-bootstrap/Row';
import GoodItem from './GoodItem';
import CalcilateRange from './CalcilateRange';
import { useSearchParams } from 'react-router-dom';

const GoodsList= observer(() => {
    const {goods} = useContext(Context)
    const [minPrice, setMinPrice] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
      const minPriceParam = Number(searchParams.get('minPrice')) || 0;
      setMinPrice(minPriceParam);
    }, [searchParams]);
    const filteredGoods = goods.goods.filter((item) => {
      const matchesType = goods.selectedType.id ? item.typeId === goods.selectedType.id : true;
      const matchesBrand = goods.selectedBrand.id ? item.brandId === goods.selectedBrand.id : true;
      const matchesPrice = item.price >= minPrice;
  
      return matchesType && matchesBrand && matchesPrice;
    });
    const handleFilterByPrice = (price) => {
      setMinPrice(price);
      searchParams.set('minPrice', price);
      setSearchParams(searchParams);
    };
    
    return (
      <div>
        <CalcilateRange price={minPrice} onFilter={handleFilterByPrice} /> 
        <Row className="d-flex">
          {filteredGoods.length > 0 ? (
            filteredGoods.map((good) => <GoodItem key={good.id} goods={good} />)
          ) : (
            <p>Пусто: подходящие товары не найдены.</p>
          )}
        </Row>
      </div>
    );
  });
export default GoodsList;