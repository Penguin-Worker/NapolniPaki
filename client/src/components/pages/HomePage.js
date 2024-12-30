import React ,{ useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';


const HomePage = () => {
    
 
  return (
    <div>
    <Carousel>
      <Carousel.Item>
      <div
          className="d-block w-100"
          style={{
            height: '400px',
             
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url(${process.env.REACT_APP_API_URL}/static/Katalog.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat', 
          }}
        >
          
        </div>
        <Carousel.Caption>
        <NavLink className="ms-auto" style={{color:'white'}} to= {SHOP_ROUTE}>SHOP NOW</NavLink>
          <p>Best price</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <div
          className="d-block w-100"
          style={{
            height: '400px',
             
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url(${process.env.REACT_APP_API_URL}/static/Installation.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat', 
          }}
        >    
          
        </div>
        <Carousel.Caption>
        <NavLink className="ms-auto" to={SHOP_ROUTE+'?type=service&brand=client'} style={{color:'white'}}>Installation and Service</NavLink>
          <p>Fast Inexpensive Obligingly</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <div
          className="d-block w-100"
          style={{
            height: '400px',
             
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url(${process.env.REACT_APP_API_URL}/static/business.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat', 
          }}
        >
         
        </div>
        <Carousel.Caption>
        <NavLink className="ms-auto" to={SHOP_ROUTE+'?type=service&brand=business'} style={{color:'white'}}>BUSINESS</NavLink>
          <p>
            Special offers
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <Row className="d-flex flex-column m-3 ">
          <h2 >Some interseting info</h2>
          <Row>
          <h4 >Some interseting info</h4>
          </Row>
          <h2 className='mt-3'>Some interseting info</h2>
    </Row>
    </div>
  );
};

export default HomePage;
