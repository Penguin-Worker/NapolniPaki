import React, { useContext } from 'react';
import { Context } from '../..';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { SHOP_ROUTE } from '../utils/consts';
import {useNavigate} from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Basket = observer(() => {
  const { user } = useContext(Context);  
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  return (
    <Container className="mt-5">
      <h1>Your Profile & Basket</h1>
      
      {/* Профиль пользователя */}
      
        <div>
          <h3>Profile Information</h3>
          <p>Email: {user.user.email}</p>
          <p>Role: {user.user.role}</p>
        </div>
      

      {/* Корзина */}
      <h3 className="mt-4">Your Basket</h3>
      
      
      <h4>Total Price: $</h4>

      {/* Кнопка для перехода в магазин */}
      <Button variant="outline-dark" onClick={() => navigate(SHOP_ROUTE)}>Go to Shop</Button>
    </Container>
  );
});

export default Basket;
