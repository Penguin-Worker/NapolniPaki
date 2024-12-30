import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../..';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/esm/Image';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import { useParams, Link } from 'react-router-dom';
import { fetchOneGoods } from '../../http/goodAPI';
import { createRating, fetchRatingsByGoodId } from '../../http/goodAPI';
import { GOODS_ROUTE } from '../utils/consts';
import star from '../../assets/StarB.png';

const Raiting = () => {
    const { user } = useContext(Context);  

  const [goods, setGoods] = useState({ info: [] });
  const [rating, setRating] = useState(''); 
  const [averageRating, setAverageRating] = useState(0); 
  const [ratings, setRatings] = useState([]); 
  const { id } = useParams();

  useEffect(() => {
    
    fetchOneGoods(id)
      .then((data) => setGoods(data))
      .catch((error) => console.error('Error fetching goods:', error));

   
    fetchRatingsByGoodId(id)
      .then((data) => {
        setRatings(data);
        calculateAverageRating(data);
      })
      .catch((error) => console.error('Error fetching ratings:', error));
  }, [id]);

  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) {
      setAverageRating(0);
      return;
    }
    const sum = ratings.reduce((acc, r) => acc + r.rate, 0);
    setAverageRating((sum / ratings.length).toFixed(1));
  };
  
  const handleRate = () => {
    if (!rating) {
      alert('Please select a rating.');
      return;
    }
    
    createRating({rating}, user.user.id, id)
      .then((data) => {
        setRating('');
        alert('Rating submitted successfully!');
      })
      .catch((error) => {
        console.error('Error while posting rating:', error);
        alert('Failed to submit rating.');
      });
  };


  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={600}
            height={600}
            src={`${process.env.REACT_APP_API_URL}/static/${goods.img}`}
            thumbnail
            alt={goods.name}
          />
          <h2>{goods.name}</h2>
        </Col>

        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 250,
              fontSize: 28,
              border: '5px solid lightgray',
            }}
          >
            <h2 className="mt-2">
              <Badge bg="secondary">Rate this</Badge>
            </h2>
            <h3>{goods.name}</h3>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {rating > 0 ? `You selected: ${rating}` : 'Select Rating'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Dropdown.Item key={value} onClick={() => setRating(value)}>
                    {value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="outline-dark" onClick={handleRate}>
              Rate
            </Button>
          </Card>
        </Col>

        <Col md={4}>
          <Row className="d-flex align-items-center">
            <Link to={`${GOODS_ROUTE}/${goods.id}`}>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  background: `url(${star}) no-repeat center center`,
                  cursor: 'pointer',
                  width: 300,
                  height: 300,
                  backgroundSize: 'cover',
                  fontSize: 48,
                }}
              >
                {averageRating > 0 ? `⭐ ${averageRating}` : 'No ratings yet'}
              </div>
            </Link>
          </Row>
        </Col>
      </Row>

      <Row className="d-flex flex-column m-3">
        <h1>Last ratings</h1>
        {ratings.length > 0 ? (
          ratings.slice(-5).map((r, index) => (
            <div key={index}>
              User: {r.userId}, Rating: {r.rate}
            </div>
          ))
        ) : (
          <div>No ratings available.</div>
        )}
      </Row>
    </Container>
  );
};

export default Raiting;
