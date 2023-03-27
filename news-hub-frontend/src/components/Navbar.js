import { Link } from 'react-router-dom';
import React from "react";
import Logout from "./Logout";

const Navbar = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    return (
        <nav>
            <ul className="flex space-x-4">
                {!isAuthenticated && (
                    <li>
                        <Link to="/dashboard" className="text-blue-500">Home</Link>
                    </li>
                )}
                {!isAuthenticated && (
                    <li>
                        <Link to="/login" className="text-blue-500">Login</Link>
                    </li>
                )}
                {!isAuthenticated && (
                    <li>
                        <Link to="/register" className="text-blue-500">Register</Link>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <Link to="/articles" className="text-blue-500">Articles</Link>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <Link to="/preferences" className="text-blue-500">Preferences</Link>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <Logout />
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
