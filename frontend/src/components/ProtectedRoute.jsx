import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('portfolio_token');
  
  if (!token) {
    // Si no hay token de seguridad, redirige al muro de login
    return <Navigate to="/admin/login" replace />;
  }
  
  // Si el token existe, se permite el acceso a la ruta (children)
  return children;
};

export default ProtectedRoute;
