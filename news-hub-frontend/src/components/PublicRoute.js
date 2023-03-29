import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicRoute = ({ children }) => {
    const session = Cookies.get('session');
    const isAuthenticated = !!session;

    return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
