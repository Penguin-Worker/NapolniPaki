import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import { Form } from 'react-bootstrap';
import { createType } from '../../http/goodAPI';


const CreateType= ({show,onHide}) => {
 const [value,setValue] = useState('')
  const addType= ()=>
    {
      createType({name:value}).then(data=>setValue('') ,onHide())
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
          Add new Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control
            value = {value}
            onChange={e=>setValue(e.target.value)}
                placeholder={"name of type"}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={addType}>Add</Button>
        <Button variant='outline-success' onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateType;