import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TypeBar from '../TypeBar';
import BrandBar from '../BrandBar';
import Col from 'react-bootstrap/Col';
import GoodsList from '../GoodsList';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { fetchTypes, fetchBrands, fetchGoods } from '../../http/goodAPI';
import Pages from '../Pages';
const Shop = observer( () => {
  const {goods} = useContext(Context)
  useEffect(() => {
    const loadData = async () => {
      const types = await fetchTypes();
      goods.setTypes(types);
      const brands = await fetchBrands();
      goods.setBrands(brands);
      const fetchedGoods = await fetchGoods(null,null,1,3);
      goods.setGoods(fetchedGoods.rows); 
      goods.setTotalCount(fetchedGoods.count);
    };
    
    loadData().catch(error => {
      console.error("Ошибка при загрузке данных:", error);
    });
  }, [goods]);
  useEffect(() => {
    const loadData = async () => {
      try {
        // Загружаем товары с учетом выбранных типа, бренда и страницы
        const fetchedGoods = await fetchGoods(goods.selectedType.id, goods.selectedBrand.id, goods.page, goods.limit);
        goods.setGoods(fetchedGoods.rows); 
        goods.setTotalCount(fetchedGoods.count);
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      }
    }; loadData();
  },[goods.page,goods.selectedType,goods.selectedBrand])
 
  return (
    <Container>
     <Row className='mt-2'>
      <Col md={3}>
      <TypeBar/>
      </Col>
      <Col md={9}>
      <BrandBar/>
      <GoodsList/>
      <Pages/>
      </Col>
     </Row>
    </Container>
  );
})

export default Shop;