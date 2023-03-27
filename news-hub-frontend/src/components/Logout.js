import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove the authentication token from local storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAuthenticated');

        // Redirect the user to the login page or another page of your choice
        navigate('/login');
    }, [navigate]);

    return null;
};

export default Logout;
