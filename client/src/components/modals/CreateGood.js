import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import { Context } from '../..';


const CreateGood= ({show,onHide}) => {
    const {goods} = useContext(Context)
    const[info , setInfo]=useState([])
    const addInfo=()=>{
        setInfo([...info, {title: '',description: '', number: Date.now()}])
    }
    const removeInfo=(number)=>{
        setInfo(info.filter(i=> i.number!== number))
    }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Dropdown className='mt-2'>
                <Dropdown.Toggle>Choose type</Dropdown.Toggle>
                <Dropdown.Menu>
                    {goods.types.map(type=>
                        <Dropdown.Item key={type.id}>
                            {type.name}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className='mt-2'>
                <Dropdown.Toggle>Choose brand</Dropdown.Toggle>
                <Dropdown.Menu>
                    {goods.brands.map(brand=>
                        <Dropdown.Item key={brand.id}>
                            {brand.name}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control
            className='mt-2'
            placeholder='name of product'/>
            <Form.Control
            className='mt-2'
            placeholder='price of product'
            type="number"/>
            <Form.Control
            className='mt-2'
            placeholder='image of product'
            type="file"/>
            <hr></hr>
            <Button variant='ouline-dark'
            onClick={addInfo}>Add new property</Button>
            {info.map(i=>
                <Row className='mt-2' key={i.number}>
                    <Col md={4}>
                    <Form.Control
                        placeholder='title'
                    />
                    </Col>
                    <Col md={4}>
                    <Form.Control
                        placeholder='description'
                    />
                    </Col>
                    <Col md={4}>
                        <Button variant='outline-danger' onClick={()=>removeInfo(i.number)}>Delete</Button>
                    </Col>
                </Row>
            )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Add</Button>
        <Button variant='outline-success' onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateGood;