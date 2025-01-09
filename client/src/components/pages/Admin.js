import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import CreateType from '../modals/CreateType';
import CreateBrand from '../modals/CreateBrand';
import CreateGood from '../modals/CreateGood';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { fetchTypes, fetchBrands, fetchGoods, deleteType, deleteBrand, deleteGood } from '../../http/goodAPI';
import { Dropdown, Row, Col, ListGroup } from 'react-bootstrap';

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
    fetchBrands().then(data =>{goods.setBrands((data))});
    fetchGoods().then(data => {
      goods.setGoods(data.rows); 
    });
  }, [goods]);

  const handleDeleteType = async (id) => {
    try {
      await deleteType(id);
      alert('Type deleted successfully!');
      fetchTypes().then(data => goods.setTypes(data));
    } catch (error) {
      alert('Failed to delete type: ' + error.response?.data?.message || error.message);
    }
  };

  const handleDeleteBrand = async (id) => {
    try {
      await deleteBrand(id);
      alert('Brand deleted successfully!');
      fetchBrands().then(data => goods.setBrands(data));
    } catch (error) {
      alert('Failed to delete brand: ' + error.response?.data?.message || error.message);
    }
  };

  const handleDeleteGood = async (id) => {
    try {
      await deleteGood(id);
      alert('Product deleted successfully!');
      fetchGoods().then(data => goods.setGoods(data));
    } catch (error) {
      alert('Failed to delete product: ' + error.response?.data?.message || error.message);
    }
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
            <Dropdown.Toggle>{goods.selectedType?.name || "Choose type to figure out"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {goods.types.map(type =>
                <Dropdown.Item
                  key={type.id}
                  onClick={() => {
                    goods.setSelectedType(type);
                    setEditingType(type); 
                    setTypeVisiable(true);
                  }}
                >
                  {type.name}
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteType(type.id);
                    }}
                  >
                    Delete
                  </Button>
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
            <Dropdown.Toggle>{goods.selectedBrand?.name || "Choose brand to figure out"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {goods.brands.map(brand =>
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => {
                    goods.setSelectedBrand(brand);
                    setEditingBrand(brand); 
                    setBrandVisiable(true);
                  }}
                >
                  {brand.name}
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBrand(brand.id);
                    }}
                  >
                    Delete
                  </Button>
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Button variant='outline-dark' className='mt-2 p-2' onClick={() => { setEditingGood(null); setGoodVisiable(true); }}>
        Add Product 
      </Button>

      <h4 className='mt-4'>Products you may to delete</h4>
      
      <ListGroup>
  {Array.isArray(goods.goods) && goods.goods.map(good => (
    <ListGroup.Item key={good.id} className="d-flex justify-content-between align-items-center">
      {good.name}
      <Button
        variant="danger"
        size="sm"
        onClick={() => handleDeleteGood(good.id)}
      >
        Delete
      </Button>
    </ListGroup.Item>
  ))}
</ListGroup>

      <CreateType
        show={typeVisiable}
        onHide={() => { setEditingType(null); setTypeVisiable(false); }}
        editingItem={editingType}
      />
      <CreateBrand
        show={brandVisiable}
        onHide={() => { setEditingBrand(null); setBrandVisiable(false); }}
        editingItem={editingBrand}
      />
      <CreateGood
        show={goodVisiable}
        onHide={() => { setEditingGood(null); setGoodVisiable(false); }}
        editingItem={editingGood}
      />      <hr style={{opacity: 0}}></hr><hr style={{opacity: 0}}></hr><hr></hr>
      <div style={{opacity: 0}}>
      <hr></hr><hr></hr><hr></hr><hr></hr><hr></hr><hr></hr><hr></hr></div>
      
    </Container>
  );
});

export default Admin;
