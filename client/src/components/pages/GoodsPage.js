import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/esm/Image';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import star from '../../assets/StarB.png';
import Button from 'react-bootstrap/esm/Button';
import { useParams } from 'react-router-dom';
import { fetchOneGoods } from '../../http/goodAPI';
const GoodsPage= () => {
  const [goods, setGoods] = useState({info:[]})
  const {id} = useParams()
  useEffect(() => {
    fetchOneGoods(id).then(data => setGoods(data))
  }, [goods]);
  return (
    <Container className='mt-3'>
      <Row>
      <Col md={4}>
      <Image  width={300} height={300} src={process.env.REACT_APP_API_URL + goods.img}/>
      </Col>
      <Col md={4}>
      <Row className='d-flex align-items-center'>
        <h2>{goods.name}</h2>
        <div className='d-flex align-items-center justify-content-center'
        style={{background:`url(${star}) no-repeat center center `, width:240, height:240, backgroundSize: 'cover', fontSize:48 }}>
        {goods.rating}
        </div>
      </Row>
      </Col>
      <Col md={4}>
      <Card className='d-felx flex-column align-items-center justify-content-around'
      style={{width:300,height:300,fontSize:28, border:'5px solid lightgray'}}>
    <h3>{goods.name}</h3>
    <h3>From: {goods.price} $</h3>
    <Button variant='outline-dark'>BUY</Button>
      </Card>
      </Col>
      </Row>
      <Row className='d-flex flex-column m-3'>
        <h1>Details</h1>
        {goods.info.map((info  ,index )=>
          <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray':'transparent', padding:10}}> 
            {info.title} : {info.description}
          </Row>
        )}
      </Row>
    </Container>
  );
}

export default GoodsPage;