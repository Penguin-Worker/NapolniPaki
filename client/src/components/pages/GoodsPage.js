import React, { useState, useEffect, useContext } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/esm/Image';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import Form from 'react-bootstrap/esm/Form';
import star from '../../assets/StarB.png';
import Button from 'react-bootstrap/esm/Button';
import { useParams, Link } from 'react-router-dom';
import { fetchOneGoods, addToBasket, getBasket } from '../../http/goodAPI';
import { RATING_ROUTE } from '../utils/consts';
import { Context } from '../..';

import { fetchRatingsByGoodId } from '../../http/goodAPI';
const GoodsPage= () => {
  const [goods, setGoods] = useState({info:[]})
  const {id} = useParams()
  const [averageRating, setAverageRating] = useState(0); 
  const [ratings, setRatings] = useState([]); 
  const [area, setArea] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useContext(Context); 

  useEffect(() => {
    fetchOneGoods(id).then(data=> {
      setGoods(data);
      setTotalPrice(data.price);
    });
    fetchRatingsByGoodId(id)
      .then((data) => {
        setRatings(data);
        calculateAverageRating(data);})
  }, [id]);
  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) {
      setAverageRating(0);
      return;
    }
    const sum = ratings.reduce((acc, r) => acc + r.rate, 0);
    setAverageRating((sum / ratings.length).toFixed(1));
  };
  const handleAreaChange = (e) => {
    const newArea = e.target.value;
    setArea(newArea);
    setTotalPrice((newArea * goods.price).toFixed(2));
  };
  const handleAddToBasket = async () => {
    try {
      console.log(goods.id, user.user.id)
      const currentBasket = await getBasket(user.user.id);
      if (currentBasket.length >= 5) {
        alert('You cannot add more than 5 sametimes.');
        return; 
      }
      if (currentBasket.some(item => item === goods.id)) { 
        alert('This item has already been added to your cart.');
        return;
      }
      await addToBasket(goods.id, user.user.id);
      alert('Product added to cart!');
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };
  return (
    <Container className='mt-3'>
      <Row>
      <Col md={4}>
      {goods.img ? (
  <Image
    width={500}
    height={500}
    src={`${process.env.REACT_APP_API_URL}/static/${goods.img}`}
    thumbnail
  />
) : (
  <div>Loading image...</div>
)}
       </Col>
      <Col md={4}>
      <Row className='d-flex align-items-center'>
        <h2>{goods.name}</h2>
        <Link  to={RATING_ROUTE+ '/' + goods.id}>
        <div className='d-flex align-items-center justify-content-center'
        style={{background:`url(${star}) no-repeat center center `,cursor: 'pointer', width:240, height:240, backgroundSize: 'cover', fontSize:48 }}>
       {averageRating > 0 ? `${averageRating}` : 'No rate'}
        </div></Link>
      </Row>
      </Col>
      <Col md={4}>
      <Card className='d-felx flex-column align-items-center justify-content-around'
      style={{width:300,height:300,fontSize:28, border:'5px solid lightgray'}}>
    <h3>{goods.name}</h3>
    <h3>Price: {goods.price} $ / m²</h3>
            <Form.Group controlId="formBasicRange">
              <Form.Label>Square: {area} м²</Form.Label>
              <Form.Control
                type="range"
                min="1"
                max="100"
                value={area}
                onChange={handleAreaChange}
              />
            </Form.Group>
            <h4>Final price: {totalPrice} $</h4>
            <Button variant="outline-dark" onClick={handleAddToBasket}>
              Add to basket
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className='d-flex flex-column m-3'>
        <h1>Details</h1>
        {goods.info && goods.info.length > 0 ? (
          goods.info.map((info, index) => (
            <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'darkgray', padding: 10 }}>
              {info.title} : {info.description}
            </Row>
          ))
        ) : (
          <div>No details available.</div>
        )}
      </Row>
      <div style={{opacity: 0}}>
      <hr></hr><hr></hr><hr></hr><hr></hr><hr></hr><hr></hr><hr></hr></div>
    </Container>
  );
}

export default GoodsPage;