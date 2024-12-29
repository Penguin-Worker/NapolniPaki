
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from './components/NavBar';
import {observer} from "mobx-react-lite"
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import Footer from './components/Footer';

const App = observer( ()=> {
  const {user} = useContext(Context)
  const[loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        await check();
        user.setUser(true);
        user.setIsAuth(true);
      } catch (error) {
        console.error("Authentication failed:", error);
        user.setIsAuth(false); 
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      initAuth();
    } else {
      setLoading(false);
    }
  }, [user]);

  if(loading){
    return <Spinner animation='grow'/>
  }

  return (
    <BrowserRouter>
    <NavBar />
      <AppRouter />
    <Footer/>
    </BrowserRouter>
  );
});

export default App;
