import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import CreateType from '../modals/CreateType';
import CreateBrand from '../modals/CreateBrand';
import CreateGood from '../modals/CreateGood';


const Admin= () => {
  const [brandVisiable, setBrandVisiable] = useState(false)
  const [typeVisiable, setTypeVisiable] = useState(false)
  const [goodVisiable, setGoodVisiable] = useState(false)
  return (
    <Container className='d-flex flex-column'>
      <Button variant='outline-dark' 
      className='mt-2 p-2'
      onClick={()=>setTypeVisiable(true)}>Add type of Product</Button>
      <Button variant='outline-dark' 
      className='mt-2 p-2'
      onClick={()=>setBrandVisiable(true)}>Add brand of Product</Button>
      <Button variant='outline-dark'
       className='mt-2 p-2'
       onClick={()=>setGoodVisiable(true)}> Add Product</Button>
      <CreateType show = {typeVisiable} onHide={()=>setTypeVisiable(false)}/>
      <CreateBrand show = {brandVisiable} onHide={()=>setBrandVisiable(false)}/>
      <CreateGood show={goodVisiable} onHide={()=>setGoodVisiable(false)}/>
    </Container>
  );
}

export default Admin;