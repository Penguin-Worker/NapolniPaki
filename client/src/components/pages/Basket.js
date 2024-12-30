import React, { useContext } from 'react';
import { Context } from '../..';
import { Container, Button, Row, Col,Badge } from 'react-bootstrap';
import { SHOP_ROUTE } from '../utils/consts';
import {useNavigate} from 'react-router-dom';



const Basket = () => {
  const { user } = useContext(Context);    
  const navigate = useNavigate()
 
  return (
    <Container className="mt-4">
      <Row className='d-flex m-2'>
      
      <h1 style={{color:'gray'}}>Hello <Badge bg="outline-dark" style={{color:'gray'}}>{user.user.email}</Badge>
      <Button className='ms-2' variant="secondary" onClick={() => navigate(SHOP_ROUTE)}>Go to Shop</Button>
      <hr style={{width:''}}/></h1>
         
        <Col className='mt-2' md={5}>
        
        <Row>
        <Badge bg="secondary" >
        <h2 >Profile Info</h2>
          <p >Email: {user.user.email}</p>
          <p>Role: {user.user.role}</p>
          </Badge>
          </Row>

      <Row className='mt-3'>        
      <Badge bg="secondary" >
        <h2 >History Info</h2>
          <p>sometime in the future</p>
          </Badge>
                </Row>
                <Row className='mt-3'>        
      <Badge bg="secondary" >
        <h2 >Favorite</h2>
          <div>Items</div>
          <Button className='mt-2' variant="outline-light" onClick={() => navigate(SHOP_ROUTE)}>Report</Button>
          </Badge>
          
                </Row>
                
        </Col>
        <Col className='mt-2'>
        
        <Badge bg="secondary" style={{color:'lightgray'}}>
        <Row className='align-items-center justify-content-around '>
          <h2>Your Basket</h2> 
          
        </Row>
        <Row>          
          <div>Items</div>
        </Row>
        <Row><h4>Total Price: $</h4></Row>
        <Button className='mt-2' variant="outline-light" onClick={() => navigate(SHOP_ROUTE)}>Report</Button>
          
        </Badge>
        </Col>
      </Row>
      <hr style={{width:'0'}}/>
      <hr style={{width:'0'}}/>
      <hr style={{width:'0'}}/>
      <hr style={{width:'0'}}/>
      <hr style={{width:'0'}}/>
        </Container>
        
  );
};

export default Basket;
