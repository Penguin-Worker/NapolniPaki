import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TypeBar from '../TypeBar';
import BrandBar from '../BrandBar';
import Col from 'react-bootstrap/Col';
import GoodsList from '../GoodsList';
const Shop= () => {
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
}

export default Shop;