import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import star from '../assets/ratestar.png';
import { useNavigate } from 'react-router-dom';
import { GOODS_ROUTE } from './utils/consts';
import { Context } from '..';
import { observer } from 'mobx-react-lite';


const GoodItem = observer(({ goods }) => {
  const { goods: goodsStore } = useContext(Context);
  
  if (!goodsStore || !goodsStore.brands) {
    return <div>Loading...</div>;
  }  
  const brand = goodsStore.brands.find((brand) => brand.id === goods.brandId);

  const navigate = useNavigate();

  return (
    <Col md={3} className="mt-2" onClick={() => navigate(GOODS_ROUTE + '/' + goods.id)}>
      <Card style={{ width: 180, cursor: 'pointer', backgroundColor: 'lightgray' }} border="darkgray" >
        <Image width={180} height={180} src={process.env.REACT_APP_API_URL + '/static/' + goods.img} />

        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          
          <div className="ms-1">{brand ? brand.name : 'Unknown Brand'}</div>
          <div className="d-flex align-items-center">
            <div>{goods.rating}</div>
            <Image width={18} height={18} src={star} />
          </div>
        </div>

        <div className="ms-2">{goods.name}</div>
        <div className="ms-3">From {goods.price}$</div>
      </Card>
    </Col>
  );
});

export default GoodItem;
