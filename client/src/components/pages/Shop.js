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
const Shop = observer( () => {
  const {goods} = useContext(Context)
  useEffect(() => {
    const loadData = async () => {
      const types = await fetchTypes();
      goods.setTypes(types);
      const brands = await fetchBrands();
      goods.setBrands(brands);
      const fetchedGoods = await fetchGoods();
      goods.setGoods(fetchedGoods.rows); 
    };

    loadData().catch(error => {
      console.error("Ошибка при загрузке данных:", error);
    });
  }, [goods]);
  return (
    <Container>
     <Row className='mt-2'>
      <Col md={3}>
      <TypeBar/>
      </Col>
      <Col md={9}>
      <BrandBar/>
      <GoodsList/>
      </Col>
     </Row>
    </Container>
  );
})

export default Shop;