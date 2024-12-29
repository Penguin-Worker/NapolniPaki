import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from './routes';
import { Context } from '..';
import {jwtDecode} from 'jwt-decode';
const AppRouter = () => {
  const {user} = useContext(Context) 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      user.setUser(decoded);
    }
  }, []);

  return (
    <Routes>
       {user.isAuth ? (
        authRoutes.map(({ path, Component, protected: isProtected, roleRequired }) => {
          if (isProtected && user.role !== roleRequired) {
            
            return <Route key={path} path={path} element={<Navigate to="/" />} />;
          }
          return <Route key={path} path={path} element={<Component />} />;
        })
      ) : (
        
        <Route path="*" element={<Navigate to="/login" />} />
      )}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AppRouter;
