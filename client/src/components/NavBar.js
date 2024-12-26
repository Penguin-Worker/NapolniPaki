import React, { useContext } from 'react';
import { Context } from '..';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { ADMIT_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from './utils/consts';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
const NavBar=observer (() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
  return (
    <Navbar bg="dark" data-bs-theme="dark" >
    
      <NavLink className="ms-auto" style={{color:'white'}} to= {SHOP_ROUTE}> RedPlitka</NavLink>
      <Container>
      {user.isAuth ?
      <Nav className="ms-auto" style={{color:'white'}}>
        <Button variant='outline-light' onClick={()=> navigate(ADMIT_ROUTE)}>AdminPanel</Button>
        <Button variant='outline-light' className="ms-2 " onClick={()=> navigate(LOGIN_ROUTE)}>Exit</Button>
      </Nav>
      :
      <Nav className="ms-auto" style={{color:'white'}}>
        
        <Button variant={'outline-light'} onClick={()=> user.setIsAuth(true)} >Authorization</Button>
      </Nav>
      }   
    </Container>
  </Navbar>
  );
})

export default NavBar;