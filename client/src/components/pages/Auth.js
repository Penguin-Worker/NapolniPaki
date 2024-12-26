import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { NavLink , useLocation} from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { login, registration } from '../../http/userAPI';
const Auth= () => {
const location=useLocation()
console.log(location)
const isLogin=location.pathname===LOGIN_ROUTE

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const click = async()=>{
  if(isLogin){
    const response = await login()
    console.log(response)
  }else{
  const response = await registration(email,password)
  console.log(response)
  }
  
}


  return (
    <Container className='d-flex justify-content-center align-items-center' style={{height:window.innerHeight-54}}>
      <Card style={{width:600}} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
      <Form className='d-flex flex-column'>
        <Form.Control
        className='mt-3'
        placeholder='email'   
        value={email}   
        onChange={e=>setEmail(e.target.value)}  
        />
        <Form.Control
        className='mt-3'
        placeholder='password'
        value={password} 
        onChange={e=>setPassword(e.target.value)} 
        type ="password"      
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
           <Button variant={'outline-success'} 
           onClick={click}
           className='mt-2 align-self-end'>
          {isLogin ? 'Login':'Registration'}
        </Button>
        </Row>
       
      </Form>
      </Card>

    </Container>
  );
}

export default Auth;