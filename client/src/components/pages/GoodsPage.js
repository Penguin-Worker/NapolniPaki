import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/esm/Image';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import star from '../../assets/StarB.png';
import Button from 'react-bootstrap/esm/Button';
import { useParams, Link } from 'react-router-dom';
import { fetchOneGoods } from '../../http/goodAPI';
import { RATING_ROUTE } from '../utils/consts';

import { createRating, fetchRatingsByGoodId } from '../../http/goodAPI';
const GoodsPage= () => {
  const [goods, setGoods] = useState({info:[]})
  const {id} = useParams()
  const [averageRating, setAverageRating] = useState(0); 
  const [ratings, setRatings] = useState([]); 
  useEffect(() => {
    fetchOneGoods(id).then(data => setGoods(data))
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
  return (
    <Container className='mt-3'>
      <Row>
      <Col md={4}>
      <Image  width={500} height={500} src={process.env.REACT_APP_API_URL +'/static/'+ goods.img} thumbnail/>
      </Col>
      <Col md={4}>
      <Row className='d-flex align-items-center'>
        <h2>{goods.name}</h2>
        <Link  to={RATING_ROUTE+ '/' + goods.id}>
        <div className='d-flex align-items-center justify-content-center'
        style={{background:`url(${star}) no-repeat center center `,cursor: 'pointer', width:240, height:240, backgroundSize: 'cover', fontSize:48 }}>
       {averageRating > 0 ? `${averageRating}` : 'No ratings yet'}
        </div></Link>
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
    </Container>
  );
}

export default GoodsPage;