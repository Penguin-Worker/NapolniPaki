import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import CreateType from '../modals/CreateType';
import CreateBrand from '../modals/CreateBrand';
import CreateGood from '../modals/CreateGood';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { fetchTypes, fetchBrands, createType, createBrand } from '../../http/goodAPI';
import { Dropdown, Row, Col } from 'react-bootstrap';

const Admin = observer(() => {
  const { goods } = useContext(Context);
  const [brandVisiable, setBrandVisiable] = useState(false);
  const [typeVisiable, setTypeVisiable] = useState(false);
  const [goodVisiable, setGoodVisiable] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [editingGood, setEditingGood] = useState(null);

  useEffect(() => {
    fetchTypes().then(data => goods.setTypes(data));
    fetchBrands().then(data => goods.setBrands(data));
  }, [goods]);

  const handleTypeUpdate = (type) => {
    
    goods.setSelectedType(type);
  };

  const handleBrandUpdate = (brand) => {
    goods.setSelectedBrand(brand);
  };

  return (
    <Container className='d-flex flex-column'>
      <Row md={5}>
        <Col>
          <Button variant='outline-dark' className='mt-2 p-2' onClick={() => { setEditingType(null); setTypeVisiable(true); }}>
            Add type of Product
          </Button>
        </Col>
        <Col>
          <Dropdown className='mt-2'>
            <Dropdown.Toggle>{goods.selectedType?.name || "Choose type to update"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {goods.types.map(type =>
                <Dropdown.Item
                  onClick={() => {
                    goods.setSelectedType(type);
                    setEditingType(type); 
                    setTypeVisiable(true);
                  }}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row md={5}>
        <Col>
          <Button variant='outline-dark' className='mt-2 p-2' onClick={() => { setEditingBrand(null); setBrandVisiable(true); }}>
            Add brand of Product
          </Button>
        </Col>
        <Col>
          <Dropdown className='mt-2'>
            <Dropdown.Toggle>{goods.selectedBrand?.name || "Choose brand to update"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {goods.brands.map(brand =>
                <Dropdown.Item
                  onClick={() => {
                    goods.setSelectedBrand(brand);
                    setEditingBrand(brand); 
                    setBrandVisiable(true);
                  }}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Button variant='outline-dark' className='mt-2 p-2' onClick={() => { setEditingGood(null); setGoodVisiable(true); }}>
        Add Product
      </Button>

      <CreateType
        show={typeVisiable}
        onHide={() => { setEditingType(null); setTypeVisiable(false); }}
        editingItem={editingType}
        onSuccess={handleTypeUpdate} 
      />
      <CreateBrand
        show={brandVisiable}
        onHide={() => { setEditingBrand(null); setBrandVisiable(false); }}
        editingItem={editingBrand}
        onSuccess={handleBrandUpdate} 
      />
      <CreateGood
        show={goodVisiable}
        onHide={() => { setEditingGood(null); setGoodVisiable(false); }}
        editingItem={editingGood}
      />
    </Container>
  );
});

export default Admin;
