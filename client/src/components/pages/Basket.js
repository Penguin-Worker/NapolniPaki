import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../..';
import { Container, Button, Row, Col, Badge } from 'react-bootstrap';
import { SHOP_ROUTE, ADMIT_ROUTE, ADMIN_REPORT } from '../utils/consts';
import {useParams, useNavigate } from 'react-router-dom';
import { getBasket, fetchOneGoods, removeFromBasket , fetchBasketId} from '../../http/goodAPI';
import { observer } from 'mobx-react-lite';

const Basket = observer(() => {
  const { user,goods: goodsStore } = useContext(Context); 
     
  const navigate = useNavigate();
  const [basketItems, setBasketItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); 
  const [basketId, setBasketId] = useState();
  const [goodData, setGoodsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const {id} = useParams()

useEffect(() => {
  if (user.user.id) {
    setIsLoading(true);  
    getBasket(user.user.id)
      .then(response => {
        setIsLoading(false);  
        
        if (response && response.length > 0) {
          setBasketItems(response);
        } else {
          setBasketItems([]);
          
        }
      })
      .catch(error => {
        setIsLoading(false);
        
        setError('Произошла ошибка при загрузке корзины');
      });
  }
}, [user.user.id]);

useEffect(() => {
  if (user.user.id) {
    fetchBasketId(user.user.id)
      .then((basketId) => {
        setBasketId(basketId);
       
      })
      .catch((error) => {
        console.error("Ошибка при получении basketId", error);
      });
  }
}, [user.user.id]);

const handleRemoveFromBasket = (goodId) => {
  if (!basketId) {
    alert('Корзина не найдена.');
    return;
  }

  removeFromBasket(basketId, goodId)
    .then((response) => {
      alert(response.message);
      setBasketItems(basketItems.filter(item => item.goodId !== goodId));
    })
    .catch((error) => {
      alert('Ошибка при удалении товара');
    });
};


{isLoading && <div>Загрузка...</div>}

{error && <div style={{ color: 'red' }}>{error}</div>}



  return (
    <Container className="mt-4">
      <Row className='d-flex m-2'>
        <h1 style={{color:'gray'}}>
          Hello <Badge bg="outline-dark" style={{color:'gray'}}>{user.user.email}</Badge>
          <Button className='ms-2' variant="secondary" onClick={() => navigate(SHOP_ROUTE)}>Go to Shop</Button>
          <hr style={{width:''}}/>
        </h1>
        
        <Col className='mt-2' md={5}>
        
          <Row>
            <Badge bg="secondary">
              <h2>Profile Info</h2>
              <p>Email: {user.user.email}</p>
              <p>Role: {user.user.role}</p>
            </Badge>
          </Row>

          <Row className='mt-3'>
            <Badge bg="secondary" style={{color:'lightgray'}}>
              <Row className='align-items-center justify-content-around'>
                <h2>Your Basket</h2>
              </Row>
              <Row>                
  {basketItems.length === 0 ? (
    <div>Корзина пуста</div>
  ) : (
    basketItems.map((item, index) => {
      
      return (
        <div key={`${item.id}-${index}`}style={{ marginBottom: '15px' }}>
          <Row>
                      <Col>
                        <h4>Good ID: {item} </h4> 
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveFromBasket(item)}>
                          Удалить
                        </Button>
                      </Col>
                    </Row>
        </div>
      );
    })
  )}
</Row>


              <Row><h4>Total Price: ${totalPrice}</h4></Row>
              <Button className='mt-2' variant="outline-light" onClick={() => navigate(SHOP_ROUTE)}>Report</Button>
            </Badge>
          </Row>

          {user.user.role === 'ADMIN' && (      
            <Row className='mt-3'>  
              <Badge bg="secondary">
                <h2>O hey look</h2>          
                <Button variant='outline-light' onClick={()=> navigate(ADMIT_ROUTE)}>AdminPanel</Button>
                <Button className='ms-2' variant='outline-light' onClick={()=>navigate(ADMIN_REPORT)}>Users Report</Button>
              </Badge>
            </Row>
          )}
        </Col>        
      </Row>
      <hr style={{width:'0'}}/>
      <hr style={{width:'0'}}/>
      <hr style={{width:'0'}}/>
      <hr style={{width:'0'}}/>
      <hr style={{width:'0'}}/>
    </Container>
  );
});

export default Basket;
