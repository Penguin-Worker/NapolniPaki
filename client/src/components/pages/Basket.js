import React, { useContext, useState, useEffect } from 'react'; 
import { Context } from '../..';
import { Container, Button, Row, Col, Badge } from 'react-bootstrap';
import { SHOP_ROUTE, USER_REPORT, ADMIN_REPORT, ADMIT_ROUTE } from '../utils/consts';
import { useParams, useNavigate } from 'react-router-dom';
import { getBasket, fetchOneGoods, removeFromBasket, fetchBasketId } from '../../http/goodAPI';
import { observer } from 'mobx-react-lite';
import AdminReport from '../Reports/AdminReport'
import UserBasketReport from '../Reports/UserBasketReport'
const Basket = observer(() => {
  const { user } = useContext(Context); 
  const navigate = useNavigate();
  
  const [basketItems, setBasketItems] = useState([]); 
  const [basketId, setBasketId] = useState(null);
  const [goodsData, setGoodsData] = useState({}); 
  const [totalPrice, setTotalPrice] = useState(0); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (user.user.id) {
      setIsLoading(true);
      getBasket(user.user.id)
        .then(async (response) => {
          setIsLoading(false);
          if (response && response.length > 0) {
            setBasketItems(response);
  
            const goods = await Promise.all(
              response.map(async (item) => {
                const data = await fetchOneGoods(item);
                return { [item]: data };
              })
            );
            setGoodsData(Object.assign({}, ...goods));
          } else {
            setBasketItems([]);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setError('Произошла ошибка при загрузке корзины');
        });
    }
  }, [user.user.id]);
  

  useEffect(() => {
    if (user.user.id) {
      fetchBasketId(user.user.id)
        .then((basketId) => setBasketId(basketId))
        .catch((error) => console.error("Ошибка при получении basketId", error));
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
        setBasketItems(basketItems.filter(item => item !== goodId));
        setGoodsData(prev => {
          const updatedData = { ...prev };
          delete updatedData[goodId];
          return updatedData;
        });
      })
      .catch(() => alert('Ошибка при удалении товара'));
  };

  const calculateTotalPrice = () => {
    const total = basketItems.reduce((sum, item) => {
      const good = goodsData[item];
      return good ? sum + good.price : sum; 
    }, 0);
    setTotalPrice(total);
  };
  const handleReportClick = () => {
    const plainUser = {
      id: user.user.id,
      email: user.user.email,
      role: user.user.role,
    };
  
    navigate(USER_REPORT, {
      state: { basketItems, goodsData, user: plainUser, totalPrice },
    });
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [goodsData, basketItems]);
  console.log('User:', user);
  return (
    <Container className="mt-4">
      <Row className='d-flex m-2'>
        <h1 style={{color:'gray'}}>
          Hello <Badge bg="outline-dark" style={{color:'gray'}}>{user.user.email}</Badge>
          <Button className='ms-2' variant="secondary" onClick={() => navigate(SHOP_ROUTE)}>Go to Shop</Button>
          <hr></hr>
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
                  <div>Emty</div>
                ) : (
                  basketItems.map((item) => {
                    const good = goodsData[item];
                    return (
                      <div key={item} style={{ marginBottom: '15px' }}>
                        <Row>
                          <Col className='ms-2'>
                            <h4>{good ? good.name : 'Loading...'}</h4>
                            <p>Price: {good ? `$${good.price}` : 'Loadint...'}</p>
                          </Col>
                          <Col>
                            <Button
                              variant="danger"
                              onClick={() => handleRemoveFromBasket(item)}>
                             Delete
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    );
                  })
                )}
              </Row>

              <Row><h4>Total Price: ${totalPrice}</h4></Row>
              <Button className='mt-2' variant="outline-light" onClick={handleReportClick}>Report</Button>
            </Badge>
          </Row>

          {user.user.role === 'ADMIN' && (      
            <Row className='mt-2'>  
              <Badge bg="secondary">
                <h2>O hey look</h2>          
                <Button variant='outline-light' onClick={() => navigate(ADMIT_ROUTE)}>AdminPanel</Button>
                <Button className='ms-2' variant='outline-light' onClick={() => navigate(ADMIN_REPORT)}>Users Report</Button>
              </Badge>
            </Row>
          )}
        </Col>        
      </Row>
      <hr style={{opacity: 0}}></hr><hr style={{opacity: 0}}></hr><hr></hr><hr></hr><hr></hr><hr></hr><hr></hr>
      
    </Container>
    
  );
});

export default Basket;
