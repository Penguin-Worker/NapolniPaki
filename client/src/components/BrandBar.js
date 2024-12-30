import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import Row from 'react-bootstrap/Row';
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

  return (
    <Row className="d-flex flex-wrap">
      {goods.brands.map((brand) => (
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
  );
});

export default BrandBar;
