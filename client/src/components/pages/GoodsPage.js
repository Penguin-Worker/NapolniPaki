import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/esm/Image';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import star from '../../assets/StarB.png';
import Button from 'react-bootstrap/esm/Button';
const GoodsPage= () => {
  const goods = {id:1,name:"Laminat France",price:1200, rating:0,img:"28e93d0c-0359-48e1-b78d-933ddd9383ff.jpg"}
  const description = [
    {id:1,title:'name Some text', description:'details'},
    {id:2,title:'name Some text', description:'details'},
    {id:3,title:'name Some text', description:'details'},
    {id:4,title:'name Some text', description:'details'},
    {id:5,title:'name Some text', description:'details'}
  ]
  return (
    <Container className='mt-3'>
      <Row>
      <Col md={4}>
      <Image  width={300} height={300} src={goods.img}/>
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
        {description.map((info  ,index )=>
          <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray':'transparent', padding:10}}> 
            {info.title} : {info.description}
          </Row>
        )}
      </Row>
    </Container>
  );
}

export default GoodsPage;