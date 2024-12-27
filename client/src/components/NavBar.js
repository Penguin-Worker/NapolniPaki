import React, { useContext } from 'react';
import { Context } from '..';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { ADMIT_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from './utils/consts';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
const NavBar=observer (() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut=()=>{
      user.setUser({})
      user.setIsAuth(false)
    }
  return (
    <Navbar bg="dark" data-bs-theme="dark" >
    
      <NavLink className="ms-auto" style={{color:'white'}} to= {SHOP_ROUTE}> RedPlitka</NavLink>
      <Container>
      {user.isAuth ?
      <Nav className="ms-auto" style={{color:'white'}}>
        <Button variant='outline-light' onClick={()=> navigate(ADMIT_ROUTE)}>AdminPanel</Button>
        <Button variant='outline-light' className="ms-2 " onClick={()=> navigate(BASKET_ROUTE)}>Profile</Button>
        <Button variant='outline-light' className="ms-2 " onClick={()=> logOut()}>Exit</Button>
      </Nav>
      :
      <Nav className="ms-auto" style={{color:'white'}}>
        
        <Button variant={'outline-light'} onClick={()=> navigate(LOGIN_ROUTE)} >Authorization</Button>
      </Nav>
      }   
    </Container>
  </Navbar>
  );
})

export default NavBar;