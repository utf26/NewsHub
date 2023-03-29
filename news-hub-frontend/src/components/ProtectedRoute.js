import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const session = Cookies.get('session');
    const isAuthenticated = !!session;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
