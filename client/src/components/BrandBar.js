import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const BrandBar = observer(() => {
  const { goods } = useContext(Context);

  const handleBrandClick = (brand) => {
    if (goods.selectedBrand.id === brand.id) {
      goods.setSelectedBrand({}); 
      localStorage.removeItem('selectedBrand');
    } else {
      goods.setSelectedBrand(brand);
      localStorage.setItem('selectedBrand', JSON.stringify(brand));
    }
  };
  const businessBrands = goods.brands.filter(brand => brand.name === 'business');
  const clientBrands = goods.brands.filter(brand => brand.name === 'client');
  const otherBrands = goods.brands.filter(brand => brand.name !== 'client' && brand.name !== 'business');


  return (
    <div>
    <Row className="d-flex flex-wrap">
      {otherBrands.map((brand) => (
        <Card
          style={{
            cursor: 'pointer',
            width: 'auto',
          }}
          key={brand.id}
          className="p-3 ms-1"
          onClick={() => handleBrandClick(brand)}
          border={brand.id === goods.selectedBrand.id ? 'danger' : 'light'}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
    <Row className="d-flex flex-wrap mt-2">
        <Col md={2}>
      {clientBrands.map((brand) => (
        <Card
          style={{
            cursor: 'pointer',
            width: 'auto',
          }}
          key={brand.id}
          className="p-3"
          onClick={() => handleBrandClick(brand)}
          bg ={'dark'}
          border={brand.id === goods.selectedBrand.id ? 'danger' : 'secondary'}
          text={'white'}
        >
          {brand.name}
        </Card>
      ))}</Col>
      <Col md={2}>
      {businessBrands.map((brand) => (
        <Card
          style={{
            cursor: 'pointer',
            width: 'auto',
          }}
          key={brand.id}
          className="p-3"
          onClick={() => handleBrandClick(brand)}
          border={brand.id === goods.selectedBrand.id ? 'danger' : 'secondary'}
          bg ={'dark'}
          text={'white'}
        >
          {brand.name}
        </Card>
      ))}</Col>
    </Row>
    </div>
    
  );
});

export default BrandBar;
