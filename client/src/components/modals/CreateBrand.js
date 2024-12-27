import React,{ useState }from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import { Form } from 'react-bootstrap';
import { createBrand } from '../../http/goodAPI';

const CreateBrand= ({show,onHide}) => {
  const [value,setValue] = useState('')
  const addBrand= ()=>
    {
      createBrand({name: value}).then(data=>setValue('') ,onHide())
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
          Add new Brand
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control
            value = {value}
            onChange={e=>setValue(e.target.value)}
                placeholder={"name of brand"}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={addBrand}>Add</Button>
        <Button variant='outline-success' onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateBrand;