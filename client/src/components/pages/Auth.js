import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { NavLink , useLocation} from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
const Auth= () => {
const location=useLocation()
console.log(location)
const isLogin=location.pathname===LOGIN_ROUTE
  return (
    <Container className='d-flex justify-content-center align-items-center' style={{height:window.innerHeight-54}}>
      <Card style={{width:600}} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
      <Form className='d-flex flex-column'>
        <Form.Control
        className='mt-3'
        placeholder='email'        
        />
        <Form.Control
        className='mt-3'
        placeholder='password'        
        />
        <Row>
          {isLogin ? 
          <div>
            Not registered yet <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
          </div>
          :
          <div>
            Have account <NavLink to={LOGIN_ROUTE}>Login</NavLink>
          </div>
          }
           <Button variant={'outline-success'} className='mt-2 align-self-end'>
          {isLogin ? 'Login':'Registration'}
        </Button>
        </Row>
       
      </Form>
      </Card>

    </Container>
  );
}

export default Auth;