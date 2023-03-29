import {Link, useLocation, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import Logout from "./Logout";
import Cookies from "js-cookie";

const Navbar = () => {
    const [session, setSession] = useState(Cookies.get('session'));
    const [loggedIn, setLoggedIn] = useState(session !== undefined);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setSession(Cookies.get('session'));
    }, [session]);

    const handleLogout = () => {
        Cookies.remove('session');
        setLoggedIn(false);
        setSession(null);
        // Redirect to login page
        navigate('/login');
    };

    return (
        <nav>
            <ul className="flex space-x-4">
                {!loggedIn && (
                    <li className="text-blue-500">
                        <Link
                            to="/login"
                            className={`block py-2 px-2 rounded ${
                                location.pathname === '/login' ? 'bg-blue-500 text-white' : ''
                            }`}
                        >
                            Login
                        </Link>
                    </li>
                )}
                {!loggedIn && (
                    <li className="text-blue-500">
                        <Link
                            to="/register"
                            className={`block py-2 px-2 rounded ${
                                location.pathname === '/register' ? 'bg-blue-500 text-white' : ''
                            }`}
                        >
                            Register
                        </Link>
                    </li>
                )}
                {loggedIn && (
                    <li className="text-blue-500">
                        <Link
                            to="/dashboard"
                            className={`block py-2 px-2 rounded ${
                                location.pathname === '/dashboard' ? 'bg-blue-500 text-white' : ''
                            }`}
                        >
                            Home
                        </Link>
                    </li>
                )}
                {loggedIn && (
                    <li className="text-blue-500">
                        <Link
                            to="/articles"
                            className={`block py-2 px-2 rounded ${
                                location.pathname === '/articles' ? 'bg-blue-500 text-white' : ''
                            }`}
                        >
                            Articles
                        </Link>
                    </li>
                )}
                {loggedIn && (
                    <li className="text-blue-500">
                        <Link
                            to="/preferences"
                            className={`block py-2 px-2 rounded ${
                                location.pathname === '/preferences' ? 'bg-blue-500 text-white' : ''
                            }`}
                        >
                            Preferences
                        </Link>
                    </li>
                )}
                {loggedIn && (
                    <li className="text-blue-500">
                        <Logout onLogout={handleLogout} />
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
