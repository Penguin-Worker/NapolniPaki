import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import star from '../assets/ratestar.png';
import {useNavigate} from 'react-router-dom'
import { GOODS_ROUTE } from './utils/consts';
const GoodItem= ({goods}) => {
    const navigate = useNavigate()
  return (
    <Col md={3} className='mt-2' onClick={()=>navigate(GOODS_ROUTE + '/' + goods.id)}>
    <Card style={{width:150, cursor:'pointer'}} border='light'>
    <Image width={150} height={150} src={process.env.REACT_APP_API_URL + goods.img}/>
    <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center' >
        <div>BAZA...</div>
        <div className='d-flex align-items-center'>
            <div>{goods.rating}</div>
            <Image width={18} height={18} src={star}/>
        </div>
        
    </div>
    <div>
            {goods.name}
        </div>
    </Card>
    </Col>
  );
}

export default GoodItem;